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
 for(let attempt=0;attempt<80;attempt++) { if(await evaluate(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && !!document.querySelector('main h1')`))break; await new Promise(r=>setTimeout(r,100)); }
 await evaluate(`Promise.race([Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})})),new Promise(r=>setTimeout(r,10000))])`);
 await new Promise(r=>setTimeout(r,700));
}
async function capture(file, full = false) {
 const viewport = await evaluate(`({width:innerWidth,height:innerHeight})`);
 try {
  if (full) {
   const layout = await send('Page.getLayoutMetrics');
   await send('Emulation.setDeviceMetricsOverride',{width:viewport.width,height:Math.ceil(layout.cssContentSize.height),deviceScaleFactor:1,mobile:false});
   await new Promise(resolve=>setTimeout(resolve,800));
  }
  const {data} = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(file,Buffer.from(data,'base64'));
 } finally {
  if(full) await send('Emulation.setDeviceMetricsOverride',{...viewport,deviceScaleFactor:1,mobile:false});
 }
}
const out=process.cwd()+'/docs/partnership-review'; fs.mkdirSync(out,{recursive:true});
const results=[];
const accessibility=[];
const axeSource=fs.readFileSync(require.resolve('axe-core/axe.js'),'utf8');
async function scanAccessibility(label){await evaluate(axeSource); const scan=await evaluate(`axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}).then(r=>({violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),passes:r.passes.length,incomplete:r.incomplete.map(v=>v.id)}))`);accessibility.push({label,...scan}); console.log('AXE '+label+': '+scan.violations.length+' violations');}

try {
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 await send('Emulation.setEmulatedMedia',{features:[]});
 await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.__layoutShifts=[];new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__layoutShifts.push(entry.value)}).observe({type:'layout-shift',buffered:true});`});
 await send('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*','*emailjs.com*']});
 for(const width of [320,375,390,768,1024,1280,1440,1920]) {
  const height = width === 1024 ? 768 : 900;
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
  await navigate(baseUrl+'/');
  const layout=await evaluate(`(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,hero:document.querySelector('.hero').getBoundingClientRect().toJSON(),brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return !e.closest('.honeypot')&&r.width>0&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(e).position!=='absolute'}).slice(0,12).map(e=>({tag:e.tagName,class:e.className,width:e.getBoundingClientRect().width}))}))()`);
  if(width>=1024 && layout.hero.bottom>height-66) throw new Error('Desktop hero does not fit viewport: '+JSON.stringify(layout.hero));
  if(width>=1024){const copyTops=await evaluate(`[...document.querySelectorAll('.solution-copy')].map(e=>e.getBoundingClientRect().top)`);if(Math.max(...copyTops)-Math.min(...copyTops)>1)throw new Error('Solution preview rows misaligned');}
  const logos=await evaluate(`({clients:document.querySelectorAll('#clients .logo-card').length,partners:document.querySelectorAll('#partnerships .partnership-card').length,clientOrder:document.querySelector('.hero').nextElementSibling?.id,partnerOrder:document.querySelector('#work').nextElementSibling?.id,baselineLinks:[...document.querySelectorAll('#clients a')].filter(a=>a.textContent.includes('Baseline')).length,unapproved:!!document.querySelector('img[src*="ALL.png"]'),fit:[...document.querySelectorAll('.logo-card img, .partnership-logo img')].every(i=>getComputedStyle(i).objectFit==='contain')})`);
  if(logos.clients!==6||logos.partners!==2||logos.clientOrder!=='clients'||logos.partnerOrder!=='partnerships'||logos.baselineLinks||logos.unapproved||!logos.fit)throw new Error('Approved logo rendering '+JSON.stringify(logos));
  const partnership=await evaluate(`(()=>{const cards=[...document.querySelectorAll('.partnership-card')];return {heights:cards.map(c=>c.getBoundingClientRect().height),lefts:cards.map(c=>c.getBoundingClientRect().left),tops:cards.map(c=>c.getBoundingClientRect().top),links:cards.map(c=>{const a=c.querySelector('a');return {url:a.href,rel:a.rel,target:a.target,height:a.getBoundingClientRect().height}}),count:document.querySelectorAll('#partnerships').length,badges:cards.map(c=>c.querySelector('.partnership-badge').textContent)}})()`);
  if(partnership.count!==1||Math.abs(partnership.heights[0]-partnership.heights[1])>1||partnership.links[0].url!=='https://wicci.au/'||partnership.links[1].url!=='https://g100.in/'||partnership.links.some(a=>a.target!=='_blank'||!a.rel.includes('noopener')||!a.rel.includes('noreferrer')||a.height<44)||partnership.badges.some(b=>b!=='Professional connection'))throw new Error('Partnership cards '+JSON.stringify(partnership));
  if(width<=600 ? partnership.lefts[0]!==partnership.lefts[1] : Math.abs(partnership.tops[0]-partnership.tops[1])>1)throw new Error('Partnership card layout');
  if(layout.scrollWidth>width)throw new Error('Overflow '+JSON.stringify(layout));
  if(layout.brokenImages.length)throw new Error('Broken images '+JSON.stringify(layout));
  if([375,768,1440].includes(width)) await capture(`${out}/home-${width}.png`,true);
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
   if(!await evaluate(`document.querySelector('header a[href="/#services"]').getAttribute('aria-current')==='location'`))throw new Error('Anchor active indicator');
   await evaluate(`document.querySelector('.menu-toggle').focus();document.querySelector('.menu-toggle').click()`);
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
   if(!await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false' && document.activeElement===document.querySelector('.menu-toggle')`))throw new Error('Escape focus return failed');
  }
  const form=await evaluate(`(()=>{const f=document.querySelector('.contact-form');const empty=f.checkValidity();f.querySelector('[name="name"]').value='Visual test';f.querySelector('[name="email"]').value='bad-email';f.querySelector('[name="message"]').value='Validation only';const invalidEmail=f.checkValidity();f.querySelector('[name="email"]').value='review@example.org';const valid=f.checkValidity();f.reset();return {empty,invalidEmail,valid};})()`);
  if(form.empty||form.invalidEmail||!form.valid)throw new Error('Validation '+JSON.stringify(form));
  const measurements=await evaluate(`({layoutShiftScore:window.__layoutShifts.reduce((a,b)=>a+b,0),paint:performance.getEntriesByType('paint').map(p=>({name:p.name,startTime:p.startTime})),revealTargets:document.querySelectorAll('.reveal-enter').length})`);
  if([375,1440].includes(width))await scanAccessibility('home-'+width);
  results.push({width,layout,header,form,logos,partnership,measurements,status:'pass'});
  console.log('PASS homepage viewport '+width+'px: no overflow/broken images, opaque sticky header, native form validation'+(width<851?', mobile navigation and anchor offset':''));
 }

 const serviceResults=[];
 const serviceSlugs=['custom-software-development','ai-intelligent-automation','crm-erp-solutions','gdpr-data-retention','cloud-application-modernization','web-mobile-development','technology-consulting-delivery'];
 for(const width of [320,375,390,768,1024,1280,1440,1920]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
  for(const slug of serviceSlugs){
   await navigate(baseUrl+'/services/'+slug);
   const layout=await evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('main h1').length,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,activeService:document.querySelector('header a[href="/#services"]').getAttribute('aria-current')})`);
   if(layout.overflow||layout.h1!==1||layout.brokenImages||layout.activeService!=='location')throw new Error('Service layout '+slug+' '+width+' '+JSON.stringify(layout));
   serviceResults.push({slug,width,...layout});
   if(width===1440){await scanAccessibility(slug);if(slug==='gdpr-data-retention')await capture(`${out}/gdpr-1440.png`,true);}
  }
  await navigate(baseUrl+'/work');
  const work=await evaluate(`({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('main h1').length,active:document.querySelector('header a[href="/work"]').getAttribute('aria-current')})`);
  if(work.overflow||work.h1!==1||work.active!=='page')throw new Error('Work page '+width);
  if(width===1440)await scanAccessibility('work');
  console.log('PASS all seven service pages and Our Work at '+width+'px');
 }
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await navigate(baseUrl+'/services/gdpr-data-retention');
 await evaluate(`document.querySelector('header a[href="/#contact"]').click()`);
 for(let i=0;i<80;i++){if(await evaluate(`location.pathname==='/'&&location.hash==='#contact'&&!!document.querySelector('#contact')`))break;await new Promise(r=>setTimeout(r,100));}
 if(!await evaluate(`location.pathname==='/'&&location.hash==='#contact'`))throw new Error('Nested navigation failed');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await navigate(baseUrl+'/');
 const reducedMotion=await evaluate(`({scroll:getComputedStyle(document.documentElement).scrollBehavior,animation:getComputedStyle(document.querySelector('.hero h1')).animationName,active:document.getAnimations().length})`);
 if(reducedMotion.scroll!=='auto'||reducedMotion.animation!=='none'||reducedMotion.active)throw new Error('Reduced motion '+JSON.stringify(reducedMotion));
 await send('Emulation.setEmulatedMedia',{features:[]});
 await send('Emulation.setScriptExecutionDisabled',{value:true});
 await send('Page.navigate',{url:baseUrl+'/'});await new Promise(r=>setTimeout(r,1500));
 await send('Emulation.setScriptExecutionDisabled',{value:false});
 const noJs=await evaluate(`['.hero h1','#services','#contact'].every(s=>{const e=document.querySelector(s);return e&&getComputedStyle(e).visibility!=='hidden'&&Number(getComputedStyle(e).opacity)>0})`);
 if(!noJs)throw new Error('No-JavaScript content hidden');
 const integrationLinks=await evaluate(`({whatsApp:[...document.querySelectorAll('a[href*="wa.me"]')].every(a=>new URL(a.href).pathname==='/916300675410'),email:[...document.querySelectorAll('a[href^="mailto:"]')].every(a=>a.getAttribute('href')==='mailto:contact@therapidnest.com')})`);
 if(!integrationLinks.whatsApp||!integrationLinks.email)throw new Error('Contact destination mismatch');
 const mockedContact=[];
 for(const outcome of ['success','failure']){
  await navigate(baseUrl+'/');
  await evaluate(`Object.defineProperty(navigator,'webdriver',{get:()=>false,configurable:true});localStorage.removeItem('rapidnest-contact');window.__mockCalls=[];const originalFetch=window.fetch;window.fetch=(input,init)=>{if(String(input).includes('api.emailjs.com')){window.__mockCalls.push(JSON.parse(init.body));return new Promise(resolve=>setTimeout(()=>resolve(new Response(${JSON.stringify(outcome)}==='success'?'OK':'Mock provider failure',{status:${JSON.stringify(outcome)}==='success'?200:500})),600));}return originalFetch(input,init)};`);
  await evaluate(`(()=>{const values={name:'Browser review',email:'review@example.org',company:'Example',phone:'123',service:'GDPR & Data Retention Solutions',budget:'Test only',timeline:'Test only',message:'Mocked request; no live email'};const f=document.querySelector('.contact-form');for(const [key,value]of Object.entries(values)){const input=f.elements.namedItem(key);const setter=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input),'value').set;setter.call(input,value);input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));}f.requestSubmit();f.requestSubmit()})()`);
  await new Promise(r=>setTimeout(r,100));
  const loading=await evaluate(`document.querySelector('.contact-form').getAttribute('aria-busy')==='true' && document.querySelector('.contact-form button[type="submit"]').disabled`);
  await new Promise(r=>setTimeout(r,900));
  const state=await evaluate(`({calls:window.__mockCalls.length,keys:window.__mockCalls[0]?Object.keys(window.__mockCalls[0].template_params).sort():[],status:document.querySelector('[role="status"]').textContent,error:document.querySelector('[role="alert"]')?.textContent||'',retained:document.querySelector('#name').value,message:window.__mockCalls[0]?.template_params.message})`);
  if(!loading||state.calls!==1||state.keys.join(',')!=='email,message,name'||(outcome==='success'?!state.status.includes('Your message was sent'):!state.error.includes('couldn’t send')||state.retained!=='Browser review'))throw new Error('Mock contact '+outcome+' '+JSON.stringify(state));
  mockedContact.push({outcome,loading,...state});
 }
 fs.writeFileSync(`${out}/results.json`,JSON.stringify({results,serviceResults,accessibility,reducedMotion,noJs,integrationLinks,mockedContact,consoleErrors,emailSubmission:'mocked in browser; external provider requests blocked'},null,2)+'\n');
 if(accessibility.some(scan=>scan.violations.length))throw new Error('Accessibility violations recorded in results.json');
 if(consoleErrors.length)throw new Error('Uncaught page exceptions '+consoleErrors.join(','));
 console.log('PASS reduced motion, no-JavaScript content, mocked browser EmailJS success/failure and duplicate protection.');
} finally {socket.close();}
