import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/package.json');
const WebSocket = require('next/dist/compiled/ws');
const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const pages = await (await fetch(`${process.env.CHROME_DEBUG_URL || 'http://127.0.0.1:9237'}/json/list`)).json();
const page = pages.find(p => p.type === 'page');
if (!page) throw new Error('No temporary browser page');
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.once('open', resolve); socket.once('error', reject); });
let id = 0;
const pending = new Map();
const consoleErrors = [];
socket.on('message', raw => {
 const message = JSON.parse(raw);
 if (message.id && pending.has(message.id)) { const {resolve,reject,timer} = pending.get(message.id); clearTimeout(timer); pending.delete(message.id); if (message.error) reject(message.error); else resolve(message.result); }
 if (message.method === 'Runtime.exceptionThrown') consoleErrors.push(message.params.exceptionDetails.text);
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const requestId = ++id; const timer = setTimeout(() => {pending.delete(requestId); reject(new Error(method+' timed out'));}, 20000); pending.set(requestId,{resolve,reject,timer}); socket.send(JSON.stringify({id:requestId,method,params})); }); }
async function evaluate(expression) { const result = await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true}); if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails)); return result.result.value; }
async function navigate(url) {
 await send('Page.navigate',{url});
 for(let attempt=0;attempt<80;attempt++) { if(await evaluate(`document.readyState === 'complete' && !!document.querySelector('main h1')`))break; await new Promise(r=>setTimeout(r,100)); }
 await evaluate(`Promise.race([Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})})),new Promise(r=>setTimeout(r,10000))])`);
 await new Promise(r=>setTimeout(r,450));
}
async function capture(file, full = false) {
 const viewport = await evaluate(`({width:innerWidth,height:innerHeight})`);
 try {
  if (full) {
   const layout = await send('Page.getLayoutMetrics');
   await send('Emulation.setDeviceMetricsOverride',{width:viewport.width,height:Math.ceil(layout.cssContentSize.height),deviceScaleFactor:1,mobile:false});
  }
  const {data} = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(file,Buffer.from(data,'base64'));
 } finally {
  if(full) await send('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
 }
}
const out=process.cwd()+'/docs/visual-review'; fs.mkdirSync(out,{recursive:true});
const results=[];
try {
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 await send('Emulation.setEmulatedMedia',{features:[]});
 await send('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*','*emailjs.com*']});
 for(const width of [320,375,768,1024,1440]) {
  const height = width === 1024 ? 768 : 900;
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await navigate(baseUrl+'/');
  const layout=await evaluate(`(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,hero:document.querySelector('.hero').getBoundingClientRect().toJSON(),brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return !e.closest('.honeypot')&&r.width>0&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(e).position!=='absolute'}).slice(0,12).map(e=>({tag:e.tagName,class:e.className,width:e.getBoundingClientRect().width}))}))()`);
  if(width>=1024 && layout.hero.bottom>height-66) throw new Error('Desktop hero does not fit viewport');
  if(layout.scrollWidth>width)throw new Error('Overflow '+JSON.stringify(layout));
  if(layout.brokenImages.length)throw new Error('Broken images '+JSON.stringify(layout));
  await capture(`${out}/home-${width}.png`,true);
  await capture(`${out}/viewport-${width}.png`);
  const header=await evaluate(`(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,850);const h=document.querySelector('.site-header');const r=h.getBoundingClientRect();return {top:r.top,bottom:r.bottom,background:getComputedStyle(h).backgroundColor,zIndex:getComputedStyle(h).zIndex};})()`);
  if(header.top!==0||header.background!=='rgb(255, 255, 255)')throw new Error('Header opacity/position '+JSON.stringify(header));
  if(width<851) {
   await evaluate(`document.querySelector('.menu-toggle').click()`);
   if(!await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'`))throw new Error('Menu not open');
   await evaluate(`document.querySelector('#nav-links a[href="/#services"]').click()`);
   await new Promise(r=>setTimeout(r,250));
   if(!await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'`))throw new Error('Menu not closed');
   const target=await evaluate(`document.querySelector('#services').getBoundingClientRect().top`);
   if(target<72)throw new Error('Anchor hidden '+target);
   await evaluate(`document.querySelector('.menu-toggle').focus();document.querySelector('.menu-toggle').click()`);
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
   if(!await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false' && document.activeElement===document.querySelector('.menu-toggle')`))throw new Error('Escape focus return failed');
  }
  const form=await evaluate(`(()=>{const f=document.querySelector('.contact-form');const empty=f.checkValidity();f.querySelector('[name="name"]').value='Visual test';f.querySelector('[name="email"]').value='bad-email';f.querySelector('[name="message"]').value='Validation only';const invalidEmail=f.checkValidity();f.querySelector('[name="email"]').value='review@example.org';const valid=f.checkValidity();f.reset();return {empty,invalidEmail,valid};})()`);
  if(form.empty||form.invalidEmail||!form.valid)throw new Error('Validation '+JSON.stringify(form));
  results.push({width,layout,header,form,status:'pass'});
  console.log('PASS homepage viewport '+width+'px: no overflow/broken images, opaque sticky header, native form validation'+(width<851?', mobile navigation and anchor offset':''));
 }
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await navigate(baseUrl+'/services/gdpr-data-retention');
 await capture(`${out}/gdpr-1440.png`,true);
 const nested=await evaluate(`(()=>({h1:document.querySelector('h1').textContent,homeLinks:[...document.querySelectorAll('header a')].map(a=>a.getAttribute('href')),overflow:document.documentElement.scrollWidth>innerWidth}))()`);
 if(nested.overflow)throw new Error('GDPR overflow');
 await evaluate(`document.querySelector('header a[href="/#contact"]').click()`);
 for(let i=0;i<80;i++){if(await evaluate(`location.pathname==='/'&&location.hash==='#contact'&&!!document.querySelector('#contact')`))break;await new Promise(r=>setTimeout(r,100));}
 if(!await evaluate(`location.pathname==='/'&&location.hash==='#contact'`))throw new Error('Nested navigation failed');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 if(!await evaluate(`getComputedStyle(document.documentElement).scrollBehavior==='auto'`))throw new Error('Reduced motion');
 fs.writeFileSync(`${out}/results.json`,JSON.stringify({results,nested,reducedMotion:'pass',consoleErrors,emailSubmission:'not performed; provider requests blocked'},null,2)+'\n');
 console.log('PASS GDPR page, nested contact navigation, reduced-motion media query. Runtime exceptions: '+consoleErrors.length);
} finally {socket.close();}
