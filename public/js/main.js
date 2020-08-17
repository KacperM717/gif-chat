const mainInput = document.querySelector("#mainInput");

mainInput.focus();

const socket = io();

const bodyClicked = e => {
  mainInput.focus();
  console.log("clicked body");
};

document.body.addEventListener("click", bodyClicked);

document.body.addEventListener("touch", bodyClicked);

mainInput.addEventListener("change", e => {
  const words = e.target.value
    .trim()
    .split(" ")
    .filter(word => word !== "");
  socket.emit("words", words);
  console.log("Word emitted!");
  e.target.value = "";
});

socket.on("gif", gif => {
  createLeaf(gif);
});

socket.on("time", time => console.log(time));

socket.on("leaf", letter => createLeaf(letter));

function rotateInput() {
  const windowRatio = window.innerHeight / window.innerWidth;
  const rotateValue = (Math.sin(windowRatio) * 30) | 0;

  console.log(rotateValue);

  mainInput.style.transform = `rotate(-${rotateValue}deg)`;
}

rotateInput();
