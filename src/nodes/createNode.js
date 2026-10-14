export const NODE_TYPES = {
  input: {
    title: 'Input',
    inputs: [],
    outputs: [{ name: 'text', type: 'STRING' }],
  },
  output: {
    title: 'Output',
    inputs: [{ name: 'text', type: 'STRING' }],
    outputs: [],
  },
  concatenate: {
    title: 'Concatenate',
    inputs: [
      { name: 'a', type: 'STRING' },
      { name: 'b', type: 'STRING' },
    ],
    outputs: [{ name: 'text', type: 'STRING' }],
  },
  delay: {
    title: 'Delay',
    inputs: [{ name: 'text', type: 'STRING' }],
    outputs: [{ name: 'text', type: 'STRING' }],
  },
  logger: {
    title: 'Logger',
    inputs: [{ name: 'text', type: 'STRING' }],
    outputs: [{ name: 'text', type: 'STRING' }],
  },
  timerStop: {
    title: 'Timer Stop',
    inputs: [{ name: 'seconds', type: 'NUMBER' }],
    outputs: [{ name: 'stopped', type: 'BOOLEAN' }],
  },
};

export function createNode(type, { id, x, y, title, color } = {}) {
  const definition = NODE_TYPES[type];
  if (!definition) throw new Error(`unknown node type: ${type}`);
  return {
    id,
    x,
    y,
    title: title ?? definition.title,
    color,
    inputs: definition.inputs,
    outputs: definition.outputs,
  };
}
