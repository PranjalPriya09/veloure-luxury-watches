// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// // Create the timeline
// const tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".scroll-container",
//         start: "top top",
//         end: "+=100%", // Scroll distance (100% of viewport height)
//         scrub: 1,      // Smoothly follows the scroll
//         pin: true,     // Pins the container in place
//         anticipatePin: 1
//     }
// });

// // Animate the second slide moving up
// tl.to(".second", {
//     y: "0%",
//     ease: "none"
// });

// // Optional: Make the first slide fade or scale as the second one comes up
// tl.to(".first .content", {
//     opacity: 0,
//     scale: 0.8,
//     ease: "none"
// }, 0); // The '0' ensures both animations happen at the same time
function toggleMenu() {
  var x = document.getElementById("nav-item");
  if (x.className === "nav-item") {
    x.className += " active";
  } else {
    x.className = "nav-item";
  }
}
// content 
const texts = document.querySelectorAll('h1,h2,p,.hero-line,.discover-btn');

// Loop through and add the AOS attributes dynamically
texts.forEach(el => {
  el.setAttribute('data-aos', 'zoom-out-up');
  el.setAttribute('data-aos-duration', '3000');
  el.setAttribute('data-aos-once', 'true');
  
});
const texts1 = document.querySelectorAll('h1');

// Loop through and add the AOS attributes dynamically
texts1.forEach(h1 => {
  h1.setAttribute('data-aos', 'zoom-out-up');
  h1.setAttribute('data-aos-duration', '3000');
});
// cards
const cards = document.querySelectorAll('.card');

// Loop through and add the AOS attributes dynamically
cards.forEach(card => {
  card.setAttribute('data-aos', 'zoom-out-up');
  card.setAttribute('data-aos-duration', '1000');
});

