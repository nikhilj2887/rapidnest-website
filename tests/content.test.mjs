import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load(file) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const sandboxModule = { exports: {} };
  new Function('module', 'exports', 'require', output)(sandboxModule, sandboxModule.exports, () => {throw new Error("Unexpected dependency");});
  return sandboxModule.exports;
}
const { services } = load('app/data/services.ts');
const { getApprovedCaseStudies } = load('app/data/case-studies.ts');
const { relationships, getApprovedRelationships } = load('app/data/relationships.ts');
const { technologyCategories, technologyInventory, getApprovedTechnologyNames } = load('app/data/technology.ts');
test('seven complete services have unique URL-safe slugs', () => {
  assert.equal(services.length, 7);
  assert.equal(new Set(services.map(s => s.slug)).size, 7);
  for (const s of services) {
    assert.match(s.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const key of ['icon', 'title', 'description', 'detailedDescription', 'cta']) assert.ok(s[key]);
    assert.ok(s.capabilities.length && s.useCases.length);
  }
});
test('GDPR capability includes all nine governance areas', () => {
  const s = services.find(s => s.slug === 'gdpr-data-retention');
  assert.equal(s.capabilities.length, 9);
  assert.ok(s.capabilities.includes('Validation Jobs and Approval Workflows'));
});
test('publication gate excludes pending and declined studies across every status', () => {
  const fixture = ['approved', 'pending', 'declined'].flatMap(publicationApproval => ['in-progress', 'completed'].map(deliveryStatus => ({ publicationApproval, deliveryStatus })));
  assert.equal(getApprovedCaseStudies(fixture).length, 2);
  assert.ok(getApprovedCaseStudies(fixture).every(s => s.publicationApproval === 'approved'));
  assert.deepEqual(getApprovedCaseStudies(), []);
});
test('relationships are preserved for review and no placeholder URL is published', () => {
  assert.equal(relationships.length, 8);
  assert.equal(relationships.filter(r => r.kind === 'partner').length, 2);
  assert.equal(relationships.find(r => r.name === 'Baseline Retention Solution').url, null);
  for (const r of relationships) {
    assert.equal(r.verification, 'verified');
    assert.equal(r.publicationApproved, true);
    assert.ok(r.publicationEvidence.includes("Owner confirmed"));
    assert.ok(fs.existsSync(`public${r.logo}`));
    if (r.url) assert.equal(new URL(r.url).protocol, 'https:');
  }
});
function contactHarness(send) {
  const updates = [];
  const events = [];
  const output = ts.transpileModule(fs.readFileSync('app/components/Contact.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;
  const sandboxModule = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    react: { useState: () => ['idle', value => updates.push(value)], useRef: value => ({ current: value }) },
    'react/jsx-runtime': { jsx, jsxs: jsx },
    '@emailjs/browser': { default: { send } },
    '../data/services': { services }
  };
  new Function('module', 'exports', 'require', output)(sandboxModule, sandboxModule.exports, id => dependencies[id]);
  function find(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'form') return node;
    for (const child of [node.props?.children].flat(Infinity)) { const result = find(child); if (result) return result; }
  }
  global.window = { gtag: (...args) => events.push(args) };
  const form = find(sandboxModule.exports.default());
  return { submit: form.props.onSubmit, updates, events, form };
}
function inquiry(overrides = {}) {
  const values = { name: 'Example', email: 'example@example.org', message: 'A project brief', company: 'Example Co', service: 'GDPR & Data Retention Solutions', ...overrides };
  let reset = false;
  const fakeForm = { reportValidity: () => true, reset: () => { reset = true; } };
  global.FormData = class { get(key) { return values[key] ?? ''; } };
  return { event: { preventDefault() {}, currentTarget: fakeForm }, wasReset: () => reset };
}
test('contact preserves EmailJS contract, appends optional details and sends a PII-free event', async () => {
  const calls = [];
  const h = contactHarness(async (...args) => calls.push(args));
  const i = inquiry();
  await h.submit(i.event);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], 'service_s6mwk07');
  assert.equal(calls[0][1], 'template_274iknk');
  assert.deepEqual(Object.keys(calls[0][2]).sort(), ['email', 'message', 'name']);
  assert.match(calls[0][2].message, /GDPR & Data Retention Solutions/);
  assert.equal(calls[0][3].limitRate.throttle, 30000);
  assert.deepEqual(h.updates, ['sending', 'success']);
  assert.equal(h.events.length, 1);
  assert.ok(!JSON.stringify(h.events).includes('example@example.org'));
  assert.ok(i.wasReset());
});
test('contact failure preserves form and avoids conversion events', async () => {
  const h = contactHarness(async () => { throw new Error('provider unavailable'); });
  const i = inquiry();
  await h.submit(i.event);
  assert.deepEqual(h.updates, ['sending', 'error']);
  assert.equal(h.events.length, 0);
  assert.equal(i.wasReset(), false);
});
test('honeypot and blank required fields prevent provider calls', async () => {
  let calls = 0;
  const h = contactHarness(async () => { calls++; });
  await h.submit(inquiry({ website: 'spam' }).event);
  await h.submit(inquiry({ name: '   ' }).event);
  assert.equal(calls, 0);
});
test('concurrent and rapid repeat inquiries do not duplicate provider requests', async () => {
  let finish, calls = 0;
  const h = contactHarness(() => { calls++; return new Promise(resolve => { finish = resolve; }); });
  const i = inquiry();
  const pending = h.submit(i.event);
  await h.submit(i.event);
  assert.equal(calls, 1);
  finish();
  await pending;
  await h.submit(i.event);
  assert.equal(calls, 1);
});


test('client and partner eligibility requires both evidence and publication approval', () => {
  const fixture = ['client', 'partner'].flatMap(kind => ['pending', 'verified'].flatMap(verification => [true, false].map(publicationApproved => ({kind, verification, publicationApproved}))));
  for (const kind of ['client','partner']) {
    const eligible = getApprovedRelationships(kind, fixture);
    assert.equal(eligible.length, 1);
    assert.ok(eligible.every(record => record.kind === kind && record.verification === 'verified' && record.publicationApproved));
    assert.equal(getApprovedRelationships(kind).length, kind === 'client' ? 6 : 2);
  }
});


test('each service has distinct, complete engagement content and aligned capability detail', () => {
  assert.equal(new Set(services.map(service => service.detailedDescription)).size, services.length);
  assert.equal(new Set(services.map(service => service.implementation)).size, services.length);
  for(const service of services) {
    assert.equal(service.capabilityDetails.length, service.capabilities.length);
    assert.ok(service.challenges.length >= 3 && service.deliverables.length >= 3);
    assert.ok(service.integrationConsiderations && service.faqs.length >= 2);
    assert.ok(service.capabilityDetails.every(detail => !detail.includes('around agreed requirements, integration constraints, and acceptance criteria.')));
    assert.ok(service.technologies.every(technology => getApprovedTechnologyNames().includes(technology)));
  }
});

test('technology names require both verification and publication approval', () => {
  const fixture = ['verified', 'pending'].flatMap(verification => [true, false].map(publicationApproved => ({name:verification+publicationApproved,verification,publicationApproved})));
  assert.deepEqual(getApprovedTechnologyNames(fixture), ['verifiedtrue']);
  assert.equal(new Set(getApprovedTechnologyNames()).size, 14);
  assert.ok(technologyInventory.every(record => record.verification === 'verified' && record.publicationApproved));
});

test('six capability categories use only approved product names', () => {
  assert.equal(technologyCategories.length, 6);
  assert.equal(new Set(technologyCategories.map(category => category.id)).size, 6);
  for(const category of technologyCategories) {
    assert.ok(category.title && category.description);
    assert.ok(category.technologies.every(name => getApprovedTechnologyNames().includes(name)));
  }
});

test('related services point to existing distinct capabilities', () => {
  for(const service of services) {
    assert.equal(new Set(service.relatedServices).size, 2);
    assert.ok(service.relatedServices.every(slug => slug !== service.slug && services.some(item => item.slug === slug)));
  }
});

test('contact accepts only required details and omits empty optional payload fields', async () => {
  const calls=[];
  const h=contactHarness(async (...args)=>calls.push(args));
  const i=inquiry({company:'',phone:'',service:'',budget:'',timeline:''});
  await h.submit(i.event);
  assert.equal(calls.length,1);
  assert.deepEqual(calls[0][2],{name:'Example',email:'example@example.org',message:'A project brief'});
  assert.deepEqual(h.updates,['sending','success']);
  assert.ok(i.wasReset());
});

test('the form requires only name, email and project details', () => {
  const h=contactHarness(async()=>{});
  const fields=[];
  function walk(node){if(!node||typeof node!=='object')return;if(node.props?.name)fields.push(node);for(const child of [node.props?.children].flat(Infinity))walk(child);}
  walk(h.form);
  assert.deepEqual(fields.filter(field=>field.props.required).map(field=>field.props.name).sort(),['email','message','name']);
  assert.ok(['company','phone','service','budget','timeline'].every(name=>fields.some(field=>field.props.name===name&&!field.props.required)));
});
