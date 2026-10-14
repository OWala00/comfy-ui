# Comfy UI

A minimal, composable UI framework for JavaScript.

![comfy UI node graph](docs/thumbnail.png)

The image is rendered from `demo/graph.html` by `scripts/render-thumbnail.sh`. It shows the node and graph components with placeholder nodes.

## Features

- Lightweight: no dependencies (except express for server)
- Simple component model
- CSS-in-JS ready
- TypeScript support planned

## Quick Start

```javascript
import { Button, render } from './src/ui/render.js';

const btn = Button({ 
  label: 'Get Started',
  onClick: () => alert('Hello!')
});

render(btn, document.getElementById('app'));
```

## Development

```bash
npm install
npm run dev
```

## License

MIT
