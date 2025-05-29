const url = "https://fakestoreapi.com/products";
const searchInput = document.querySelector(".search-bar-input");

let productsData = [];

const ApiFunc = async () => {
  const res = await fetch(url);
  const data = await res.json();
  productsData = data;

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  data.forEach((product) => {
    const cardMain = document.createElement("div");
    cardMain.className = "card-main";

    cardMain.innerHTML = `
    <img src=${product.image} width="150" height = "auto" />
    <h2 class="card-title">${
      product.title.length > 12
        ? product.title.slice(0, 20) + "..."
        : product.title
    }</h2>
    <p class="card-description">${product.description.substring(0, 100)}...</p>
    <span>Price: ${product.price}</span>
  `;

    cardContainer.appendChild(cardMain);
  });

  document.body.appendChild(cardContainer);
};

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log("value", value);
  const filtered = productsData.filter((product) =>
    product.title.toLowerCase().includes(value)
  );

  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  if (filtered.length === 0) {
    cardContainer.innerHTML = `<p class="no-result">This information is not available</p>`;
  }
  filtered.forEach((product) => {
    const cardMain = document.createElement("div");
    cardMain.className = "card-main";

    cardMain.innerHTML = `
    <img src="${product.image}" width="150" height="auto" />

    <h2 class="card-title">${
      product.title.length > 12
        ? product.title.slice(0, 20) + "..."
        : product.title
    }</h2>
    <p class="card-description">${product.description.substring(0, 100)}...</p>
     <span>Price: ${product.price}</span>
    `;
    cardContainer.appendChild(cardMain);
  });
});

ApiFunc();
