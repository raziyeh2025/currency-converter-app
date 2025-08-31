const inputAmount = document.getElementById("input-amount");
const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");
const btnConvert = document.getElementById("btn-convert");
const divResult = document.getElementById("div-result");

const apiURL = "https://api.exchangerate-api.com/v4/latest/usd";
let rates = {};
btnConvert.addEventListener("click", Convert);
fetchRates();
async function fetchRates() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    rates = data.rates;
    populateCurrencyOptions(Object.keys(rates));
  } catch (error) {
    divResult.textContent = "Error fetching Data";
    divResult.style.color = "red";
  }
}

function populateCurrencyOptions(currencies) {
  currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    selectFrom.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    selectTo.appendChild(option2);
  });
}
function Convert() {
  const amount = parseFloat(inputAmount.value);
  const from = selectFrom.value;
  const to = selectTo.value;
  divResult.style.color = "black";

  if (isNaN(amount) || amount < 0) {
    divResult.textContent = "Please enter a valid amount";
    divResult.style.color = "red";
    return;
  }

  const rateFrom = rates[from];
  const rateTo = rates[to];

  if (!rateFrom || !rateTo) {
    divResult.textContent = "Currency not supported";
    divResult.style.color = "red";
    return;
  }
  const resAmount = (amount / rateFrom) * rateTo;
  divResult.textContent = `${amount} ${from}=${resAmount.toFixed(2)} ${to}`;
}
