# Quick start

Open `demo/graph.html` in a browser, or use the [live demo](https://owala00.github.io/comfy-ui/demo/graph.html).

1. Move a node. Press a node and drag it.
2. Link two nodes. Press a dot on an output and drag to a dot on an input of the same type. Release on the input. The link replaces any link already on that input.
3. Remove a link. Right-click the link.
4. Edit a node. Double-click the node header. Change the title or color, then press Save.

## Use the components in your own page

```javascript
import { Graph } from './src/ui/components/Graph.js';
import { createNode } from './src/nodes/createNode.js';

const nodes = [
  createNode('input', { id: 'a', x: 40, y: 80, title: 'Greeting' }),
  createNode('output', { id: 'b', x: 400, y: 80 }),
];
const links = [
  { from: { node: 'a', slot: 0 }, to: { node: 'b', slot: 0 }, type: 'STRING' },
];

document.getElementById('app').appendChild(
  Graph({ width: 800, height: 400, nodes, links })
);
```

Load `src/ui/styles/graph.css` in the page too. See [NODE_TYPES.md](NODE_TYPES.md) for the node types.
