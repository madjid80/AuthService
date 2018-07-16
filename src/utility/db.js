
class Db {
  constructor () {
    this._address = ""
    this._port = ""
  }
  store (key, value, collection = "default") {
    //do nothing 
  }
  restore (key, collection = "default") {
    //do nothing 
  }
}
class InMemoryDb extends Db {
  constructor () {
    super()
    this._storage = {}
  }
  store (key, value, collection = "default") {
    if(!this._storage.hasOwnProperty(collection)){
      this._storage[collection] = {}
    }
    this._storage[collection][key] = value
  }
  restore (key, collection = "default") {
    if(!this._storage.hasOwnProperty(collection)){
      return null
    }
    if(!this._storage[collection].hasOwnProperty(key)){
      return null 
    }
    return this._storage[collection][key]
  }
}
module.exports = {
  Db: Db, 
  InMemoryDb: InMemoryDb
}
