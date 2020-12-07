// eslint-disable-next-line import/no-unresolved
import onChange from 'https://cdn.skypack.dev/on-change@2.2.0';

const app = () => {
  const state = {};
  const tabLists = document.querySelectorAll('[role="tablist"]');

  const render = (watchedState) => {
    document.querySelectorAll('[role="tabpanel"]')
      .forEach((content) => {
        content.classList.remove('show', 'active');
      });
    document.querySelectorAll('[role="tab"]')
      .forEach((tab) => {
        tab.classList.remove('active');
      });
    tabLists.forEach((tabList) => {
      if (watchedState[tabList.id] === undefined) {
        const currentTab = tabList.querySelector('[role="tab"]');
        currentTab.classList.add('active');
        const currentPanel = document.querySelector(`[aria-labelledby="${currentTab.id}"]`);

        currentPanel.classList.add('show', 'active');
        return;
      }

      const currentTabId = watchedState[tabList.id];
      document.querySelector(`[id="${currentTabId}"]`).classList.add('active');
      document.querySelector(`[aria-labelledby="${currentTabId}"]`).classList.add('show', 'active');
    });
  };

  const watchedState = onChange(state, () => {
    render(watchedState);
  });

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        watchedState[tabList.id] = e.target.id;
      });
    });
  });

  render(watchedState);
};

app();
