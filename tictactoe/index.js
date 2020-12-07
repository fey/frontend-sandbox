const play = () => {
  const circle = '○';
  const cross = '❌';

  const tableEl = document.getElementById('field');
  let currentSymbol = cross;
  const switchPlayer = () => {
    currentSymbol = currentSymbol === cross ? circle : cross;
  };

  tableEl.addEventListener('click', (e) => {
    if (e.target.textContent === '') {
      e.target.textContent = currentSymbol;
    }
    switchPlayer();
  });
};

play();