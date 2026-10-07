// ======================================
// NUDE — PRODUCT EXPLORER
// ======================================


const PRODUCT_API =
    "https://dummyjson.com/products/category/skin-care";


const productsGrid =
    document.getElementById("productsGrid");


const productCount =
    document.getElementById("productCount");


let allProducts = [];


// ======================================
// LOAD PRODUCTS
// ======================================

async function loadProducts() {

    try {

        const response =
            await fetch(PRODUCT_API);


        if (!response.ok) {

            throw new Error(
                "Unable to load products."
            );

        }


        const data =
            await response.json();


        allProducts =
            data.products || [];


        renderProducts(
            allProducts
        );


    } catch (error) {

        console.error(error);


        productsGrid.innerHTML = `
            <div class="product-loading">
                We couldn't load the product collection.
                Please refresh the page.
            </div>
        `;

        productCount.textContent =
            "Unable to load";

    }

}


// ======================================
// RENDER
// ======================================

function renderProducts(products) {

    productsGrid.innerHTML = "";


    productCount.textContent =
        `${products.length} products`;


    if (!products.length) {

        productsGrid.innerHTML = `
            <div class="product-loading">
                No products found.
            </div>
        `;

        return;

    }


    products.forEach(product => {

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


        productsGrid.appendChild(card);

    });

}


// ======================================
// FILTER
// ======================================

document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-button")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active-filter"
                        );

                    });


                button.classList.add(
                    "active-filter"
                );


                const filter =
                    button.dataset.filter;


                if (filter === "all") {

                    renderProducts(
                        allProducts
                    );

                } else {

                    renderProducts(
                        allProducts
                    );

                }

            }
        );

    });


// ======================================
// INIT
// ======================================

loadProducts();