const disclaimerBtn = document.getElementById("disclaimer");
const disclaimerOverlay = document.getElementById("disclaimerOverlay");
const disclaimerSheet = document.getElementById("disclaimerSheet");
const disclaimerCloseBtn = document.getElementById("disclaimerCloseBtn");

// Open Disclaimer Sheet
disclaimerBtn.addEventListener("click", () => {
  disclaimerOverlay.classList.add("active");
  disclaimerSheet.classList.add("active");
});

// Close Disclaimer Sheet
disclaimerCloseBtn.addEventListener("click", () => {
  disclaimerOverlay.classList.remove("active");
  disclaimerSheet.classList.remove("active");
});

// Also allow overlay click to close
disclaimerOverlay.addEventListener("click", () => {
  disclaimerOverlay.classList.remove("active");
  disclaimerSheet.classList.remove("active");
});
