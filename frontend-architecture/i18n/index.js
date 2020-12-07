/* eslint-disable import/no-unresolved */
import i18next from 'https://cdn.skypack.dev/i18next@19.8.4';
import onChange from 'https://cdn.skypack.dev/on-change@2.2.0';

const resources = {
  en: {
    translation: {
      table: {
        name: 'Name ({{direction}})',
        value: 'Value ({{direction}})',
      },
      sorting: {
        unsorted: 'Unsorted',
        asc: 'Asc',
        desc: 'Desc',
      },
    },
  }
};

// BEGIN (write your solution here)
const sort = (list, sortBy, direction) => list.sort((item1, item2) => {
  const param1 = item1[sortBy];
  const param2 = item2[sortBy];
  console.log(item1, item2);

  return direction === 'asc'
    ? param1.localeCompare(param2)
    : param2.localeCompare(param1);
});
const data = Object.entries(document.location)
  .filter(([, value]) => {
    if (typeof value === 'function') {
      return false;
    }
    if (typeof value === 'object') {
      return false;
    }
    if (value === '') {
      return false;
    }

    return true;
  })
  .map(([name, value]) => ({ name, value }));
const app = async () => {
  await i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  const buildTable = () => {
    const buildTh = (text) => {
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      const th = document.createElement('th');
      th.append(a);
      a.textContent = text;

      return th;
    };
    const table = document.createElement('table');
    const head = document.createElement('tr');
    const nameHead = buildTh(
      i18next.t('table.name', { direction: i18next.t('sorting.asc') }),
    );
    const valueHead = buildTh(
      i18next.t('table.value', { direction: i18next.t('sorting.unsorted') }),
    );

    head.append(nameHead, valueHead);
    table.append(head);

    return table;
  };
  const buildRows = () => {
    const rows = data
      .map(({ name, value }) => {
        const row = document.createElement('tr');
        const tdKey = document.createElement('td');
        tdKey.textContent = name;

        const tdValue = document.createElement('td');
        tdValue.textContent = value;
        row.append(tdKey, tdValue);

        return row;
      });

    return rows;
  };

  const state = {
    sorting: 'name',
    direction: 'asc',
  };
  const container = document.querySelector('.container');
  sort(data, state.sorting, state, state.direction);
  const table = buildTable();
  container.append(table);
  table.append(...buildRows());

  const watchedState = onChange(state, (path, value) => {
    console.log(state);
    container.innerHTML = '';
    const table = buildTable();
    container.append(table);

    [...table.children].slice(1).forEach((row) => row.removeElement());
    console.log(path);
    sort(data, state.sorting, state.direction);
    table.append(...buildRows());
  });

  const [linkName, linkValue] = [...document.querySelectorAll('th > a')];
  linkName.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hello');
    if (watchedState.sorting === 'name') {
      watchedState.direction = watchedState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      watchedState.sorting = 'name';
      watchedState.direction = 'asc';
    }
  });
  linkValue.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hello value');
    if (watchedState.sorting === 'value') {
      watchedState.direction = watchedState.direction === 'asc' ? 'desc' : 'asc';
      return;
    }
    watchedState.sorting = 'value';
    watchedState.direction = 'asc';
  });
};
// END
app();
