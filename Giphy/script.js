const API_URL = {
  api_key: "api_key=dyA7h471cQEV0O74h7fpGTWJQXoT1ATB",
  trending:
    "https://api.giphy.com/v1/gifs/trending?api_key=dyA7h471cQEV0O74h7fpGTWJQXoT1ATB",
  search:
    "https://api.giphy.com/v1/gifs/search?api_key=dyA7h471cQEV0O74h7fpGTWJQXoT1ATB",
  categories:
    "https://api.giphy.com/v1/gifs/categories?api_key=dyA7h471cQEV0O74h7fpGTWJQXoT1ATB",
  subcategories: "https://api.giphy.com/v1/gifs/categories/",
  getByID: "https://api.giphy.com/v1/gifs/",
};

// Basic fetch to return json
const fetchData = (url) => {
  try {
    let data = fetch(url).then((data) => data.json());
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Handling Clicks and Submit
const handleNavClick = (selectedItem) => {
  createResultPage(selectedItem.innerText);
};

const handleQuerySubmit = () => {
  let query = document.querySelector(".query").value;
  createResultPage(query);
};

const handleCategoriesClick = (selectedItem) => {
  let selectedItemText;
  if (selectedItem.children.length === 0) {
    selectedItemText = selectedItem.innerText;
  } else {
    selectedItemText = selectedItem.children[0].alt;
  }
  createSubCategories(selectedItemText);
};

const handleSubCategoryClick = (selectedItem) => {
  let selectedItemText = selectedItem.children[0].alt;
  createResultPage(selectedItemText);
};

// Creating Components
const createTrendingRow = async () => {
  try {
    let data = await fetchData(API_URL.trending + "&limit=25");
    let trendingRow = document.querySelector(".trending-row");
    console.log(data);
    let trendingRowItems = "";
    for (let item of data.data) {
      trendingRowItems += `<img class="trending-row-gif" src="${
        item.images.fixed_height_downsampled.url || item.images.fixed_height.url
      }" alt="${item.id}" data-toggle="modal"
      data-target="#gifModal" onclick="createModal(this)" />`;
    }
    trendingRow.innerHTML = trendingRowItems;
  } catch (err) {
    console.log(err);
  }
};

const createCategories = async () => {
  try {
    let data = await fetchData(API_URL.categories);
    let categoriesTab = document.querySelector(".categories-tab");
    let categoriesRow = document.querySelector(".categories-row");
    console.log(data);
    let categoriesTabItems = `<a class="heading nav-link" href="">CATEGORIES</a>`;
    let categoriesRowItems = `<h3 class="heading col-12">Categories</h3>`;
    for (let item of data.data) {
      categoriesRowItems += `<div class="col-6 col-md-4 categories-row-item"><div class="card bg-dark text-white" onclick="handleCategoriesClick(this)">
      <img src="${
        item.gif.images.fixed_height_downsampled.url ||
        item.gif.images.fixed_height.url
      }" class="card-img categories-img" alt="${item.name}">
      <div class="card-img-overlay">
        <h5 class="card-title heading">${item.name.toUpperCase()}</h5>
      </div>
    </div></div>`;
      categoriesTabItems += `<a class="nav-link" href="#" onclick="handleCategoriesClick(this)">${item.name}</a>`;
    }
    categoriesTab.innerHTML = categoriesTabItems;
    categoriesRow.innerHTML = categoriesRowItems;
  } catch (err) {
    console.log(err);
  }
};

const createSubCategories = async (selectedCategory) => {
  try {
    let selectedCategoryEncoded = selectedCategory
      .replace(/\s+/g, "")
      .replace("&", "-");

    console.log(selectedCategoryEncoded);
    let url =
      API_URL.subcategories +
      selectedCategoryEncoded +
      "?api_key=dyA7h471cQEV0O74h7fpGTWJQXoT1ATB";
    let data = await fetchData(url);
    console.log(data);
    let categoriesRow = document.querySelector(".categories-row");
    let categoriesRowItem = `<h3 class="heading col-12"><a href="" class="heading goback"><i class="fas fa-long-arrow-alt-left"></i> </a> ${selectedCategory}</h3>`;
    for (let item of data.data) {
      categoriesRowItem += `<div class="col-6 col-md-4 categories-row-item" ><div class="card bg-dark text-white" onclick="handleSubCategoryClick(this)">
        <img src="${
          item.gif.images.fixed_height_downsampled.url ||
          item.gif.images.fixed_height.url
        }" class="card-img categories-img" alt="${item.name}">
        <div class="card-img-overlay">
          <h5 class="card-title heading">${item.name.toUpperCase()}</h5>
        </div>
      </div></div>`;
      categoriesRow.innerHTML = categoriesRowItem;
    }
  } catch (err) {
    console.log(err);
  }
};

const createResultPage = async (query) => {
  let data;
  if (query === "Trending") {
    data = await fetchData(API_URL.trending + "&limit=50");
  } else {
    data = await fetchData(`${API_URL.search}&q=${query}&limit=50`);
  }
  console.log(data);
  let topWrapper = document.querySelector(".top-wrapper");
  let topWrapperItems = `<h1 class="heading">${query.toLowerCase()}</h1><div class="card-columns">`;
  for (let item of data.data) {
    topWrapperItems += `<div class="card result-card"><img class="card-img" src="${
      item.images.fixed_height_downsampled.url || item.images.fixed_height.url
    }" alt="${item.id}" data-toggle="modal"
    data-target="#gifModal" onclick="createModal(this)" /></div>`;
  }
  topWrapperItems += "</div>";
  topWrapper.innerHTML = topWrapperItems;
  console.log(data);
};

const createModal = async (selectedGIF) => {
  console.log(selectedGIF);
  let data = await fetchData(
    API_URL.getByID + selectedGIF.alt + "?" + API_URL.api_key
  );
  let modalBody = document.querySelector(".modal-body");
  let modalBodyItem = `<div ><img class="modal-gif" src="${data.data.images.original.url}" alt="${data.data.title}"</div><div class="modal-gif-title"><h3 class="heading">${data.data.title}</h3></div><div><a class="nav-link" href="${data.data.images.original.url}" download><i class="fas fa-download"></i> Download</a><a class="nav-link" href="${data.data.embed_url}"><i class="fas fa-link"></i> Embed</a></div>`;
  modalBody.innerHTML = modalBodyItem;
  console.log(data);
};

const createHomePage = () => {
  createTrendingRow();
  createCategories();
};

createHomePage();

document.querySelector(".query").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleQuerySubmit();
  }
});

