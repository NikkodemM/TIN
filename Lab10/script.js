const lastPrices = {};
const newsHistory = [];
const tbody = document.querySelector("#stocks tbody");
const newsRotator = document.getElementById("news-rotator");

const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Tryb dzienny"
    : "🌙 Tryb nocny";
});

async function fetchData() {
  const res = await fetch(
    "https://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php"
  );
  const data = await res.json();
  updateTable(data.stock);
  updateNews(data.news);
}

function updateTable(stocks) {
  tbody.innerHTML = "";

  Object.entries(stocks).forEach(([name, price]) => {
    const tr = document.createElement("tr");
    const change =
      lastPrices[name] !== undefined ? price - lastPrices[name] : null;

    tr.innerHTML = `
            <td>${name}</td>
            <td>${price.toFixed(2)}</td>
            <td class="${change > 0 ? "up" : change < 0 ? "down" : ""}">
                ${
                  change == null
                    ? "-"
                    : change > 0
                    ? "↑"
                    : change < 0
                    ? "↓"
                    : "-"
                }
            </td>
        `;

    lastPrices[name] = price;
    tbody.appendChild(tr);
  });
}

function updateNews(news) {
  if (newsHistory[0] !== news) {
    newsHistory.unshift(news);
    if (newsHistory.length > 3) newsHistory.pop();
    renderNews();
  }
}

function renderNews() {
  newsRotator.innerHTML = newsHistory
    .map((text) => `<li>${text}</li>`)
    .join("");
}

// Start
fetchData();
setInterval(fetchData, 5000);
