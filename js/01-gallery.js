import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const gallery = document.querySelector(".gallery");

const images = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href= ${original} >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt= "${description}"
    />
  </a>
</div>`;
  })
  .join("");

gallery.insertAdjacentHTML("beforeend", `${images}`);

gallery.addEventListener("click", (event) => {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const target = event.target;

  manageModal(target);
});

function manageModal(element) {
  const modalImgMarkUp = basicLightbox.create(
    `<img
     src=${element.dataset.source}
    alt= "${element.alt}"
    />`,
    {
      onShow() {
        window.addEventListener("keydown", onEscapePress);
      },
      onClose() {
        window.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  modalImgMarkUp.show();

  function onEscapePress(event) {
    console.log(event);
    if (event.key === "Escape") {
      modalImgMarkUp.close();
    }
  }
}
