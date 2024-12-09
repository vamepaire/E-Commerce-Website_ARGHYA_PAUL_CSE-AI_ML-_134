const signupForm = document.getElementById("signupForm");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

signupForm.addEventListener("submit", (event) => {
  const password = passwordInput.value;

  // Define password rules
  const isValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/.test(
      password
    );

  if (!isValid) {
    event.preventDefault();
    errorMessage.style.display = "block";
    errorMessage.textContent =
      "Password must have at least 8 characters, include uppercase, lowercase, a number, and a special character.";
  } else {
    errorMessage.style.display = "none";
  }
});
