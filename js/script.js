const root = document.documentElement;

window.addEventListener("pointermove", (e) => {
  root.style.setProperty("--mx", e.clientX + "px");
  root.style.setProperty("--my", e.clientY + "px");
});

const targets = document.querySelectorAll(".band > .wrap, .band > .flush-split");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  targets.forEach((t) => {
    t.classList.add("reveal");
    observer.observe(t);
  });
}

const headings = document.querySelectorAll(".band h2");

if ("IntersectionObserver" in window) {
  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("drawn");
          lineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 1, rootMargin: "0px 0px -15% 0px" }
  );

  headings.forEach((h) => {
    h.classList.add("line");
    lineObserver.observe(h);
  });
}

/*hero anim*/

const words = [
  "Robotics",
  "Computer Vision",
  "Embedded Systems",
  "Board Gaming",
  "3D Printing",
  "Science Fiction"
];

const typed = document.getElementById("typed");

if (typed) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typed.textContent = words[0];
  } else {
    let w = 0;
    let c = 0;
    let deleting = false;

    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);

      let delay = deleting ? 40 : 90;
      if (!deleting && c === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && c === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 400;
      }
      setTimeout(tick, delay);
    };

    tick();
  }
}