export function Form(props) {
  const { fields, onSubmit } = props;
  const form = document.createElement('form');
  form.className = 'form';
  
  fields.forEach(field => {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    label.className = 'form-label';
    
    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
    } else if (field.type === 'select') {
      input = document.createElement('select');
      field.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
    }
    
    input.name = field.name;
    input.className = 'form-input';
    input.required = field.required || false;
    
    group.appendChild(label);
    group.appendChild(input);
    form.appendChild(group);
  });
  
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Submit';
  button.className = 'btn btn-primary';
  form.appendChild(button);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = Object.fromEntries(data);
    if (onSubmit) onSubmit(obj);
  });
  
  return form;
}
