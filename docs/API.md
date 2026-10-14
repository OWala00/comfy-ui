# Comfy UI API

## Core Functions

### `render(element, target)`
Render an element into a target DOM node.

**Parameters:**
- `element` (HTMLElement): The element to render
- `target` (HTMLElement): The container element

**Example:**
```javascript
const btn = Button({ label: 'Click me' });
render(btn, document.getElementById('app'));
```

### `createElement(type, props, ...children)`
Create a DOM element with props and children.

**Parameters:**
- `type` (string): HTML tag name
- `props` (object): Element attributes and event handlers
- `children` (string | HTMLElement): Child nodes

## Components

### Button
A basic button component with variants.

### IconButton
A button that displays an icon instead of text.
