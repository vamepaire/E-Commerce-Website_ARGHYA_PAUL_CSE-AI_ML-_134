const wishlistIcon = document.getElementById("wishlistIcon");

wishlistIcon.addEventListener("click", () => {
  if (
    wishlistIcon.src ===
    "https://cdn2.iconfinder.com/data/icons/thick-outlines-online-project-basics/128/20-red_favorite-heart-love-wishlist-512.png"
  ) {
    wishlistIcon.src =
      "https://media.istockphoto.com/id/1439973042/vector/red-heart-flat-icon-the-symbol-of-love-vector-illustration.jpg?s=612x612&w=0&k=20&c=i2vL1DR3XaqPcLAUBiaQzeQOj8uqksXED6wI66MO3h0=";
  } else {
    wishlistIcon.src =
      "https://cdn2.iconfinder.com/data/icons/thick-outlines-online-project-basics/128/20-red_favorite-heart-love-wishlist-512.png";
  }
});
