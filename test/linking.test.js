import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canConnect, connect } from '../src/ui/components/linking.js';

const output = (node, type = 'STRING') => ({ node, side: 'output', type });
const input = (node, type = 'STRING') => ({ node, side: 'input', type });

test('allows output to input of the same type', () => {
  assert.equal(canConnect(output('a'), input('b')), true);
});

test('rejects mismatched types', () => {
  assert.equal(canConnect(output('a', 'STRING'), input('b', 'NUMBER')), false);
});

test('rejects output to output and input to input', () => {
  assert.equal(canConnect(output('a'), output('b')), false);
  assert.equal(canConnect(input('a'), input('b')), false);
});

test('rejects a link from a node to itself', () => {
  assert.equal(canConnect(output('a'), input('a')), false);
});

test('connect replaces an existing link into the same input', () => {
  const first = { from: { node: 'a', slot: 0 }, to: { node: 'b', slot: 0 }, type: 'STRING' };
  const second = { from: { node: 'c', slot: 0 }, to: { node: 'b', slot: 0 }, type: 'STRING' };
  assert.deepEqual(connect([first], second), [second]);
});

test('connect keeps links into other inputs', () => {
  const other = { from: { node: 'a', slot: 0 }, to: { node: 'b', slot: 1 }, type: 'STRING' };
  const link = { from: { node: 'c', slot: 0 }, to: { node: 'b', slot: 0 }, type: 'STRING' };
  assert.deepEqual(connect([other], link), [other, link]);
});
