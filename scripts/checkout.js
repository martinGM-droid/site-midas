import { LoadJson } from "./base.js";
const load = new LoadJson()

renderBuyCardInCheckout()

export async function renderBuyCardInCheckout() {
      if (window.location.pathname === '/checkout.html') {
            console.log('ys')
            const cardsLoad = load.localStorageGet('card')
            renedrCardFromLocalStorage(cardsLoad)
            finalSum()
      }else{
            console.log('no')
      }
}


function renedrCardFromLocalStorage(event) {
      const cardsIdLoad = load.localStorageGet('basket')
      const wrapper = document.querySelector('.cart-history-box-card')
      event.forEach(card => {
            let cardItem
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
                                          <div class="cart-history-card">
                                                <div class="container-img-name">
                                                      <img src="/img/food/${img}" alt="${nameType}">
                                                      <p>${nameType}</p>
                                                </div>
                                                <div class="container-count-price">
                                                      <p>${count} шт</p>
                                                      <p class="sum">${priceSum} ₽</p>
                                                </div>
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
                                          <div class="cart-history-card">
                                                <div class="container-img-name">
                                                      <img src="/img/food/${img}" alt="${nameDish}">
                                                      <p>${nameDish}</p>
                                                </div>
                                                <div class="container-count-price">
                                                      <p>${count} шт</p>
                                                      <p class="sum">${priceSum} ₽</p>
                                                </div>
                                          </div>
                                                            `
                              wrapper.insertAdjacentHTML('beforeend', cardItem);
                        }
                  }))
            }
      })
}


function finalSum(){
      const sumResult = document.querySelector('.final-sum-price')
      const allSum = document.querySelectorAll('.sum')
      const sumNum = Array.from(allSum).map(sum => parseInt(sum.textContent))
      const sum = sumNum.reduce((acc, num) => acc + num, 0);
      console.log(sumNum)
      console.log(sum)
      return sumResult.textContent = sum + '₽'
}