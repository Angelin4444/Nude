// ===============================
// NUDE — MAIN INTERACTIONS
// ===============================


// Cursor glow
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

}


// Subtle hero parallax
const heroArt = document.querySelector(".hero-art");

if (heroArt) {

    document.addEventListener("mousemove", (event) => {

        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;

        heroArt.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}