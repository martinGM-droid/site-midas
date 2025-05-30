import { LoadJson } from "./base.js";
const params = new URLSearchParams(window.location.search);
const category = params.get('dish');

export async function getCardInfProductCard() {
          if (
        window.location.pathname === '/' || 
        window.location.pathname.endsWith('product-card.html')
      ) {
            const load = new LoadJson()
            const cardLoad = load.localStorageGet('card')
            renderCardByClick(cardLoad)
      }
}


const wrapperImg = document.querySelector('.container-img-of-dishes')
const wrapperName = document.querySelector('.container-name-of-dishes')
const wrapperCard = document.querySelector('.variety-card-container')
const wrapperDescription = document.querySelector('.description-container')
function renderCardByClick(event) {
      let cardDescription
      let cardName
      let cardImg
      let cardItem
      event.forEach(card => {
            const { hasVariants, id, baseQuantity, variantType, typesOfDishes, img, nameDish, weight, description, price, discount, disPrice } = card
            if (hasVariants) {
                  let response
                  variantType.forEach(caTy => {
                        const { id ,img, nameType, weight, description, price } = caTy
                        if (id === +category) {
                              cardImg = `
                                    <img src="/img/food/${img}" alt="${nameType}" class="img-of-dish">
                        `
                              cardName = `
                                    <p class="name-of-dishes">${nameType}</p>
                              `
                              cardDescription = `
                              <p class="variety-description">${description}</p>
                              `
                              wrapperDescription.insertAdjacentHTML('beforeend', cardDescription);
                              wrapperName.insertAdjacentHTML('beforeend', cardName);
                              wrapperImg.insertAdjacentHTML('beforeend', cardImg);
                              response = true
                        }
                  })
                  if (response) {
                        variantType.forEach(caTy => {
                              const {id, img, nameType, weight, description, price } = caTy
                              cardItem = `
                              <div class="variety-card">
                                          <div class="variety-name-weight">
                                                <p class="variety-name">${nameType}</p>
                                                <div class="variety-weight-container">
                                                      <p class="variety-weight">${weight} г</p>
                                                </div>
                                          </div>
                                          <div class="variety-calculator">
                                                <div class="calculator">
                                                      <div class="side left">
                                                            <div class="seg"></div>
                                                            <div class="seg"></div>
                                                      </div>
                                                      <div class="calculator-display">
                                                            <button type="button" aria-label="Минус" class="minus" data-id="${id}">
                                                                  <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3839 2.53966L0 2.53966V0.844238H11.3839L11.3839 2.53966Z"fill="white" /></svg>
                                                            </button>
                                                            <p  class="calculator-information" data-id="${id}">1 шт</p>
                                                            <button type="button" aria-label="Плюс" class="plus" data-id="${id}">
                                                                  <svg width="12" height="12" viewBox="0 0 12 12"fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3839 6.53967L0 6.53967V4.84425H11.3839L11.3839 6.53967Z" fill="white" /><path d="M6.54015 0L6.54015 11.3839L4.84473 11.3839V0H6.54015Z"fill="white" /></svg>
                                                            </button>
                                                      </div>
                                                      <div class="side right">
                                                            <div class="seg"></div>
                                                            <div class="seg"></div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div class="variety-prise-container">
                                                <p class="variety-prise">${price} ₽</p>
                                                <button type="button" aria-label="Купить" class="buy" data-name="${id}"></button>
                                          </div>
                                    </div>
                                    `
                              wrapperCard.insertAdjacentHTML('beforeend', cardItem)

                        })
                  }
            }
      })
}


