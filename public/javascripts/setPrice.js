// Function to recalculate the total price
function recalculate(itemId, price, quantity) {
  const itemTotal = price * quantity;
  document.getElementById("item-total-" + itemId).innerText =
    "₹ " + itemTotal.toFixed(2);

  let newTotal = 0;
  document
    .querySelectorAll('[id^="item-total-"]')
    .forEach(function (itemTotalElement) {
      const itemTotalText = itemTotalElement.innerText.replace("₹ ", "");
      newTotal += parseFloat(itemTotalText);
    });

  const shippingFee = 5;
  const discount = 5;
  const coupons = 5;
  const deliveryCharges = 5;
  const packagingFee = 5;
  const protectPromiseFee = 5;

  const finalTotal =
    newTotal +
    shippingFee -
    discount +
    coupons +
    deliveryCharges +
    packagingFee +
    protectPromiseFee;

  document.getElementById("cart-total").innerText =
    "₹ " + finalTotal.toFixed(2);
}

// Function to update quantity and recalculate the total
function updateQuantity(itemId, change, price) {
  const quantityInput = document.getElementById("quantity-" + itemId);
  let newQuantity = parseInt(quantityInput.value) + change;

  if (newQuantity < 1) newQuantity = 1;
  quantityInput.value = newQuantity;

  recalculate(itemId, price, newQuantity);
}
