# Comfy UI

A small JavaScript UI library, plus a Timer Stop custom node for ComfyUI.

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

## ComfyUI custom node: Timer Stop

`comfyui_timer_stop/` is a ComfyUI custom node. Add a Timer Stop node with a `seconds` input. When the node runs, it starts a timer. When the timer fires, it calls ComfyUI's `interrupt_current_processing()`, which stops the running generation.

Install:

1. Copy the `comfyui_timer_stop/` folder into `ComfyUI/custom_nodes/`.
2. Restart ComfyUI. The node appears under `utils/timing` as "Timer Stop".

Limits:

- The timer does not check which job is running. If the job finishes before the timer fires, the interrupt can hit the next job.
- The node is covered by unit tests with a stubbed `comfy` module. It has not been run inside a live ComfyUI instance from this repo.
- The JavaScript `src/nodes/TimerStop.js` is a separate sample and does not connect to ComfyUI.

## Development

```bash
npm install
npm run dev
```

## License

MIT
