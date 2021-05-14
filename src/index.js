import "./styles.css";
import makeTable from "./csv2table";

async function haru() {
  await makeTable;
  let lastSelectedImgName = "none";
  const imgs = document.getElementsByTagName("img");
  for (const img of imgs) {
    img.addEventListener("click", (event) => {
      const clickedImgName = event.target.getAttribute("src");
      if (clickedImgName === lastSelectedImgName) {
        for (const img of imgs) {
          img.classList.remove("unselected");
        }
        lastSelectedImgName = "none";
      } else {
        for (const img of imgs) {
          if (img.getAttribute("src") === clickedImgName) {
            img.classList.remove("unselected");
          } else {
            img.classList.add("unselected");
          }
        }
        lastSelectedImgName = clickedImgName;
      }
    });
  }
}
haru();
