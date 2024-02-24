const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const backButton = document.getElementById('back');

const seeMoreButtons = document.querySelectorAll('.seeMore');
const carousal = document.querySelector('.carousal');
const lists = document.querySelector('.carousal .list');

nextButton.onclick = function () {
  showSlider('next');
};

prevButton.onclick = function () {
  showSlider('prev');
};

let timeout;
function showSlider(type) {
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';
  const items = document.querySelectorAll('.carousal .list .item');

  if (type === 'next') {
    lists.appendChild(items[0]);
    carousal.classList.remove('prev');
    carousal.classList.add('next');
  }

  if (type === 'prev') {
    lists.prepend(items[items.length - 1]);
    carousal.classList.remove('next');
    carousal.classList.add('prev');
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
}

seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousal.classList.add('showDetail');
  };
});

backButton.onclick = function () {
  carousal.classList.remove('showDetail');
};
