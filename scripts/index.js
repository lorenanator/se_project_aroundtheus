const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
/*Elements */

const editProfileBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#close-edit-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");

const cardTemplateContent =
  document.querySelector("#card-template").content.firstElementChild;

const profileAddModal = document.querySelector("#profile-add-modal");
const closeAddModalBtn = document.querySelector("#close-edit-addmodal-btn");

const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");

const imagePreviewModal = document.querySelector("#image-preview-modal");
const closeImagePreviewButton = document.querySelector(
  "#close-image-preview-btn"
);
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");

/*Functions */

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalCaption.textContent = imageAlt;
  openModal(imagePreviewModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplateContent.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  cardImageElement.addEventListener("click", () => {
    openImageModal(cardData.link, cardData.name);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

/*Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  const cardElement = getCardElement(newCardData);
  cardListElement.prepend(cardElement);
  closePopup(profileAddModal);
  addCardForm.reset();
}

/*Event Listeners */

editProfileBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addCardButton.addEventListener("click", () => openModal(profileAddModal));
closeAddModalBtn.addEventListener("click", () => closePopup(profileAddModal));
profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListElement.prepend(cardElement);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

closeImagePreviewButton.addEventListener("click", () =>
  closePopup(imagePreviewModal)
);
