var Line = function(x, y){
	this.x0 = this.x = x;
	this.y0 = this.y = y;
	this.update = function() {
		var dx = mouse.x - this.x0,
				dy = mouse.y - this.y0;
		var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		var angle = Math.atan2(dx, dy);
		var near = (dist / maxDist).toFixed(2);
		this.radio = near * maxRadio;
		this.x = (Math.sin(angle) * this.radio) + this.x0;
		this.y = (Math.cos(angle) * this.radio) + this.y0;
		this.alpha = 1 - (near*0.5);
		this.lineWidth = this.alpha * 5;
		this.color = "rgba(25, 179, 0, "+this.alpha+")";
	}
	this.draw = function(){
		this.update();
		context.beginPath();
		context.moveTo(this.x0, this.y0);
		context.lineTo(this.x, this.y);
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.color;
		context.stroke();
	}
	return this;
}

var canvas, context;
var mouse = { x: 0, y: 0 };
var cursor = {
	x: window.innerWidth,
	y: window.innerHeight
};
var lines = [];
var separation = 50;
var maxDist = 50, maxRadio = separation/2, minRadio = 1;

function init(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	onResizeWindow();
	document.addEventListener("mousemove", onPointerMove, false);
	document.addEventListener("touchmove", onPointerMove, false);
	window.addEventListener("resize", onResizeWindow, false);
}

function onResizeWindow() {
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
	canvas.width = window.innerWidth * window.devicePixelRatio;
	canvas.height = window.innerHeight * window.devicePixelRatio;
	maxDist = canvas.width > canvas.height ? canvas.width : canvas.height;
	maxDist = 300;
	setLines();
}

function onPointerMove(event) {
	event.preventDefault();
	var point = event.touches ? event.touches[0] : event;
	cursor = {
		x: point.clientX,
		y: point.clientY
	}
}

function setLines(){
	lines = [];
	for (var x = 0; x <= canvas.width; x+= separation) {
		for (var y = 0; y <= canvas.height; y+= separation) {
			lines.push(new Line(x, y));
		}
	}
}

function render(){
	mouse.x += (cursor.x - mouse.x) / 10;
	mouse.y += (cursor.y - mouse.y) / 10;
	context.clearRect(0,0, canvas.width, canvas.height);
	context.lineCap = "round";
	context.strokeStyle = "white";
	for (var i = 0; i < lines.length; i++) lines[i].draw();
}

function animate(){
	requestAnimationFrame(animate);
	render();
}

init();
animate();
// ===========================================================================
// ===========================================================================

// Fix Nav
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix-nav");
  } else {
    navBar.classList.remove("fix-nav");
  }
});

// Scroll To
const links = [...document.querySelectorAll(".scroll-link")];
links.map((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    const fixNav = navBar.classList.contains("fix-nav");
    let position = el.offsetTop - navHeight;

    window.scrollTo({
      top: position,
      left: 0,
    });

    navBar.classList.remove("show");
    menu.classList.remove("show");
    document.body.classList.remove("show");
  });
});

// Toggle Menu
const menu = document.querySelector(".menu");
const navOpen = document.querySelector(".hamburger");
const navClose = document.querySelector(".close");

const navLeft = menu.getBoundingClientRect().left;
navOpen.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.add("show");
    document.body.classList.add("show");
    navBar.classList.add("show");
  }
});

navClose.addEventListener("click", () => {
  if (navLeft < 0) {
    menu.classList.remove("show");
    document.body.classList.remove("show");
    navBar.classList.remove("show");
  }
});

// Colors

const widget = document.querySelector(".widget");
const control = document.querySelector(".control");

widget.addEventListener("click", () => {
  control.classList.toggle("open");
});

const colors = [...document.querySelectorAll(".colors span")];
document.querySelector(":root").style.setProperty("--customColor", "#0044ff");

colors.forEach((color) => {
  color.addEventListener("click", () => {
    const currentColor = color.dataset.id;
    document
      .querySelector(":root")
      .style.setProperty("--customColor", currentColor);
  });
});

window.addEventListener("scroll", () => {
  control.classList.remove("open");
});

// Glidejs

const glide = document.querySelector(".glide");

if (glide)
  new Glide(glide, {
    type: "carousel",
    startAt: 0,
    perView: 3,
    gap: 30,
    hoverpause: true,
    autoplay: 2000,
    animationDuration: 800,
    animationTimingFunc: "linear",
    breakpoints: {
      996: {
        perView: 2,
      },
      768: {
        perView: 1,
      },
    },
  }).mount();

AOS.init();

new TypeIt("#type1", {
  speed: 120,
  loop: true,
  waitUntilVisible: true,
})
  .type("𝔻𝕖𝕧𝕖𝕝𝕠𝕡𝕖𝕣", { delay: 400 })
  .pause(500)
  .delete(9)
  .type("𝔽𝕣𝕠𝕟𝕥 𝔼𝕟𝕕", { delay: 400 })
  .pause(500)
  .delete(9)
  .go();

new TypeIt("#type2", {
  speed: 120,
  loop: true,
  waitUntilVisible: true,
})
  .type("𝔻𝕖𝕧𝕖𝕝𝕠𝕡𝕖𝕣", { delay: 400 })
  .pause(500)
  .delete(9)
  .type("𝔽𝕣𝕠𝕟𝕥 𝔼𝕟𝕕", { delay: 400 })
  .pause(500)
  .delete(9)
  .go();

gsap.from(".logo", { opacity: 0, duration: 1, delay: 0.5, y: -10 });
gsap.from(".hamburger", { opacity: 0, duration: 1, delay: 0.8, x: 20 });
gsap.from(".banner", { opacity: 0, duration: 1, delay: 1.1, x: -200 });
gsap.from(".hero h3", { opacity: 0, duration: 1, delay: 1.4, y: -50 });
gsap.from(".hero h1", { opacity: 0, duration: 1, delay: 1.7, y: -45 });
gsap.from(".hero h4", { opacity: 0, duration: 1, delay: 2.1, y: -30 });
gsap.from(".hero a", { opacity: 0, duration: 1, delay: 2.4, y: -10 });

gsap.from(".nav-item", {
  opacity: 0,
  duration: 1,
  delay: 1,
  y: 30,
  stagger: 0.2,
});

gsap.from(".icons span", {
  opacity: 0,
  duration: 1,
  delay: 2.5,
  x: -30,
  stagger: 0.2,
});
