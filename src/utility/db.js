
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
    return this._storage[collection]
  }
}
module.exports = {
  Db: Db, 
  InMemoryDb: InMemoryDb
}
