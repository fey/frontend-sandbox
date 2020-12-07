// import _ from 'lodash';

// BEGIN (write your solution here)
const getAnchor = (url) => {
  const [, anchor] = url.split('#');

  return anchor;
};
const app = () => {
  const state = {
    channels: [
      'general',
      'random',
      'random2',
    ],
    tasks: [],
    uiState: {
      taskInput: '',
      listInput: '',
      currentChannel: 'general',
    },
  };

  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const listForm = document.querySelector('[data-container="new-list-form"]');
  const taskForm = document.querySelector('[data-container="new-task-form"]');

  const render = () => {
    console.log(state);

    listForm.reset();
    taskForm.reset();

    listsContainer.innerHTML = '';
    const list = document.createElement('ul');
    const listElements = state.channels
      .map((channel) => {
        const li = document.createElement('li');
        const label = _.capitalize(channel);

        if (channel === state.uiState.currentChannel) {
          const b = document.createElement('b');
          b.textContent = label;
          li.append(b);

          return li;
        }

        const link = document.createElement('a');
        link.href = `#${channel}`;
        link.textContent = label;

        li.append(link);

        return li;
      });
    list.append(...listElements);
    listsContainer.append(list);
    listsContainer.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', (e) => {
        e.preventDefault();
        const channel = getAnchor(e.target.href);
        state.uiState.currentChannel = channel;

        render();
      });
    });



    tasksContainer.innerHTML = '';
    const tasksList = document.createElement('ul');
    const currentTasks = state.tasks
      .filter(({ channel }) => channel === state.uiState.currentChannel);

    if (currentTasks.length === 0) {
      return;
    }

    const tasksElements = currentTasks.map(({ name }) => {
      const li = document.createElement('li');
      li.textContent = name;

      return li;
    });

    tasksList.append(...tasksElements);
    tasksContainer.append(tasksList);
  };

  listForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    state.channels.push(name.toLowerCase());
    render();
  });

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    state.tasks.push({
      channel: state.uiState.currentChannel,
      name,
    });

    render();
  });

  render();
};

app();
// END
