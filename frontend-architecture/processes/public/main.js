const app = export default () => {
  const state = {
    name: {
      value: '',
      mode: 'empty', // edit
    },
    email: {
      value: '',
      mode: 'empty', // edit
    },
  };
  const name = document.querySelector('[data-editable-target="name"]');
  const email = document.querySelector('[data-editable-target="email"]');

  const buildForm = (inputName, value) => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const submit = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', inputName);
    input.setAttribute('value', value);
    submit.type = 'submit';
    submit.value = 'Save';
    form.append(input);
    form.append(submit);

    return form;
  };

  const clickEditHandler = (e) => {
    e.preventDefault();
    const target = e.target.dataset.editableTarget;

    state[target].mode = 'edit';

    render();
  };

  const clickSubmitHandler = (target) => (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const formData = new FormData(e.target);
    const value = formData.get(target);
    state[target] = {
      value,
      mode: value === '' ? 'empty' : 'filled',
    };

    render();
  };

  const renderName = () => {
    switch (state.name.mode) {
      case 'filled': {
        name.textContent = state.name.value;
        name.addEventListener('click', clickEditHandler);
        return;
      }
      case 'empty': {
        const textEl = document.createElement('i');
        textEl.textContent = 'name';
        name.innerHTML = '';
        name.appendChild(textEl);

        name.addEventListener('click', clickEditHandler);
        return;
      }
      case 'edit': {
        const form = buildForm('name', state.name.value);
        name.innerHTML = '';
        name.appendChild(form);

        form.addEventListener('submit', clickSubmitHandler('name'), true);
        name.removeEventListener('click', clickEditHandler);
        return;
      }
      default:
        throw Error('Unknown state for "name" input');
    }
  };

  const renderEmail = () => {
    switch (state.email.mode) {
      case 'filled': {
        email.textContent = state.email.value;
        email.addEventListener('click', clickEditHandler);
        return;
      }
      case 'empty': {
        const textEl = document.createElement('i');
        textEl.textContent = 'email';
        email.innerHTML = '';
        email.appendChild(textEl);

        email.addEventListener('click', clickEditHandler);
        return;
      }
      case 'edit': {
        const form = buildForm('email', state.email.value);
        email.innerHTML = '';
        email.appendChild(form);

        form.addEventListener('submit', clickSubmitHandler('email'));
        email.removeEventListener('click', clickEditHandler);
        return;
      }
      default:
        throw Error('Unknown state for "email" input');
    }
  };

  const render = () => {
    renderName();
    renderEmail();
  };

  render();
};

app();
