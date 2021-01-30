const bookingForm = document.getElementById("booking-form");

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
  const clickedElement = event.target;
  const plusButton = clickedElement.dataset.operation === "plus";
  const minusButton = clickedElement.dataset.operation === "minus";
  if (plusButton || minusButton) {
    updateInput(clickedElement);
    compute();
  }
  if (event.target === document.getElementById("btn-submit")) {
    showModal();
  }
}
bookingForm.addEventListener("click", bookingFormClickHandler);

/* MODAL section */
const modalOuter = document.querySelector(".modal-outer");
const modalInner = modalOuter.querySelector(".modal-inner");
function showModal() {
  const firstClassTicket = Number(
    document.querySelector('[data-price="150"]').value
  );
  const economoyTicket = Number(
    document.querySelector('[data-price="100"]').value
  );
  let modalInnerHtml;

  if (firstClassTicket > 0) {
    modalInnerHtml = `<h3>You Booked ${firstClassTicket} First Class Ticket</h3>`;
  }
  if (economoyTicket > 0) {
    modalInnerHtml = `<h3>You Booked ${economoyTicket} Economy Ticket</h3>`;
  }
  if (firstClassTicket > 0 && economoyTicket > 0) {
    modalInnerHtml = `<h3> You Booked ${firstClassTicket} First Class Ticket & ${economoyTicket} Economy Ticket </h3>`;
  }

  modalInnerHtml += `<h3> Total cost including 10% tax is $${
    document.getElementById("total").innerText
  }</h3>`;
  modalInner.insertAdjacentHTML(
    "afterbegin",
    `
    <img src="./images/success.svg" alt="">

  `
  );
  modalInner.insertAdjacentHTML("beforeend", modalInnerHtml);

  if (firstClassTicket === 0 && economoyTicket === 0) {
    modalInner.innerHTML = `
    <img src="./images/report.svg" alt="">
    <h1> You Didn't Book any Ticket!<h1>
    `;
  }
  modalOuter.classList.add("open");


}

function hideModal(modal) {
  modal.classList.remove("open");
  modal.querySelector(".modal-inner").innerHTML = "";
  document.getElementById('total').innerText = 0;
  document.getElementById('sub-total').innerText = 0;
  document.getElementById('tax').innerText = 0;
  document.querySelectorAll("[data-price]").forEach((elem) => (elem.value = 0));

}

modalOuter.addEventListener("click", function (e) {
  const isOutside = !e.target.closest(".modal-inner");
  if (isOutside) {
    hideModal(e.currentTarget);
  }
});
