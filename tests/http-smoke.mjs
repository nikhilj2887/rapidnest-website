import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const source = ts.transpileModule(fs.readFileSync('app/data/services.ts', 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const sandbox = {exports:{}};
new Function('exports', source)(sandbox.exports);
const {services} = sandbox.exports;
const routes = ['/', '/work', ...services.map(s=>`/services/${s.slug}`)];
for (const route of routes) {
  const response = await fetch(base+route);
  assert.equal(response.status,200,route);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${route}: one h1`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `${route}: canonical exists`);
  assert.equal(new URL(canonical[1]).href,new URL(`https://www.therapidnest.com${route}`).href,`${route}: canonical`);
  assert.ok(html.includes('href="/#services"') && html.includes('href="/#contact"'),`${route}: nested navigation`);
  assert.ok(html.includes('application/ld+json'),`${route}: structured data`);
  assert.ok(html.includes('name="twitter:card"'),`${route}: Twitter card`);
  assert.ok(html.includes('property="og:title"'),`${route}: Open Graph`);
  if(route==='/') {
    for(const id of ['services','work','why-us','methodology','technology','about','founder','contact']) assert.ok(html.includes(`id="${id}"`),id);
    assert.equal((html.match(/name="service"/g)||[]).length,1);
    assert.ok(html.includes('Baseline Retention Solution'));
    assert.ok(html.includes("Organizations We&amp;#x27;ve Worked With") || html.includes("Organizations We&#x27;ve Worked With") || html.includes("Organizations We've Worked With"));
    assert.ok(!html.includes('Happy Customers'));
    assert.ok(html.includes('id="partnerships"'));
    assert.ok(html.includes('id="clients"'));
    assert.ok(!html.includes('/partners/ALL.png'));
    assert.ok(!html.includes('Official Digital Partner'));
    assert.ok(!html.includes('Selected during technical discovery.'));
    assert.ok(!html.includes('publication permissions are confirmed'));
    assert.ok(html.includes('Concept interface'));
    assert.ok(!html.includes('orbit-one'));
    assert.ok(html.includes('google-analytics') && html.includes('G-HX5DG2E97J'));
  }
  if(route.startsWith('/services/')) {
    assert.ok(html.includes('Problems this service addresses'));
    assert.ok(html.includes('What an engagement can include'));
    assert.ok(html.includes('How we approach the work'));
    assert.ok(!html.includes('guide our delivery approach with clear review points'));
  }
  console.log(`PASS ${route}: HTTP 200, heading, canonical, navigation and social metadata`);
}
for(const route of ['/services/not-a-service','/work/unapproved-story']) {
  assert.equal((await fetch(base+route)).status,404,route);
  console.log(`PASS ${route}: HTTP 404`);
}
const sitemap = await (await fetch(base+'/sitemap.xml')).text();
for(const route of routes) assert.ok(sitemap.includes(`https://www.therapidnest.com${route}`));
assert.ok(!sitemap.includes('/work/unapproved-story'));
assert.ok((await (await fetch(base+'/robots.txt')).text()).includes('https://www.therapidnest.com/sitemap.xml'));
console.log('PASS sitemap and robots');
for (const url of ['/Rapidnest.png','/founder.png','/_next/image?url=%2FRapidnest.png&w=96&q=75','/_next/image?url=%2Ffounder.png&w=640&q=75']) {
 const response=await fetch(base+url); assert.equal(response.status,200,url); assert.ok(response.headers.get('content-type').startsWith('image/')); console.log(`PASS asset ${url}`);
}
