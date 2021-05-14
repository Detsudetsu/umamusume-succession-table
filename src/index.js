import "./styles.css";
import "./csv2table";

let highlightedImgName = "none";
const imgs = document.getElementsByTagName("img");
for (const img of imgs) {
  img.addEventListener("click", () => {
    const clickedImgName = img.getAttribute("src");
    if (clickedImgName === highlightedImgName) {
      resetHighlight();
    } else {
      highlight(clickedImgName);
    }
  });
}

function resetHighlight() {
  for (const img of imgs) {
    img.classList.remove("unselected");
  }
  highlightedImgName = "none";
}

function highlight(keySrcName) {
  for (const img of imgs) {
    if (img.getAttribute("src") === keySrcName) {
      img.classList.remove("unselected");
    } else {
      img.classList.add("unselected");
    }
  }
  highlightedImgName = keySrcName;
}
