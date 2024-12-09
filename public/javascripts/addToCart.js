function moveToCart(itemId) {
  console.log("Arghya");

  fetch(`/addtocart/${itemId}`, {
    // Replace :itemId with ${itemId}
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Item moved to cart successfully!");
        location.reload();
      } else {
        alert("Failed to move item to cart.");
      }
    })
    .catch((error) => {
      console.error("Error moving item to cart:", error);
      alert("An error occurred while moving the item to the cart.");
    });
}
