import assert from 'node:assert/strict';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflow = JSON.parse(fs.readFileSync(new URL('../examples/chat-demo.workflow.json', import.meta.url), 'utf8'));

assert.equal(pkg.license, 'MIT');
assert.ok(pkg.keywords.includes('n8n-community-node-package'));
assert.ok(pkg.n8n.nodes.some((p) => p.endsWith('Apiyi.node.js')));
assert.ok(pkg.n8n.credentials.some((p) => p.endsWith('ApiyiApi.credentials.js')));

const apiyiNode = workflow.nodes.find((node) => node.type === 'n8n-nodes-apiyi-wealth-engine.apiyi');
assert.ok(apiyiNode, 'demo workflow must contain the APIYI community node');
assert.equal(apiyiNode.parameters.operation, 'chat');
assert.ok(apiyiNode.parameters.prompt);

console.log('APIYI package smoke checks passed');
