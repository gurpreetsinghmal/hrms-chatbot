const muteButton = document.getElementById("muteButton");
const unmuteButton = document.getElementById("unmuteButton");

muteButton.addEventListener("click", () => {
  if (window.localStorage.getItem("mute") == "true") {
    unmuteButton.style.display = "flex";
    muteButton.style.display = "none";
  }
  ToggleSpeaker();
});

unmuteButton.addEventListener("click", () => {
  if (window.localStorage.getItem("mute") == "false") {
    unmuteButton.style.display = "none";
    muteButton.style.display = "flex";
  }
  ToggleSpeaker();
});

function ToggleSpeaker() {
  let value = localStorage.getItem("mute");

  if (value == "true") {
    localStorage.setItem("mute", "false");
  } else {
    localStorage.setItem("mute", "true");
  }
}
