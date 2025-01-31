const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // Example API

// Fetch currency data
async function fetchCurrencyData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}

// Convert currency
async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (amountValue === '' || isNaN(amountValue)) {
        result.textContent = 'Please enter a valid amount';
        return;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.rates[to] / data.rates[from];
    const convertedAmount = (amountValue * rate).toFixed(2);

    result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
}
function printpage() {
  window.print();
}

// Event listeners
convertBtn.addEventListener("click", convertCurrency);
window.onload = fetchCurrencyData;
