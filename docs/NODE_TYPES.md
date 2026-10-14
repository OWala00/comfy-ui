# Node types

Node types live in `src/nodes/createNode.js`. Each type lists its input slots and output slots. A slot has a name and a type.

## Built-in types

| Key | Title | Inputs | Outputs |
|-----|-------|--------|---------|
| `input` | Input | none | text (STRING) |
| `output` | Output | text (STRING) | none |
| `concatenate` | Concatenate | a, b (STRING) | text (STRING) |
| `delay` | Delay | text (STRING) | text (STRING) |
| `logger` | Logger | text (STRING) | text (STRING) |
| `timerStop` | Timer Stop | seconds (NUMBER) | stopped (BOOLEAN) |

The types only describe shape. The library does not run data through the graph. Delay and Logger have no timing or logging behavior yet.

## Create a node

```javascript
import { createNode } from './src/nodes/createNode.js';

const name = createNode('input', { id: 'name', x: 40, y: 80, title: 'Name' });
```

`createNode` throws if the type key is unknown.

## Add a new type

Add an entry to `NODE_TYPES`:

```javascript
multiply: {
  title: 'Multiply',
  inputs: [{ name: 'value', type: 'NUMBER' }],
  outputs: [{ name: 'result', type: 'NUMBER' }],
},
```

Dot colors come from the slot type. If you add a new slot type such as `NUMBER`, add it to `SLOT_COLORS` in `src/ui/components/Node.js`. Unknown types use a grey dot.

## Link rules

A link runs from an output slot to an input slot. Both slots must have the same type. A node cannot link to itself. Each input takes one link, so a new link into an input replaces the old one. An output can feed many inputs.
