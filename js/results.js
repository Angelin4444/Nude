// ======================================
// NUDE — RESULTS
// ======================================


const API_PRODUCTS =
    "https://dummyjson.com/products/category/skin-care";

const API_WEATHER =
    "https://api.open-meteo.com/v1/forecast";


const storedAnswers =
    JSON.parse(
        localStorage.getItem("nudeSkinProfile")
    ) || {

        skinType: "normal",
        goal: "hydration",
        sun: "sometimes",
        texture: "cream"

    };


// ======================================
// PROFILE LOGIC
// ======================================

const profileData = {

    dry: {
        title: "Comfort-first",
        type: "DRY SKIN",
        description:
            "Your profile leans toward comfort and moisture. A simple, consistent routine is the priority.",
        treatment:
            "Focus on hydration and comfortable layers without overwhelming your skin.",
        evening:
            "Use a richer moisturizing step to keep your routine comfortable."
    },


    oily: {
        title: "Light + balanced",
        type: "OILY SKIN",
        description:
            "Your profile leans toward lightweight textures and balance without unnecessary heaviness.",
        treatment:
            "Choose lightweight products and keep your routine simple.",
        evening:
            "Finish with a light moisturizer that feels comfortable overnight."
    },


    combination: {
        title: "Balanced focus",
        type: "COMBINATION SKIN",
        description:
            "Your profile sits between different needs, so balance and flexible textures are key.",
        treatment:
            "Use lightweight hydration while giving drier areas extra comfort.",
        evening:
            "Layer moisture where your skin needs it most."
    },


    normal: {
        title: "Naturally balanced",
        type: "BALANCED SKIN",
        description:
            "Your skin profile appears relatively balanced, giving you room to focus on your personal goal.",
        treatment:
            "Keep your routine simple and let your main concern guide the treatment step.",
        evening:
            "Maintain a comfortable moisturizing step at night."
    }

};


const profile =
    profileData[storedAnswers.skinType]
    || profileData.normal;


// ======================================
// WHY THIS MATCH — PERSONALIZED LOGIC
// ======================================

const whyMatchData = {

    // ==================================
    // QUESTION 1 — SKIN TYPE
    // ==================================

    skinType: {

        dry: {
            label: "Dry skin",
            text:
                "Your skin needs extra moisture, so a hydrating serum with hyaluronic acid followed by a richer moisturizer would be a good match."
        },

        oily: {
            label: "Oily skin",
            text:
                "Your skin is more comfortable with lightweight hydration, so a gel moisturizer and non-comedogenic products can help avoid a heavy feeling."
        },

        combination: {
            label: "Combination skin",
            text:
                "Your skin has different needs in different areas, so lightweight hydration works well while richer moisturizer can be used only where your skin feels dry."
        },

        sensitive: {
            label: "Sensitive skin",
            text:
                "Your skin can react easily, so a simple routine with gentle, fragrance-free products and soothing hydration is a better match."
        },

        normal: {
            label: "Balanced skin",
            text:
                "Your skin appears relatively balanced, so you can keep the routine simple and let your main skin goal guide the treatment step."
        }

    },


    // ==================================
    // QUESTION 2 — MAIN SKIN GOAL
    // ==================================

    goal: {

        hydration: {
            label: "Hydration",
            text:
                "Your main goal is hydration, so look for humectants such as hyaluronic acid followed by a moisturizer to help keep your skin comfortable and hydrated."
        },

        clarity: {
            label: "Clearer skin",
            text:
                "Your focus is clarity, so lightweight, non-comedogenic products and gentle pore-focused ingredients can help keep the routine balanced."
        },

        soothing: {
            label: "Calm + barrier relief",
            text:
                "Your priority is calming the skin, so gentle cleansing, soothing hydration and a barrier-supporting moisturizer are a better fit."
        },

        radiance: {
            label: "Radiance",
            text:
                "Your goal is a brighter, more even-looking complexion, so consistent hydration and daily sun protection should form the base of your routine."
        }

    },


    // ==================================
    // QUESTION 3 — SUN REACTION
    // ==================================

    sun: {

        burnsFast: {
            label: "Burns easily",
            text:
                "Because your skin burns easily in the sun, daily broad-spectrum SPF 30+ is especially important. A gentle sunscreen made for sensitive skin can also be a comfortable choice."
        },

        tansSlowly: {
            label: "Sometimes burns, then tans",
            text:
                "Your skin can still react to strong sun exposure, so daily broad-spectrum SPF and consistent protection are a good match for your routine."
        },

        tansEasily: {
            label: "Tans easily",
            text:
                "Even if your skin rarely burns, daily UV protection still matters, so a lightweight broad-spectrum sunscreen should remain part of your routine."
        },

        getsOily: {
            label: "Sunscreen feels oily",
            text:
                "Since sunscreen can make your skin feel oily, a lightweight, non-comedogenic or gel-style sunscreen can give you protection without feeling too heavy."
        },

        sometimes: {
            label: "Moderate sun reaction",
            text:
                "Your skin can handle some sun but still benefits from consistent daily UV protection, so a comfortable broad-spectrum sunscreen is a good fit."
        }

    },


    // ==================================
    // QUESTION 4 — TEXTURE
    // ==================================

    texture: {

        cream: {
            label: "Rich cream",
            text:
                "You prefer a richer cream texture, so a nourishing moisturizer can give your routine the comfortable, cushioned finish you enjoy."
        },

        gel: {
            label: "Cooling gel",
            text:
                "You prefer lightweight gel textures, so gel-based hydration can give you moisture without leaving a heavy or greasy finish."
        },

        fluid: {
            label: "Silky fluid",
            text:
                "You prefer a silky fluid, so lightweight milky lotions and fluid serums would fit naturally into your routine."
        },

        balm: {
            label: "Barrier balm",
            text:
                "You prefer a balm-like texture, so a richer barrier-supporting moisturizer can give your skin a more sealed and comforting finish."
        }

    }

};


// ======================================
// GET PERSONALIZED WHY-MATCH TEXT
// ======================================

function getWhyMatchData(category, value) {

    if (
        whyMatchData[category] &&
        whyMatchData[category][value]
    ) {

        return whyMatchData[category][value];

    }

    return {
        label: formatValue(value),
        text: "This choice has been included in your personalized routine."
    };

}


// ======================================
// UPDATE PROFILE UI
// ======================================

document.getElementById("profileTitle").innerHTML =
    `${profile.title.split(" ")[0]}<br><em>${profile.title.split(" ").slice(1).join(" ")}.</em>`;


document.getElementById("profileDescription").textContent =
    profile.description;


document.getElementById("profileType").textContent =
    profile.type;


document.getElementById("treatmentText").textContent =
    profile.treatment;


document.getElementById("eveningText").textContent =
    profile.evening;


// ======================================
// WHY THIS MATCH — UPDATE EXISTING CARDS
// ======================================

const skinMatch =
    getWhyMatchData(
        "skinType",
        storedAnswers.skinType
    );

const goalMatch =
    getWhyMatchData(
        "goal",
        storedAnswers.goal
    );

const sunMatch =
    getWhyMatchData(
        "sun",
        storedAnswers.sun ||
        storedAnswers.sunReaction
    );

const textureMatch =
    getWhyMatchData(
        "texture",
        storedAnswers.texture
    );


// Existing skin answer area
const whySkin =
    document.getElementById("whySkin");

if (whySkin) {

    whySkin.textContent =
        skinMatch.text;

}


// Existing goal answer area
const whyGoal =
    document.getElementById("whyGoal");

if (whyGoal) {

    whyGoal.textContent =
        goalMatch.text;

}


// Existing texture answer area
const whyTexture =
    document.getElementById("whyTexture");

if (whyTexture) {

    whyTexture.textContent =
        textureMatch.text;

}


// ======================================
// ADD SUN MATCH WITHOUT BREAKING EXISTING UI
// ======================================

function addSunMatchCard() {

    // If you already add a sun element later,
    // this will use it automatically.
    const existingSun =
        document.getElementById("whySun");

    if (existingSun) {

        existingSun.textContent =
            sunMatch.text;

        return;

    }


    /*
       If there is no sun card in the current HTML,
       create one underneath the existing
       "Why this match" content.
    */

    const textureElement =
        document.getElementById("whyTexture");

    if (!textureElement) return;


    const parent =
        textureElement.parentElement;

    if (!parent) return;


    const sunCard =
        document.createElement("div");

    sunCard.className =
        "why-match-item";


    sunCard.innerHTML = `

        <span class="why-match-label">
            SUN REACTION
        </span>

        <p class="why-match-text">
            ${sunMatch.text}
        </p>

    `;


    parent.parentElement
        .appendChild(sunCard);

}


addSunMatchCard();


// ======================================
// FORMAT VALUES
// ======================================

function formatValue(value) {

    if (!value) return "Not specified";

    const words =
        value.split(" ");

    return words
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

}


// ======================================
// WEATHER API
// ======================================

async function loadWeather() {

    const weatherText =
        document.getElementById("weatherText");

    const temperature =
        document.getElementById("temperature");

    const humidity =
        document.getElementById("humidity");


    try {

        let latitude = 25.3463;
        let longitude = 55.4209;


        // Try browser location first
        if (navigator.geolocation) {

            try {

                const position =
                    await new Promise((resolve, reject) => {

                        navigator.geolocation.getCurrentPosition(
                            resolve,
                            reject,
                            {
                                timeout: 2500
                            }
                        );

                    });


                latitude =
                    position.coords.latitude;

                longitude =
                    position.coords.longitude;

            } catch (error) {

                console.log(
                    "Using fallback location."
                );

            }

        }


        const url =
            `${API_WEATHER}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&temperature_unit=celsius`;


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error("Weather request failed.");
        }


        const data =
            await response.json();


        const temp =
            Math.round(
                data.current.temperature_2m
            );


        const humid =
            Math.round(
                data.current.relative_humidity_2m
            );


        temperature.textContent =
            `${temp}°`;


        humidity.textContent =
            `${humid}%`;


        weatherText.textContent =
            humid >= 70
                ? "Warm + humid today."
                : humid <= 40
                    ? "Dry conditions today."
                    : "A fairly balanced day.";


    } catch (error) {

        console.error(error);

        temperature.textContent =
            "--";

        humidity.textContent =
            "--";

        weatherText.textContent =
            "Environment data unavailable.";

    }

}


// ======================================
// PRODUCT API
// ======================================

async function loadRecommendations() {

    const container =
        document.getElementById(
            "recommendedProducts"
        );


    try {

        const response =
            await fetch(
                API_PRODUCTS
            );


        if (!response.ok) {
            throw new Error(
                "Product request failed."
            );
        }


        const data =
            await response.json();


        const products =
            data.products.slice(0, 3);


        container.innerHTML =
            "";


        products.forEach(product => {

            container.appendChild(
                createProductCard(product)
            );

        });


    } catch (error) {

        console.error(error);


        container.innerHTML = `
            <div class="product-loading">
                Product recommendations are
                temporarily unavailable.
            </div>
        `;

    }

}


// ======================================
// PRODUCT CARD
// ======================================

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";


    card.innerHTML = `

        <img
            class="product-image"
            src="${product.thumbnail}"
            alt="${product.title}"
            loading="lazy"
        >

        <div class="product-info">

            <span class="product-brand">
                ${product.brand || "SKINCARE"}
            </span>

            <h3 class="product-name">
                ${product.title}
            </h3>

            <div class="product-bottom">

                <span class="product-price">
                    $${product.price}
                </span>

                <span class="product-rating">
                    ★ ${product.rating}
                </span>

            </div>

        </div>

    `;


    return card;

}


// ======================================
// INIT
// ======================================

loadWeather();

loadRecommendations();