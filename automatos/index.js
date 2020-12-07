const editableElements = document.querySelectorAll('[data-editable-target]');
const initialState = {
  type: 'normal',
};
const state = {};

editableElements.forEach((element) => {
  element.addEventListener('click', (e) => {
    console.log(e.target);
  }, true);
});
