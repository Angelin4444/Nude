# NUDE

## Personal Skin Discovery

NUDE is a responsive skincare discovery website that helps users understand their skin preferences and receive a personalized skincare routine.

### What the Website Does

1. **Home Page** – Introduces NUDE and guides users to start their skin discovery.
2. **Skin Questionnaire** – Users answer 4 simple questions about their skin type, skin goals, sun reaction, and preferred product texture.
3. **Personalized Results** – The website processes the answers and creates a personalized skin profile and morning/evening routine.
4. **Product Recommendations** – Skincare products are displayed dynamically using API data.
5. **Weather Information** – Current weather information is used to provide additional environmental context for the user's routine.

### Technologies Used

- HTML5
- CSS3
- JavaScript
- Local Storage
- REST APIs
- Responsive Web Design

### APIs Used

**DummyJSON API**  
Used to retrieve sample skincare product information, including product names, prices, ratings, descriptions and images.

API:
`https://dummyjson.com/products/category/skin-care`

DummyJSON is a free API designed for testing and prototyping.  
Source: https://dummyjson.com/docs/products

**Open-Meteo API**  
Used to retrieve current weather information such as temperature and humidity.

API:
`https://api.open-meteo.com/v1/forecast`

Open-Meteo does not require an API key or sign-up for its free non-commercial usage.

Source: https://open-meteo.com/

### How Personalization Works

The user's questionnaire answers are stored temporarily in the browser using **Local Storage**. JavaScript uses these answers to determine the user's skin profile and generate a suitable routine and recommendations.

### Project Structure

- `index.html` – Home page
- `quiz.html` – Skin questionnaire
- `results.html` – Personalized results
- `products.html` – Product catalogue
- `css/style.css` – Website styling and animations
- `js/main.js` – Main website functionality
- `js/quiz.js` – Questionnaire logic
- `js/results.js` – Results and API functionality
- `js/products.js` – Product API functionality

### Note

NUDE is a front-end academic project and prototype. The product information provided by DummyJSON is sample data and the skincare recommendations are for demonstration purposes only.
