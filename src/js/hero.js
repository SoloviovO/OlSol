var canvas = document.querySelector('#scenen'),
  ctx = canvas.getContext('2d'),
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 0.6;

var colors = ['#034466', '#f55449', '#f55449', '#8e7970'];

var copy = document.querySelector('#copy');

var ww, wh;

var isAnimationInitialized = false;

var isTouching = false;

function Particle(x, y) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y,
  };
  if (ww < 768) {
    this.r = Math.random() * 0.6 + 0.5;
  } else {
    this.r = Math.random() * 1.5 + 1.5;
  }

  this.vx = (Math.random() - 0.5) * 100;
  this.vy = (Math.random() - 0.5) * 100;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.0005 + 0.955;

  this.color = colors[Math.floor(Math.random() * 4)];
}

Particle.prototype.render = function () {
  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 15;
    this.accY = (this.y - mouse.y) / 15;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

function onMouseMove(e) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}

function onTouchMove(e) {
  if (isTouching && e.touches.length > 0) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;

    e.preventDefault();
  }
}

function onTouchStart() {
  isTouching = true;
}

function onTouchEnd() {
  isTouching = false;
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  if (!isAnimationInitialized) {
    var rect = canvas.getBoundingClientRect();
    ww = canvas.width = rect.width;
    wh = canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ww < 738) {
      ctx.font = '400 ' + ww / 3 + 'px sans-serif';
    } else if (ww < 1250) {
      ctx.font = '400 ' + ww / 4 + 'px sans-serif';
    } else {
      ctx.font = '400 ' + ww / 5 + 'px sans-serif';
    }
    ctx.textAlign = 'center';
    ctx.fillText(copy.value, ww / 2, wh / 2);

    var data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'screen';

    particles = [];

    var particleDensity, particleSize;

    if (ww < 738) {
      particleDensity = 110;
      particleSize = 2;
    } else if (ww < 1250) {
      particleDensity = 200;
      particleSize = 1.5;
    } else {
      particleDensity = 200;
      particleSize = 1.5;
    }

    for (var i = 0; i < ww; i += Math.round(ww / particleDensity)) {
      for (var j = 0; j < wh; j += Math.round(ww / particleDensity)) {
        if (data[(i + j * ww) * 4 + 3] > 150) {
          particles.push(new Particle(i, j, particleSize));
        }
      }
    }
    amount = particles.length;
    isAnimationInitialized = true;
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}

copy.addEventListener('keyup', initScene);
window.addEventListener('resize', initScene);
window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchend', onTouchEnd);

window.addEventListener('mousemove', function (e) {
  if (!e.target.classList.contains('no-pointer-events')) {
    onMouseMove(e);
  }
});

window.addEventListener('touchmove', function (e) {
  if (!e.target.classList.contains('no-pointer-events')) {
    onTouchMove(e);
  }
});

initScene();
requestAnimationFrame(render);
