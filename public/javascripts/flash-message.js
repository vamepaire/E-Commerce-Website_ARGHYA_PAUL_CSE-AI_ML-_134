document.addEventListener("DOMContentLoaded", function () {
  const flashMessage = document.getElementById("flash-message");
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.classList.add("fade-out");
    }, 3000); // Wait for 3 seconds before starting fade-out

    setTimeout(() => {
      flashMessage.style.display = "none"; // Remove the element after fading out
    }, 3500); // Allow 0.5 seconds for fade-out animation
  }
});
