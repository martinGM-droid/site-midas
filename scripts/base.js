export class LoadJson {
  static async fetchParseLoad(name, links) {
    try {
      const response = await fetch(links);
      if (!response.ok) throw new Error(`error: ${response.statusText}`);
      const parsed = await this.responseParse(response)
      const stringified = this.responseParseStringify(parsed)
      return this.loadInLocalStorage(name, stringified)
    } catch (err) {
      console.error(err)
    }
  }

  static async responseParse(item) {
    const obj = await item.json()
    return obj
  }

  static responseParseStringify(item) {
    return JSON.stringify(item)
  }

  static loadInLocalStorage(name, item) {
    localStorage.setItem(name, item)
  }

  localStorageGet(name) {
    const stored = JSON.parse(localStorage.getItem(name))
    return stored
  }
  localStorageSet(name, item) {
    const stringified = JSON.stringify(item)
    return localStorage.setItem(name, stringified)
  }

  // ? надо ли оставить на будующие
  // stringify(item) {
  //   return JSON.stringify(item)
  // }
}


export class Calculator {
  constructor(classId) {
    this.classId = classId
  }

  plus(cardCount) {
    let result
    cardCount.forEach(count => {
      if (this.classId === count.getAttribute('data-id')) {
        result = parseInt(count.textContent) + 1
        return count.textContent = result + ' шт'
      }
    })
  }

  minus(cardCount) {
    let result
    cardCount.forEach(count => {
      if (this.classId === count.getAttribute('data-id') && +parseInt(count.textContent) !== 1 ) {
        result = parseInt(count.textContent) - 1
        return count.textContent = result + ' шт'
      }
    })
  }


}

