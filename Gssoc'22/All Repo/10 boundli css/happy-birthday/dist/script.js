$('h1').lettering();

const WIN_WIDTH = window.innerWidth;
const WIN_HEIGHT = window.innerHeight;

for (let i = 0; i < 50; i++) {
  let heart = createHeart();
  document.body.appendChild(heart);
}

function createHeart() {
  let heart = document.createElement('span');
  heart.classList.add('fa', 'fa-fw', 'fa-heart');
  heart.style.position = 'absolute';
  heart.style.display = 'block';
  heart.style.top = `${Math.random() * WIN_HEIGHT}px`;
  heart.style.left = `${Math.random() * WIN_WIDTH}px`;

  return heart;
}