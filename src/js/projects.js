import projects from './projects.json';

const projectsRef = document.querySelector('.js-projects');

projects.map(item => {
  const slide = document.createElement('div');
  slide.className = 'slider__item';
  slide.innerHTML = `
    <div class="slider__box">
                  <div class="slider-small">
                <div class="slider__item--small">
                    <div class="slider__box--small">
                        <img class="slider-small__img" src="${item.photoFirst}" alt="${item.title}" />
                    </div>
                </div>
                <div class="slider__item--small">
                    <div class="slider__box--small">
                        <img class="slider-small__img" src="${item.photoSecond}" alt="${item.title}" />
                    </div>
                </div>
                <div class="slider__item--small">
                    <div class="slider__box--small">
                        <img class="slider-small__img" src="${item.photoThird}" alt="${item.title}" />
                    </div>
                </div>
                <div class="slider__item--small">
                    <div class="slider__box--small">
                        <img class="slider-small__img" src="${item.photoFourth}" alt="${item.title}" />
                    </div>
                </div>
            </div>
      <h3 class="slider__title">${item.title}</h3>
      <p class="slider__description">${item.description}</p>
      <div class="slider__buttons">
        <a class="slider__btn" target="_blank" rel="noopener noreferrer nofollow" aria-label="Resume" href="${item.github}">
            <img src="${item.demoIcon}" alt="Icon" width="25" heiht="20" />
          <p class="slider__text">GitHub</p>
        </a>
        <a class="slider__btn" target="_blank" rel="noopener noreferrer nofollow" aria-label="Resume" href="${item.demo}">
            <img src="${item.githubIcon}" alt="Icon" width="25" heiht="20" />
          <p class="slider__text">Demo</p>
        </a>
      </div>
    </div>
  `;

  projectsRef.appendChild(slide);
});
