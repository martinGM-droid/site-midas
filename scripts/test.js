import { LoadJson } from "./base.js";
import { Calculator } from "./base.js";
import { buyButton } from "./utils.js";
// CountOfCardsInCart()

// buyButton()

// function buyButton() {
//       document.addEventListener('click', (event) => {
//       const loadCardId = new LoadJson()
//       const target = event.target
//       if (target.closest('.buy')) {
//             const buyButton = target.closest('.buy').getAttribute('data-name');
//             let purchasedItem = {
//                   id: buyButton,
//                   count: 0
//             }
//             setBasketLocalStorage(purchasedItem)
//             CountOfCardsInCart()
//       }
// })
// }



// function setBasketLocalStorage(item) {
//       const loadCardId = new LoadJson()
//       const result = getBasketLocalStorage(item)
//       const basket = loadCardId.localStorageSet('basket', result)
//       return basket
// }

// function getBasketLocalStorage(cardInf) {
//       const loadCardId = new LoadJson();
//       let cardsId = loadCardId.localStorageGet('basket') || [];

//       const alreadyExists = cardsId.some(item => item.id === cardInf.id);

//       if (!alreadyExists) {
//             cardsId.push(cardInf);
//       }

//       return cardsId;
// }



// function CountOfCardsInCart(array) {
//       const loadCardId = new LoadJson();
//       const cartCount = document.querySelectorAll('.cart-hf-count')
//       const cartCountbox = document.querySelectorAll('.cart-hf-count-box')
//       const basketLength = loadCardId.localStorageGet('basket') || []
//       // const basketLength = array

//             cartCount.forEach(item => {
//                   if (basketLength.length) {
//                         item.textContent = basketLength.length
//                         cartCountbox.forEach(item => {
//                               item.classList.remove('cart-hf-count-box-none')
//                         })
//                   } else {
//                         cartCountbox.forEach(item => {
//                               item.classList.add('cart-hf-count-box-none')
//                         })
//                   }
//             })
// }

// buyButtonCount()

// function buyButtonCount(){
//       document.addEventListener('click',(event)=>{
//       const target = event.target
//       const countCard = document.querySelectorAll('.calculator-information')
//       if(target.closest('.plus')){
//             const plusId = target.closest('.plus').getAttribute('data-id');
//             const calc = new Calculator(plusId)
//             calc.plus(countCard)
//       }
//       if(target.closest('.minus')){
//             const minusId = target.closest('.minus').getAttribute('data-id');
//             const calc = new Calculator(minusId)
//             calc.minus(countCard)
//       }  
// } )
// }








function Calculato (classFe, classSe){
      const loadCardId = new LoadJson()
      const basket = loadCardId.localStorageGet('basket')
      function plus(classFe){
            basket.forEach(card =>{
                  if(classFe.id === card.id) card.count += 1
            })
      }
      function minus(classSe){
            basket.forEach(card =>{
                  if(classSe.id === card.id) card.count -= 1
            })
      }
      // const basketCount = basket.reduce((total, card) => total + card.count, 0);
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
                              return priceStr = price.textContent
                        }
                  })
                  sumColect.forEach(sum => {
                        if (sum.getAttribute('data-id') === button) {
                              return sumStr = sum.textContent
                        }
                  })
            }
      })
      console.log(count, 'count')
      console.log(priceStr, 'prise')
      console.log(sumStr, 'sum')
      return parseInt(p)
}