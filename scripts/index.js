import { LoadJson } from "./base.js";

export async function getCardInfIndex() {
      if (window.location.pathname === 'index.html') {
            const load = new LoadJson()
            const cardsLoad = load.localStorageGet('card')
            renderCard(cardsLoad)
      } else{
            console.log('no work')
      }
}



function renderCard(product) {
      const wrapper = document.querySelector('.popular-dishes')
      product.forEach(card => {
            const { hasVariants, id , baseQuantity, variantType, typesOfDishes, img, nameDish, weight, description, price, discount, disPrice } = card
            const priceDiscount = Math.round(price - ((price * disPrice) / 100)) //* Калькулятор скидак
            let variantsHTML = '';
            let discountHTML = '';
            let variantsPrice
            let multiplied = [];
            let cardItem
            if (hasVariants) {
                  let count = variantType.length
                  if (typeof baseQuantity === 'number') {
                        variantType.forEach(item => {
                              multiplied.push(item.price * baseQuantity)
                        })
                  } else {
                        variantType.forEach(item => {
                              multiplied.push(item.price)
                        })
                  }
                  variantType.forEach(caTy => {
                        const {id, img, nameType, weight, description, price } = caTy
                        // console.log(caTy, "j")
                        // let count = variantType.length
                        let minVarPrice
                        if (typeof baseQuantity === 'number') {
                              variantsPrice = price * baseQuantity
                        } else {
                              variantsPrice = price
                        };
                        minVarPrice = Math.min(...multiplied); //* Получаем наименьшее число
                        // console.log(nameType, minVarPrice, 'mi')
                        // console.log(nameType, price, 'pr')
                        if (minVarPrice === price) {
                              variantsHTML = `
                              <div class="price-container">
                                               <p class="price">${variantsPrice} ₽</p>
                                         </div>
                                         <button type="button" aria-label="Купить" class="buy" data-name="${id}"></button>
                             `
                        } else {
                              if (typeof baseQuantity === 'number' && price * baseQuantity === minVarPrice) {
                                    variantsHTML = `
                                    <div class="price-container">
                                                     <p class="price">${variantsPrice} ₽</p>
                                               </div>
                                               <button type="button" aria-label="Купить" class="buy" data-name="${id}"></button>
                                   `
                              } else {
                                    variantsHTML =
                                          `
                                          <div class="price-container">
                                                <p class="price-start">${minVarPrice} ₽</p>
                                                <p class="price-end">${variantsPrice} ₽</p>
                                          </div>
                                                <button type="button" aria-label="Купить" class="buy-count" data-name="${id}">
                                                <p class="count">${count}</p>
                                                <p class="count-text">ВИДА</p>
                                                </button>
                                    `
                              }
                        }
                        // console.log(minVarPrice)
                        cardItem =
                              `
                              <div class="card-container">
                                    <img src="img/food/${img}" alt="${nameDish}" class="card-img">
                                    <p class="name-dish">${nameType}</p>
                              <div class="weight-container">
                                    <p class="weight">${weight} г</p>
                                    </div>
                                    <p class="description">${description}</p>
                              <div class="buy-container">
                                   ${variantsHTML}
                                    </div>
                              </div>
                         `
                        wrapper.insertAdjacentHTML('beforeend', cardItem);
                  })
            } else {
                  if (typeof baseQuantity === 'number') {
                        variantsPrice = price * baseQuantity
                  } else {
                        variantsPrice = price
                  };
                  if (discount) {
                        discountHTML = `
                         <div class="price-container">
                                    <p class="old-price">${price} ₽</p>
                                    <p class="price">${priceDiscount} ₽</p>
                              </div>
                              <button type="button" aria-label="Купить" class="buy" data-name="${id}"></button>
                  `
                  } else {
                        discountHTML = `
                   <div class="price-container">
                                    <p class="price">${variantsPrice} ₽</p>
                              </div>
                              <button type="button" aria-label="Купить" class="buy" data-name="${id}"></button>
                  `
                  }
                  cardItem =
                        `
              <div class="card-container">
                        <img src="img/food/${img}" alt="${nameDish}" class="card-img">
                        <p class="name-dish">${nameDish}</p>
                        <div class="weight-container">
                              <p class="weight">${weight} г</p>
                        </div>
                        <p class="description">${description}</p>
                        <div class="buy-container">
                                    ${discountHTML}
                                    ${variantsHTML}
                  </div>
                  </div>
            `
                  wrapper.insertAdjacentHTML('beforeend', cardItem);
            }
      })
}
