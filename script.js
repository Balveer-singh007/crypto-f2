let marketList = [];

initializeData();

const gridElement = document.getElementById("gridView");
const tableElement = document.getElementById("tableBody");
const gridTabButton = document.getElementById("gridTabButton");
const listTabButton = document.getElementById("listTabButton");

async function initializeData() {
  let url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
  let response = await fetch(url);
  marketList = await response.json();
  // marketList = marketList.splice(0, 5);
  createGridElements();
  createListElements();
  changeTab("grid");
}

function changeTab(tab) {
  if (tab === "grid") {
    tableElement.style.display = "none";
    gridElement.style.display = "grid";
    gridTabButton.classList.add("active-button");
    listTabButton.classList.remove("active-button");
  }
  if (tab === "list") {
    tableElement.style.display = "grid";
    gridElement.style.display = "none";
    listTabButton.classList.add("active-button");
    gridTabButton.classList.remove("active-button");
  }
}

function createGridElements() {
  for (let i = 0; i < marketList.length; i++) {
    const percentageChange = marketList[i].price_change_percentage_24h;
    const percentageChangeClass =
      percentageChange >= 0 ? "positive-change" : "negative-change";

    const current = marketList[i].current_price;
    const currentClass = current >= 1 ? "positive-change" : "negative-change";

    let cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.innerHTML = `<div class="card-top">
      <img src="${
        marketList[i].image
      }" alt="Bitcoin" width="35px" height="35px" />
      <div class="card-title">
        <div class="top">${marketList[i].symbol.toUpperCase()}</div>
        <div class="bottom">${marketList[i].name}</div>
      </div>
      </div>
      <div class="percentage ${percentageChangeClass}">${
      marketList[i].price_change_percentage_24h
    }%</div>
      <div class="rate ${currentClass}">$${marketList[i].current_price}</div>
      <div class="volume">Total Volume: ${marketList[i].total_volume}</div>
      <div class="Market">Market cap: $${marketList[i].market_cap}</div>`;
    gridElement.appendChild(cardContainer);
  }
}

function createListElements() {
  marketList.forEach((item) => {
    const row = document.createElement("tr");
    const percentageChange = item.price_change_percentage_24h;
    const percentageChangeClass =
      percentageChange >= 0 ? "positive-change" : "negative-change";

    const current = item.current_price;
    const currentClass = current >= 1 ? "positive-change" : "negative-change";
    row.innerHTML = `
            <td id="data1"><img src="${item.image}" alt="${
      item.name
    }" width="40"/></td>
            <td>${item.symbol}</td>
            <td>${item.name}</td>
            <td class="${percentageChangeClass}">${
      item.price_change_percentage_24h + "%"
    }</td>
            <td class= "${currentClass}">${"$" + item.current_price}</td>
            <td>${item.total_volume}</td>
            <td>${"$" + item.market_cap}</td>
            `;
    tableElement.appendChild(row);
  });
}
