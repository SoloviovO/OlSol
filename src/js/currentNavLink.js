const anchorLinks = document.querySelectorAll(
  '.header-nav__link, .mobile-menu__link'
);

function setActiveMenuItem(targetId) {
  anchorLinks.forEach(item => {
    if (item.getAttribute('href') === targetId) {
      item.classList.add('header-nav__link--current');
      item.classList.add('mobile-menu__link--current');
    } else {
      item.classList.remove('header-nav__link--current');
      item.classList.remove('mobile-menu__link--current');
    }
  });
}

function handleHashChange() {
  const targetId = location.hash;
  setActiveMenuItem(targetId);
}

anchorLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();

      window.scrollTo({
        top: targetId === '#home' ? 0 : targetElement.offsetTop,
        behavior: 'smooth',
      });

      if (targetId) {
        history.pushState({}, '', targetId);
        handleHashChange();
      }
    }
  });
});

window.addEventListener('hashchange', handleHashChange);

window.addEventListener('load', () => {
  const initialTargetId = location.hash || '#home';
  setActiveMenuItem(initialTargetId);
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  anchorLinks.forEach(link => {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const sectionHeight = targetElement.clientHeight;
      const offsetTop = targetId === '#home' ? 0 : targetElement.offsetTop;

      const sectionVisibility =
        offsetTop >= scrollPosition - sectionHeight / 2 &&
        offsetTop <= scrollPosition + windowHeight - sectionHeight / 2;

      if (sectionVisibility) {
        setActiveMenuItem(targetId);
      }
    }
  });
});
