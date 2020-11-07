const state = {
  virtualItems: []
};

const fetchVirtualItems = async (projectId) => {
  const response = await fetch(`https://store.xsolla.com/api/v2/project/${projectId}/items/virtual_items`);
  const { items } = await response.json();
  state.virtualItems = items;
};

const makeCard = (title, text, imgUrl) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.width = '18rem';

  const imageElement = document.createElement('img');
  imageElement.setAttribute('src', imgUrl);
  imageElement.classList.add('card-img-top');
  imageElement.classList.add('w-25');
  imageElement.classList.add('img-thumbnail');

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
 * 
 * @param {array} items 
 */
const renderVirtualItems = (items) => {
  const dom = document.body;

  items.forEach((item) => {
    const itemCard = makeCard(
      item.name,
      item.description,
      item.image_url
    );
    dom.append(itemCard);
  });
};

fetchVirtualItems(54015);

renderVirtualItems(state.virtualItems);
console.log(state);