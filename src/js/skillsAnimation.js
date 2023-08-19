const boxFirst = document.querySelectorAll('.skills-boxes');
const boxSecond = document.querySelectorAll('.skills-boxeses');

window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 4.2) * 4;

  boxFirst.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });

  const triggerBottomSecond = (window.innerHeight / 3.5) * 4;

  boxSecond.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottomSecond) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
