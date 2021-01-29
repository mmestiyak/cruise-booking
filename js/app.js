const bookingForm = document.getElementById("booking-form");
const inputs = document.querySelectorAll('input[number]');
inputs.forEach(input => {
  input.addEventListener('input')
})
function compute() {
  const subTotalElement = document.getElementById("sub-total");
  const taxElement = document.getElementById("tax");
  const taxPercentage = parseFloat(taxElement.dataset.tax);
  const totalElement = document.getElementById("total");
  let subTotal = 0;
  const prices = document.querySelectorAll("[data-total-price]");
  prices.forEach((price) => {
    subTotal += parseInt(price.dataset.totalPrice);
  });
  subTotalElement.innerText = subTotal;
  taxElement.innerText = subTotal * taxPercentage;
  totalElement.innerText = subTotal + Number(taxElement.innerText);
}
function updateInput(element) {
  const input = element
    .closest(".input-group")
    .querySelector('input[type="number"');
  let inputValue = parseInt(input.value);
  if (element.dataset.operation === "plus") {
    inputValue += 1;
    input.dataset.totalPrice = inputValue * parseInt(input.dataset.price);
  }
  if (element.dataset.operation === "minus") {
    if (inputValue > 0) {
      inputValue -= 1;
      input.dataset.totalPrice = inputValue * parseInt(input.dataset.price);
    }
  }
  input.value = inputValue;
}
function bookingFormClickHandler(event) {
  event.preventDefault();
  const clickedElement = event.target;
  const plusButton = clickedElement.dataset.operation === "plus";
  const minusButton = clickedElement.dataset.operation === "minus";
  if (plusButton || minusButton) {
    updateInput(clickedElement);
    compute();
  }
}
bookingForm.addEventListener("click", bookingFormClickHandler);


