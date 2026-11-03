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
 if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') consoleErrors.push(message.params.args.map(arg=>arg.value ?? arg.description ?? arg.type).join(' '));
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const requestId = ++id; const timer = setTimeout(() => {pending.delete(requestId); reject(new Error(method+' timed out'));}, 20000); pending.set(requestId,{resolve,reject,timer}); socket.send(JSON.stringify({id:requestId,method,params})); }); }
async function evaluate(expression) { const result = await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true}); if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails)); return result.result.value; }
async function navigate(url) {
 await send('Page.navigate',{url});
 for(let attempt=0;attempt<80;attempt++) { if(await evaluate(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && !!document.querySelector('main h1')`))break; await new Promise(r=>setTimeout(r,100)); }
 await evaluate(`Promise.race([Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})})),new Promise(r=>setTimeout(r,10000))])`);
 await new Promise(r=>setTimeout(r,700));
}
// Natural animation and real input audit: never calls finish(), changes animation time,
// forces :hover, or disables motion except during the explicit reduced-motion check.
const out=process.cwd()+'/docs/final-qa-completion';fs.mkdirSync(out,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function clickAt(selector,touch=false){
 const r=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)}),r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);
 if(touch){await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x,y:r.y}]});await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 else {await send('Input.dispatchMouseEvent',{type:'mouseMoved',...r});await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...r});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...r});}
}
async function shot(name){const {data}=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(out+'/'+name+'.png',Buffer.from(data,'base64'));}
const results=[];
let instrumentationId;
try{
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Page.bringToFront');
 await send('Network.setBlockedURLs',{urls:['*googletagmanager.com*','*google-analytics.com*','*emailjs.com*']});
 ({identifier:instrumentationId}=await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.__natural={events:[],samples:[],shifts:[]};new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__natural.shifts.push(e.value)})).observe({type:'layout-shift',buffered:true});for(const type of ['animationstart','animationend'])document.addEventListener(type,e=>window.__natural.events.push({type,name:e.animationName,target:e.target.className,time:performance.now()}),true);const timer=setInterval(()=>{const h=document.querySelector('.hero h1');if(!h)return;window.__natural.samples.push({time:performance.now(),headlineOpacity:Number(getComputedStyle(h).opacity),headlineTranslate:getComputedStyle(h).translate,stageOpacity:[...document.querySelectorAll('.hero .pipeline-column')].map(e=>Number(getComputedStyle(e,'::after').opacity))});if(performance.now()>10500)clearInterval(timer)},40);`}));
 for(const width of [1440,390]){
  const mobile=width===390;await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile});await send('Emulation.setTouchEmulationEnabled',{enabled:mobile,maxTouchPoints:mobile?5:1});await send('Emulation.setEmulatedMedia',{features:[]});
  await navigate(baseUrl+'/');await shot('natural-initial-'+width);
  await sleep(1800);await shot('natural-stage-'+width);
  await sleep(7000);
  const natural=await evaluate(`({events:window.__natural.events,samples:window.__natural.samples,cls:window.__natural.shifts.reduce((a,b)=>a+b,0),running:document.getAnimations().filter(a=>a.playState==='running').length})`);
  const starts=natural.events.filter(e=>e.type==='animationstart');const ends=natural.events.filter(e=>e.type==='animationend');
  if(!natural.samples.some(s=>s.headlineOpacity<.99)||!natural.samples.some(s=>s.headlineOpacity===1)||!natural.samples.some(s=>s.stageOpacity.some(o=>o>.1))||natural.running!==0||natural.cls>.01||starts.filter(e=>e.name==='hero-enter').length!==2||ends.filter(e=>e.name==='hero-enter').length!==2)throw Error('Natural hero motion '+width+' '+JSON.stringify({starts,ends,running:natural.running,cls:natural.cls}));
  console.log('PASS real-time hero progression and completion '+width);
  await evaluate(`document.documentElement.style.scrollBehavior='auto';document.querySelector('#technology').scrollIntoView({behavior:'instant',block:'start'})`);await sleep(1000);
  for(let i=0;i<6;i++){await evaluate(`document.querySelectorAll('.technology-category')[${i}].scrollIntoView({behavior:'instant',block:'center'})`);await sleep(750);}
  const reveal=await evaluate(`({count:document.querySelectorAll('.technology-category.reveal-enter').length,events:window.__natural.events.filter(e=>e.target.includes('technology-category'))})`);
  await evaluate(`scrollTo({top:0,behavior:'instant'});document.querySelector('#technology').scrollIntoView({behavior:'instant'})`);await sleep(900);
  const after=await evaluate(`window.__natural.events.filter(e=>e.target.includes('technology-category')).length`);
  if(reveal.count!==6||after!==reveal.events.length)throw Error('Reveal replay '+width);
  await navigate(baseUrl+'/');await evaluate(`document.documentElement.style.scrollBehavior='auto';document.querySelector('.service-card').scrollIntoView({behavior:'instant',block:'center'})`);await sleep(800);
  if(mobile){await clickAt('.service-card h3',true);}else{const r=await evaluate(`(()=>{const r=document.querySelector('.service-card').getBoundingClientRect();return{x:r.left+20,y:r.top+20}})()`);await send('Input.dispatchMouseEvent',{type:'mouseMoved',...r});}
  await sleep(350);const hover=await evaluate(`({transform:getComputedStyle(document.querySelector('.service-card')).transform,coarse:matchMedia('(pointer:coarse)').matches,hover:matchMedia('(hover:hover)').matches})`);
  if(mobile?hover.transform!=='none':!hover.transform.includes('-3'))throw Error('Actual hover/touch '+JSON.stringify(hover));
  await clickAt('.service-card .text-link',mobile);for(let i=0;i<60;i++){if(await evaluate(`location.pathname==='/services/custom-software-development'`))break;await sleep(100);}
  if(!await evaluate(`location.pathname==='/services/custom-software-development'`))throw Error('Actual service click');
  await navigate(baseUrl+'/');
  if(mobile){await clickAt('.menu-toggle',true);if(!await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'`))throw Error('Touch menu');await clickAt('#nav-links a[href="/#contact"]',true);await sleep(800);if(!await evaluate(`location.hash==='#contact'&&document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'`))throw Error('Touch anchor');}
  else{await clickAt('header a[href="/#contact"]');await sleep(800);if(!await evaluate(`location.hash==='#contact'`))throw Error('Mouse anchor');}
  await evaluate(`document.documentElement.style.scrollBehavior='auto';document.querySelector('#name').scrollIntoView({behavior:'instant',block:'center'})`);await sleep(800);await clickAt('#name',mobile);await sleep(100);if(!await evaluate(`document.activeElement.id==='name'`))throw Error('Actual input focus '+width+' '+JSON.stringify(await evaluate(`({id:document.activeElement.id,scrollY})`)));
  await evaluate(`scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'})`);await sleep(800);await shot('footer-'+width);
  const content=await evaluate(`({services:document.querySelectorAll('.service-card').length,clients:document.querySelectorAll('#clients .logo-card').length,partners:document.querySelectorAll('.partnership-card').length,portrait:document.querySelector('.founder-photo img').getAttribute('src'),caseLinks:[...document.querySelectorAll('main a')].filter(a=>(a.getAttribute('href')||'').startsWith('/work/')).map(a=>a.href),overflow:document.documentElement.scrollWidth>innerWidth})`);if(content.services!==7||content.clients!==6||content.partners!==2||content.caseLinks.length||content.overflow)throw Error('Preservation '+width);
  results.push({width,mobile,natural,reveal,hover,content});console.log('PASS natural animation and real '+(mobile?'touch':'mouse')+' input '+width);
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await navigate(baseUrl+'/');const reduced=await evaluate(`({running:document.getAnimations().filter(a=>a.playState==='running').length,headline:getComputedStyle(document.querySelector('.hero h1')).animationName,scroll:getComputedStyle(document.documentElement).scrollBehavior})`);if(reduced.running||reduced.headline!=='none'||reduced.scroll!=='auto')throw Error('Reduced motion');
 await send('Emulation.setEmulatedMedia',{features:[]});await send('Emulation.setTouchEmulationEnabled',{enabled:false});await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:instrumentationId});
 fs.writeFileSync(out+'/natural-interactions.json',JSON.stringify({results,reduced,consoleErrors,animationManipulation:'none; real-time sampling and actual mouse/touch events only'},null,2));if(consoleErrors.length)throw Error('Console errors');console.log('PASS actual animation lifecycle, one-time reveals, reduced motion, mouse and touch, content and CLS');
}finally{if(instrumentationId)await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:instrumentationId}).catch(()=>{});socket.close()}
