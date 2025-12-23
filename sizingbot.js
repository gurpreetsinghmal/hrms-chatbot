const contract = document.getElementById("contract");
const enlarge = document.getElementById("enlarge");

contract.addEventListener("click", () => {
  if (window.localStorage.getItem("size") == "contract") {
    enlarge.style.display = "flex";
    contract.style.display = "none";
  }
  ToggleSize();
});

enlarge.addEventListener("click", () => {
  if (window.localStorage.getItem("size") == "enlarge") {
    enlarge.style.display = "none";
    contract.style.display = "flex";
  }
  ToggleSize();
});

function ToggleSize() {
  let value = localStorage.getItem("size");
  // Apply it to the element
  const element = document.getElementById("chatContainer");

  if (value == "enlarge") {
    localStorage.setItem("size", "contract");
    element.style.setProperty("max-width", "800px", "important");
  } else {
    localStorage.setItem("size", "enlarge");
    element.style.setProperty("max-width", "420px", "important");
  }
}
