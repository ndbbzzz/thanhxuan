const boxes = document.querySelectorAll(".box");
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const title = document.getElementById("title");
const desc = document.getElementById("desc");

boxes.forEach(box => {
  box.onclick = () => {
    overlay.classList.add("active");
    overlayImg.src = box.dataset.img;
    title.innerText = box.dataset.title;
    desc.innerText = box.dataset.desc;
  };
});

// bấm ra ngoài để đóng
overlay.onclick = () => {
  overlay.classList.remove("active");
};
const openPuzzle = document.getElementById("openPuzzle");
const puzzle = document.getElementById("puzzle");
const inputs = puzzle.querySelectorAll("input");
const videoBox = document.getElementById("videoBox");
const audioPlayer = document.getElementById("audioPlayer");
 

const answer = "THANHXUAN"; // 9 chữ

// bấm button → hiện puzzle
openPuzzle.onclick = () => {
  puzzle.classList.remove("hidden");
  videoBox.classList.add("hidden");

  inputs.forEach(i => i.value = "");
  inputs[0].focus();
};

// nhập chữ
let locked = false; // khóa khi alert hiện

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (locked) return;

    input.value = input.value.toUpperCase();

    // tự nhảy ô
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    // ghép chữ (chỉ tính ô đã nhập)
    let value = "";
    inputs.forEach(i => value += i.value);

    // chỉ kiểm tra khi đủ số chữ
    if (value.length === answer.length) {
      if (value === answer) {
        puzzle.classList.add("hidden");
        videoBox.classList.remove("hidden");
        audioPlayer.play();
      } else {
        locked = true;
        alert("❌ Sai rồi 😝 thử lại nhé!\n💡 Gợi ý: A song");

        // reset puzzle
        inputs.forEach(i => i.value = "");
        inputs[0].focus();
        locked = false;
      }
    }
  });
});

