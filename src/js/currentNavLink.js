const menuItems = document.querySelectorAll('.header-nav__link');

function setActiveMenuItem(targetId) {
  menuItems.forEach(item => {
    if (item.getAttribute('href') === targetId) {
      item.classList.add('header-nav__link--current');
    } else {
      item.classList.remove('header-nav__link--current');
    }
  });
}

window.addEventListener('hashchange', () => {
  const targetId = location.hash;
  setActiveMenuItem(targetId);
});

window.addEventListener('load', () => {
  const initialTargetId = location.hash || '#home';
  setActiveMenuItem(initialTargetId);
});
