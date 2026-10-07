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


document.getElementById("whySkin").textContent =
    formatValue(storedAnswers.skinType);


document.getElementById("whyGoal").textContent =
    formatValue(storedAnswers.goal);


document.getElementById("whyTexture").textContent =
    formatValue(storedAnswers.texture);


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