import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTimerStop } from '../src/nodes/TimerStop.js';

test('rejects a non-positive duration', () => {
  assert.throws(() => createTimerStop({ seconds: 0, onStop() {} }), /greater than 0/);
});

test('rejects a missing stop callback', () => {
  assert.throws(() => createTimerStop({ seconds: 1 }), /onStop must be a function/);
});

test('calls onStop once after the duration', async () => {
  let calls = 0;
  const timer = createTimerStop({ seconds: 0.02, onStop: () => calls++ });
  timer.start();
  timer.start();
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(calls, 1);
  assert.equal(timer.stopped, true);
});

test('cancel prevents onStop from firing', async () => {
  let calls = 0;
  const timer = createTimerStop({ seconds: 0.02, onStop: () => calls++ });
  timer.start();
  timer.cancel();
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(calls, 0);
  assert.equal(timer.stopped, false);
});
