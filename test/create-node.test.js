import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNode, NODE_TYPES } from '../src/nodes/createNode.js';

test('builds a node with the type defaults', () => {
  const node = createNode('concatenate', { id: 'join', x: 1, y: 2 });
  assert.equal(node.id, 'join');
  assert.equal(node.title, 'Concatenate');
  assert.equal(node.inputs.length, 2);
  assert.equal(node.outputs.length, 1);
});

test('title override wins over the type default', () => {
  assert.equal(createNode('input', { id: 'x', title: 'Name' }).title, 'Name');
});

test('rejects an unknown type', () => {
  assert.throws(() => createNode('missing'), /unknown node type/);
});

test('every registered type has a title and slot lists', () => {
  for (const [key, definition] of Object.entries(NODE_TYPES)) {
    assert.ok(definition.title, key);
    assert.ok(Array.isArray(definition.inputs), key);
    assert.ok(Array.isArray(definition.outputs), key);
  }
});
