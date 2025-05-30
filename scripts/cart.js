import { LoadJson } from "./base.js";
import { CountOfCardsInCart } from "./utils.js";
const load = new LoadJson()

const cartInf = document.querySelector('.cart-count')
// *




export async function renderBuyCardInCart() {
      if (window.location.pathname === '/cart.html') {
            const cardsLoad = load.localStorageGet('card')
            renedrCardFromLocalStorage(cardsLoad)
            cartInf.classList.add('visable')
            finalSum()
      }
}


function renedrCardFromLocalStorage(event) {
      const cardsIdLoad = load.localStorageGet('basket')
      const wrapper = document.querySelector('.container-cart-card')
      event.forEach(card => {
            let cardItem
            let cardItemBase
            let priceSum
            const { hasVariants, id, baseQuantity, variantType, typesOfDishes, img, nameDish, weight, description, price, discount, disPrice } = card
            if (hasVariants) {
                  variantType.forEach(caTy => {
                        const { id, img, nameType, weight, description, price } = caTy
                        cardsIdLoad.forEach((cardId => {
                              const { id: caId, count } = cardId
                              if (+caId === +id) {
                                    priceSum = price * +count
                                    cardItem =
                                          `
                        <div class="cart-card" data-card-id="${id}">
                              <img src="img/food/${img}" alt="${nameType}" class="img-cart-card">
                              <div class="container-name-weight">
                                    <p class="name-cart-card">${nameType}</p>
                                    <div class="container-weight">
                                          <p class="weight">${weight} г</p>
                                    </div>
                              </div>
                              <p class="cart-card-price" data-id="${id}">${price} ₽</p>
                              <div class="cart-card-calculator">
                                    <div class="calculator">
                                          <div class="side left">
                                                <div class="seg"></div>
                                                <div class="seg"></div>
                                          </div>
                                          <div class="calculator-display">
                                                <button type="button" aria-label="Минус" class="minus" data-id="${id}">
                                                      <svg width="12" height="3" viewBox="0 0 12 3" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.3839 2.53966L0 2.53966V0.844238H11.3839L11.3839 2.53966Z"
                                                                  fill="white" />
                                                      </svg>
                                                </button>
                                                <p class="calculator-information" data-id="${id}">${count} шт</p>
                                                <button type="button" aria-label="Плюс" class="plus" data-id="${id}">
                                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.3839 6.53967L0 6.53967V4.84425H11.3839L11.3839 6.53967Z"
                                                                  fill="white" />
                                                            <path d="M6.54015 0L6.54015 11.3839L4.84473 11.3839V0H6.54015Z" fill="white" />
                                                      </svg>
                                                 </button>
                                          </div>
                                          <div class="side right">
                                                <div class="seg"></div>
                                                <div class="seg"></div>
                                          </div>
                                    </div>
                              </div>
                              <p class="sum" data-id="${id}">${priceSum} ₽</p>
                              <button type="button" aria-label="Удалить" class="delete" data-id="${id}"></button>
                        </div>
                                                            `

                                    wrapper.insertAdjacentHTML('beforeend', cardItem);
                              }
                        }))

                  })
            } else {
                  cardsIdLoad.forEach((cardId => {
                        const { id: caId, count } = cardId
                        if (+caId === +id) {
                              priceSum = price * +count
                              cardItem =
                                    `
                        <div class="cart-card" data-card-id="${id}">
                              <img src="img/food/${img}" alt="${nameDish}" class="img-cart-card">
                              <div class="container-name-weight">
                                    <p class="name-cart-card">${nameDish}</p>
                                    <div class="container-weight">
                                          <p class="weight">${weight} г</p>
                                    </div>
                              </div>
                              <p class="cart-card-price" data-id="${id}">${price} ₽</p>
                              <div class="cart-card-calculator">
                                    <div class="calculator">
                                          <div class="side left">
                                                <div class="seg"></div>
                                                <div class="seg"></div>
                                          </div>
                                          <div class="calculator-display">
                                                <button type="button" aria-label="Минус" class="minus" data-id="${id}">
                                                      <svg width="12" height="3" viewBox="0 0 12 3" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.3839 2.53966L0 2.53966V0.844238H11.3839L11.3839 2.53966Z"
                                                                  fill="white" />
                                                      </svg>
                                                </button>
                                                <p class="calculator-information" data-id="${id}">${count} шт</p>
                                                <button type="button" aria-label="Плюс" class="plus" data-id="${id}">
                                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.3839 6.53967L0 6.53967V4.84425H11.3839L11.3839 6.53967Z"
                                                                  fill="white" />
                                                            <path d="M6.54015 0L6.54015 11.3839L4.84473 11.3839V0H6.54015Z" fill="white" />
                                                      </svg>
                                                 </button>
                                          </div>
                                          <div class="side right">
                                                <div class="seg"></div>
                                                <div class="seg"></div>
                                          </div>
                                    </div>
                              </div>
                              <p class="sum" data-id="${id}">${priceSum} ₽</p>
                              <button type="button" aria-label="Удалить" class="delete" data-id="${id}"></button>
                        </div>
                                                            `
                              wrapper.insertAdjacentHTML('beforeend', cardItem);
                        }
                  }))
            }
      })
}



export function changeQuantity() {
      document.addEventListener('click', (event) => {
            const target = event.target
            if (window.location.pathname === '/cart.html') {
                  if (target.closest('.plus')) {
                        const buyButtonPlus = target.closest('.plus').getAttribute('data-id');
                        const countCard = document.querySelectorAll('.calculator-information')
                        const prise = document.querySelectorAll('.cart-card-price')
                        const sum = document.querySelectorAll('.sum')
                        const calcResCart = comparisonToTheCollection(countCard, buyButtonPlus)
                        let count = calcResCart;
                        let purchasedItem = {
                              id: buyButtonPlus,
                              count: count
                        }
                        setBasketLocalStorage(purchasedItem, redactBasketLocalStoragePlus) //* загрузка в localStorage id Товара и его количество,
                        CountOfCardsInCart() //* обновление количества товара 
                        redactSum(prise, sum, buyButtonPlus)
                        finalSum()
                  }
            }
            if (window.location.pathname === '/cart.html') {
                  if (target.closest('.minus')) {
                        const buyButtonMinus = target.closest('.minus').getAttribute('data-id');
                        const countCard = document.querySelectorAll('.calculator-information')
                        const prise = document.querySelectorAll('.cart-card-price')
                        const sum = document.querySelectorAll('.sum')
                        const calcResCart = comparisonToTheCollection(countCard, buyButtonMinus)
                        let count = calcResCart
                        let purchasedItem = {
                              id: buyButtonMinus,
                              count: count
                        }
                        setBasketLocalStorage(purchasedItem, redactBasketLocalStorageMinus) //* загрузка в localStorage id Товара и его количество,
                        CountOfCardsInCart() //* обновление количества товара  
                        redactSum(prise, sum, buyButtonMinus)
                        finalSum()
                  }
            }
      })
}

function comparisonToTheCollection(collection, obj) {//* логика для получения количества выброного товара
      let result
      collection.forEach(item => {
            if (obj === item.getAttribute('data-id')) return result = +item.textContent
      })
      return result
}


function redactSum(priceColect, sumColect, button) {
      let result
      let count
      let priceStr
      let sumStr
      const loadCardId = new LoadJson();
      const cardsId = loadCardId.localStorageGet('basket');
      cardsId.forEach(card => {
            if (card.id === button) {
                  count = card.count
                  priceColect.forEach(price => {
                        if (price.getAttribute('data-id') === button) {
                         priceStr = price.textContent
                         sumColect.forEach(sum => {
                               if (sum.getAttribute('data-id') === button) {
                                    sumStr =  parseInt(priceStr) * parseInt(count)  +" ₽"
                                    sum.textContent = sumStr
                              }
                         })
                        }
                  })
            }
      })
      console.log(count, 'count')
      console.log(priceStr, 'prise')
      console.log(sumStr, 'sum')
}

function setBasketLocalStorage(item, operation) { //* логика получая данные перезаписывает в localStorage
      const loadCardId = new LoadJson()
      const result = operation((item))
      const basket = loadCardId.localStorageSet('basket', result)
      return basket
}

function redactBasketLocalStoragePlus(cardInf) { //* логика редактирования количества localStorage plus
      const loadCardId = new LoadJson();
      let cardsId = loadCardId.localStorageGet('basket');
      cardsId.forEach(card => {
            if (card.id === cardInf.id) card.count += 1
      })
      return cardsId;
}

function redactBasketLocalStorageMinus(cardInf) { //* логика редактирования количества localStorage minus
      const loadCardId = new LoadJson();
      let cardsId = loadCardId.localStorageGet('basket');
      cardsId.forEach(card => {
            if (card.id === cardInf.id && card.count > 1) card.count -= 1
      })
      return cardsId;
}



export function remuveButton(){
      document.addEventListener('click', (event)=>{
            const target = event.target
            let filterCards
            if(target.closest('.delete')){
                  const cardRemoveButtonId = target.closest('.delete').getAttribute('data-id')
                  const cards = load.localStorageGet('basket');
                  filterCards = cards.filter(card => card.id !== cardRemoveButtonId)
                  remuveElemetDOM(+cardRemoveButtonId)
                  finalSum()
                  load.localStorageSet('basket', filterCards)
                  CountOfCardsInCart() 
            }
      })
}




function remuveElemetDOM(id){
      const element = document.querySelector(`[data-card-id="${id}"]`);
        if (element) {
    element.remove(); // Удаляет элемент из DOM
  } else {
    console.warn(`Элемент с data-card-id="${id}" не найден`);
  }

}     


function finalSum(){
      const sumResult = document.querySelector('.payment-price')
      const allSum = document.querySelectorAll('.sum')
      const sumNum = Array.from(allSum).map(sum => parseInt(sum.textContent))
      const sum = sumNum.reduce((acc, num) => acc + num, 0);
      console.log(sumNum)
      console.log(sum)
      return sumResult.textContent = sum + '₽'
}
