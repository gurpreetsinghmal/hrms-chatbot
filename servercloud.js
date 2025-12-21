const gemini = document.getElementById("gemini");
const ollama = document.getElementById("ollama");

gemini.addEventListener("click", () => {
  if (window.localStorage.getItem("model") == "gemini") {
    ollama.style.display = "flex";
    gemini.style.display = "none";
  }
  ToggleServer();
});

ollama.addEventListener("click", () => {
  if (window.localStorage.getItem("model") == "ollama") {
    ollama.style.display = "none";
    gemini.style.display = "flex";
  }
  ToggleServer();
});

function ToggleServer() {
  let value = localStorage.getItem("model");

  if (value == "ollama") {
    localStorage.setItem("model", "gemini");
  } else {
    localStorage.setItem("model", "ollama");
  }
}
