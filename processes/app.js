const app = () => {
  const content = document.body.innerHTML;

  document.body.innerHTML = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line)
    // .map((line) => `<p>${line}<p>`)
    .join('\n');

    console.log(content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line).map((line) => `<p>${line}<p>`));
};

app();
