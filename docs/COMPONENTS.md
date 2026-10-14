# Component Library

## Form

Renders a form with configurable fields.

```javascript
const form = Form({
  fields: [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea' }
  ],
  onSubmit: (data) => console.log(data)
});
```

## Modal

A modal dialog overlay.

```javascript
const modal = Modal({
  title: 'Confirm',
  content: 'Are you sure?',
  onClose: () => modal.remove()
});
document.body.appendChild(modal);
```

## State Management

Simple reactive store.

```javascript
const store = createStore({ count: 0 });
store.subscribe((state) => console.log(state));
store.setState({ count: 1 });
```
