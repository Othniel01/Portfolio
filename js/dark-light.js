document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  darkModeToggle.addEventListener("click", function () {
    // Toggle between light mode and dark mode classes
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    // Save the user's preference to local storage
    const isDarkModePreferred = body.classList.contains("dark-mode");
    localStorage.setItem("darkModePreference", isDarkModePreferred);

    // Change the icon based on the current state
    updateDarkModeIcon();
  });

  // Check local storage for user's preference and set the initial state
  const isDarkModePreferred =
    JSON.parse(localStorage.getItem("darkModePreference")) || false;
  body.classList.toggle("dark-mode", isDarkModePreferred);
  body.classList.toggle("light-mode", !isDarkModePreferred);

  // Set the initial icon based on the initial state
  updateDarkModeIcon();

  function updateDarkModeIcon() {
    const isDarkMode = body.classList.contains("dark-mode");
    darkModeToggle.src = isDarkMode
      ? "./svg/light-mode.svg"
      : "./svg/dark-mode.svg";
  }
});
