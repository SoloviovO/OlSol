particlesJS('particles-js', {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: '#f55449',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#f55449',
      },
      polygon: {
        nb_sides: 10,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.8,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#8E7970',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: true,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: false,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 100,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
