import { LoadJson } from "./base.js";
import { Calculator } from "./base.js";
const params = new URLSearchParams(window.location.search);
export const category = params.get('category'); //* получение параметра строки запроса


//! !!!!!!!!!!!!!!  ЦЕПЬ ФУНКЦИЙ ЛОГИКИ ВЫПОДЮЩЕГО В МЕНЮВ НАВИГАЦИОННОМ МЕНЮ

export function checkClick() {
      const dropDown = document.querySelectorAll('details')
      cycle(dropDown, toggle) //* применение функции к колекции объектов из древа
      textAreaFunc(category)
}

function cycle(object, func) { //* функция вешающая на 1ый:Аргумент обработчик- 2ой:Аргумент
      for (let item of object) {
            func((item))
      }
}

function toggle(item) { //* условный проверяющий состояние элемента  вызывающий коллбэки по условиям
      item.addEventListener('toggle', () => {
            if (item.hasAttribute('open')) {
                  handleClickOutsideGlobal(item);
                  changeColor(item, true)
            } else {
                  changeColor(item, false)
            }
      })
}

function handleClickOutsideGlobal(item) { //* коллбэк проверяющий клик вне элемента
      document.addEventListener('click', handleClickOutside);
      function handleClickOutside(event) {
            if (!item.contains(event.target)) {
                  item.removeAttribute('open')
            }
      }
}

function changeColor(event, boolean) { //* коллбэк изменения цвета 
      let span = event.querySelector('span');
      let svg = event.querySelector('svg');
      if (boolean === true) {
            span.style.color = 'var(--text-color-active)'
            svg.style.color = 'var(--text-color-active)'
      } else {
            span.style.color = 'var(--text-color)'
            svg.style.color = 'var(--text-color)'
      }
}

function textAreaFunc(category) {
      const textArea = document.querySelector('.type-of-dishes') //* получаем доступ для поля с текстом
      const dishName = {
            hotDishes: 'Горячие блюда',
            soups: 'Супы',
            khinkali: 'Хинкали',
            coldAppetizers: 'Холодные закуски',
            salads: 'Салаты',
            sauses: 'Соусы',
            freshPastries: 'Свежая выпечка',
            dessert: 'Десерты',
            beverages: 'Напитки'
      };
      for (const key in dishName) {
            if (category === key) { //* если ключ равен аргумету 
                  textArea.textContent = dishName[key] //* то контент будет равен значеню по равному ключу
            }
      }
}
//! !!!!!!!!!!!!!!!!!!!!!!!!!




export function buyCountButton() { //*  при клике в параметр строки запроса вводит id
      document.addEventListener('click', (event) => {
            const target = event.target
            if (target.closest('.buy-count')) {
                  const dataName = target.closest('.buy-count').getAttribute('data-name');
                  window.location.href = `product-card.html?dish=${dataName}`;
            }

      })
}



//! !!!!!!!!!!!!!!!!!!!!! ЦЕПЬ ФУНКЦИИ ЛОГИКИ ВЫЧЕСЛЕНИЯ И ЗАГРУЗКИ ТОВРА ДЛЯ ПОКУПКИ
export function buyButton() { //* при клике загружает в localStorage id Товара и его количество, обновляя количество товара для меню
      document.addEventListener('click', (event) => {
            const loadCardId = new LoadJson()
            const target = event.target
            if (target.closest('.buy')) {
                  const buyButton = target.closest('.buy').getAttribute('data-name');
                  const countCard = document.querySelectorAll('.calculator-information')
                  const calcRes = comparisonToTheCollection(countCard, buyButton)
                  let count = 1 //* базовое количесво
                  if (window.location.pathname === '/product-card.html') count = calcRes  //* кастомое количество на определенной странице
                  let purchasedItem = {
                        id: buyButton,
                        count: count
                  }
                  setBasketLocalStorage(purchasedItem) //* загрузка в localStorage id Товара и его количество,
                  CountOfCardsInCart() //* обновление количества товара
            }
          
      })
}

export function comparisonToTheCollection(collection, obj) {//* логика для получения количества выброного товара
      let result
      collection.forEach(item => {
            if (obj === item.getAttribute('data-id')) return result = parseInt(item.textContent)
      })
      return result
}

export function setBasketLocalStorage(item) { //* логика получая данные перезаписывает в localStorage
      const loadCardId = new LoadJson()
      const result = getBasketLocalStorage(item)
      const basket = loadCardId.localStorageSet('basket', result)
      return basket
}

function getBasketLocalStorage(cardInf) { //* логика получение данных из localStorage
      const loadCardId = new LoadJson();
      let cardsId = loadCardId.localStorageGet('basket') || [];

      const alreadyExists = cardsId.some(card => card.id === cardInf.id);

      if (alreadyExists) {
            cardsId.forEach(card => {
                  if (card.id === cardInf.id){
                        if(cardInf.count > 1){ 
                           card.count += cardInf.count   
                        } else {
                              card.count +=1
                        }
                  } 
            })
      } else {
            cardsId.push(cardInf);
      }

      return cardsId;
}

export function CountOfCardsInCart() { //* логика корзины в меню 
      const loadCardId = new LoadJson();
      const cartCount = document.querySelectorAll('.cart-hf-count')
      const cartCountbox = document.querySelectorAll('.cart-hf-count-box')
      const basketLength = loadCardId.localStorageGet('basket') || []
      // const basketLength = array

      cartCount.forEach(item => {
            if (basketLength.length) {
                  const basketCount = basketLength.reduce((total, card) => total + card.count, 0);
                  item.textContent = basketCount
                  cartCountbox.forEach(item => {
                        item.classList.remove('cart-hf-count-box-none')
                  })
            } else {
                  cartCountbox.forEach(item => {
                        item.classList.add('cart-hf-count-box-none')
                  })
            }
      })
}
//! !!!!!!!!!!!!!!!!!!!!!!!




export function CalculatorCount() { //* логика вычесления количества товара
      document.addEventListener('click', (event) => {
            const target = event.target
            const countCard = document.querySelectorAll('.calculator-information')
            if (target.closest('.plus')) {
                  const plusId = target.closest('.plus').getAttribute('data-id');
                  const calc = new Calculator(plusId)
                  calc.plus(countCard)
            }
            if (target.closest('.minus')) {
                  const minusId = target.closest('.minus').getAttribute('data-id');
                  const calc = new Calculator(minusId)
                  calc.minus(countCard)
            }
      })
}


