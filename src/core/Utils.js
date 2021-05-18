import { v4 as uuid } from "uuid";

export class Utils {

  /**
  *  get array with from LocalStorage or empty array
  *
  * @param {string} key key of string in LocalStorage
  * @return {Array} array of objects
  */
  static getFromStorage(key) {
    return JSON.parse(localStorage.getItem(`STD:${key}`) || "[]");
  }

  /**
  *  push new object into LocalStorage
  *
  * @param {Object} obj object for push into array
  * @param {string} key key of string in LocalStorage
  * 
  */
  static addToStorage(obj, key) {
    const storageData = Utils.getFromStorage(key);
    storageData.push(obj);
    localStorage.setItem(`STD:${key}`, JSON.stringify(storageData));
  }

  /**
  *  change value in LocalStorage
  *
  * @param {string} key key of string in LocalStorage
  * @param {string} selectorKey key by which to search object
  * @param {string} selectorValue value by which to search object
  * @param {string} modifyKey key for modify
  * @param {string} modifyValue value for modify
  * 
  */
  static modifyInStorage(key, selectorKey, selectorValue, modifyKey, modifyValue) {
    const storageData = Utils.getFromStorage(key);

    for (let obj of storageData) {
      if (obj[selectorKey] === selectorValue) {
        obj[modifyKey] = modifyValue;
      }
    }

    localStorage.setItem(`STD:${key}`, JSON.stringify(storageData));
  }

  /**
  *  delete object from LocalStorage
  *
  * @param {string} key key of string in LocalStorage
  * @param {string} selectorKey key by which to search object
  * @param {string} selectorValue value by which to search object
  *  
  */
  static deleteFromStorage(key, selectorKey, selectorValue) {
    const storageData = Utils.getFromStorage(key);

    const result = storageData.filter(obj => obj[selectorKey] !== selectorValue);

    localStorage.setItem(`STD:${key}`, JSON.stringify(result));
  }

  /**
  *  get random ID
  *
  * @return {string} 128-bit string. Example: aebc5751-5606-4a2e-8f74-d5eb4e351d9a
  */
  static createID() {
    return uuid();
  }
}