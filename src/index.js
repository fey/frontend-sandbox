import _ from 'lodash';

const app = async () => {
  const state = {
    virtualItems: [],
  };
  const fetchVirtualItems = async (projectId) => {
    const response = await fetch(`https://store.xsolla.com/api/v2/project/${projectId}/items/virtual_items`);
    const { items } = await response.json();
    return items;
  };

  const makeCard = (title, text, imgUrl) => {
    const card = document.createElement('div');
    card.classList.add('card', 'col-sm-4');

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imgUrl);
    imageElement.classList.add('card-img-top', 'w-25');

    const bodyElement = document.createElement('div');
    bodyElement.classList.add('card-body');

    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.innerText = title;

    const textElement = document.createElement('p');
    textElement.classList.add('card-text');
    textElement.innerText = text;

    card.append(imageElement);
    card.append(bodyElement);

    bodyElement.append(titleElement);
    bodyElement.append(textElement);

    return card;
  };

  /**
   * @param {array} items
   */
  const renderVirtualItems = (items) => {
    const content = document.getElementById('content');

    const rows = _.chain(items)
      .map(({ name, description, image_url: imageUrl }) => makeCard(name, description, imageUrl))
      .chunk(3)
      .map((virtualItemNodes) => {
        const row = document.createElement('div');
        row.classList.add('row', 'mt-5');
        row.append(...virtualItemNodes);
        return row;
      })
      .value();

    content.append(...rows);
  };

  state.virtualItems = await fetchVirtualItems(54015);

  await renderVirtualItems(state.virtualItems);
};

app();
