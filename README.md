# Comfy UI

A minimal, composable UI framework for JavaScript.

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
