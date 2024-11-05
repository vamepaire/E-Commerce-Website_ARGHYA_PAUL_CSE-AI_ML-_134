window.onload = function () {
  const flashMessage = document.getElementById("flash-message");
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.classList.add("fade-out"); // Add fade-out class
      setTimeout(() => {
        flashMessage.style.display = "none"; // Remove from view after fade out
      }, 500); // Matches the transition duration
    }, 3000); // Show for 3 seconds
  }
};
