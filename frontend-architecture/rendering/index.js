const laptops = [
  {
    model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
  },
  {
    model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
  },
  {
    model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
  },
];

// BEGIN (write your solution here)
const app = () => {
  const state = {
    processorEq: '',
    memoryEq: '',
    frequencyGte: '',
    frequencyLte: '',
  };
  const filters = [
    ({ processor }) => !state.processorEq || processor === state.processorEq,
    ({ memory }) => !state.memoryEq || memory === parseInt(state.memoryEq, 10),
    ({ frequency }) => !state.frequencyGte || frequency >= parseFloat(state.frequencyGte),
    ({ frequency }) => !state.frequencyLte || frequency <= parseFloat(state.frequencyLte),
  ];
  const render = () => {
    const resultEl = document.querySelector('.result');
    resultEl.innerHTML = '';
    const list = document.createElement('ul');

    const listItems = laptops
      .filter((laptop) => Object.values(filters).every((condition) => (
        condition(laptop)
      )))
      .map((laptop) => {
        const li = document.createElement('li');
        li.textContent = laptop.model;

        return li;
      });

    list.append(...listItems);
    resultEl.append(list);
  };

  const processorEq = document.querySelector('[name="processor_eq"]');
  const memoryEq = document.querySelector('[name="memory_eq"]');
  const frequencyGte = document.querySelector('[name="frequency_gte"]');
  const frequencyLte = document.querySelector('[name="frequency_lte"]');

  processorEq.addEventListener('change', ({ target: { value } }) => {
    state.processorEq = value;
    render();
  });
  memoryEq.addEventListener('change', ({ target: { value } }) => {
    state.memoryEq = value;
    render();
  });

  frequencyGte.addEventListener('change', ({ target: { value } }) => {
    state.frequencyGte = value;
    render();
  });

  frequencyLte.addEventListener('change', ({ target: { value } }) => {
    state.frequencyLte = value;
    render();
  });

  render();
};

app();
// END
