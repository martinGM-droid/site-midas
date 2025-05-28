import { getCardInfIndex } from "./index.js";
import { getCardInfCatalog } from "./catalog.js";
import { getCardInfProductCard } from "./product-card.js";
import { renderBuyCardInCart } from "./cart.js";
import { changeQuantity } from "./cart.js";
import { remuveButton } from "./cart.js";
import { checkClick } from "./utils.js";
import { buyButton } from "./utils.js";
import { buyCountButton } from "./utils.js";
import { CountOfCardsInCart } from "./utils.js";
import { CalculatorCount } from "./utils.js";
import { LoadJson } from "./base.js";


LoadJson.fetchParseLoad('card', "/data/back.json")

getCardInfIndex()
getCardInfCatalog()
getCardInfProductCard()
renderBuyCardInCart()
changeQuantity()
remuveButton()
checkClick()
buyButton()
buyCountButton()
CalculatorCount()
CountOfCardsInCart()










