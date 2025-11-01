// ======== Sample User Data ========
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    address: "123 Market St, New York",
    email: "alice@example.com",
    portfolio: [
      { symbol: "AAPL", shares: 15, sector: "Technology" },
      { symbol: "TSLA", shares: 10, sector: "Automotive" }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    address: "456 Main St, Chicago",
    email: "bob@example.com",
    portfolio: [
      { symbol: "AMZN", shares: 5, sector: "E-commerce" },
      { symbol: "GOOGL", shares: 8, sector: "Technology" }
    ]
  }
];

// ======== DOM Elements ========
const userList = document.querySelector(".user-list");
const nameInput = document.querySelectorAll("input")[0];
const addressInput = document.querySelectorAll("input")[1];
const emailInput = document.querySelectorAll("input")[2];
const saveButton = document.querySelector("button:nth-of-type(1)");
const deleteButton = document.querySelector("button:nth-of-type(2)");
const portfolioTable = document.querySelector(".portfolio-table tbody");
const detailsSection = document.querySelector(".details-section");

let selectedUser = null;

// ======== Functions ========

// Display user list
function renderUserList() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.addEventListener("click", () => selectUser(user));
    userList.appendChild(li);
  });
}

// Select a user
function selectUser(user) {
  selectedUser = user;
  nameInput.value = user.name;
  addressInput.value = user.address;
  emailInput.value = user.email;
  renderPortfolio(user.portfolio);
  detailsSection.innerHTML = "<h3>Stock Details</h3>";
}

// Display user's portfolio
function renderPortfolio(portfolio) {
  portfolioTable.innerHTML = "";
  portfolio.forEach((stock) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.symbol}</td>
      <td>${stock.shares}</td>
      <td><button class="view-details">View</button></td>
    `;
    row.querySelector(".view-details").addEventListener("click", () => showStockDetails(stock));
    portfolioTable.appendChild(row);
  });
}

// Show stock details
function showStockDetails(stock) {
  detailsSection.innerHTML = `
    <h3>Stock Details</h3>
    <p><strong>Symbol:</strong> ${stock.symbol}</p>
    <p><strong>Sector:</strong> ${stock.sector}</p>
    <p><strong>Shares:</strong> ${stock.shares}</p>
  `;
}

// Save updates
saveButton.addEventListener("click", () => {
  if (!selectedUser) return;
  selectedUser.name = nameInput.value;
  selectedUser.address = addressInput.value;
  selectedUser.email = emailInput.value;
  renderUserList();
  alert("User details updated!");
});

// Delete user
deleteButton.addEventListener("click", () => {
  if (!selectedUser) return;
  const index = users.indexOf(selectedUser);
  users.splice(index, 1);
  selectedUser = null;
  nameInput.value = "";
  addressInput.value = "";
  emailInput.value = "";
  portfolioTable.innerHTML = "";
  detailsSection.innerHTML = "<h3>Stock Details</h3>";
  renderUserList();
  alert("User deleted!");
});

// Initialize
renderUserList();
