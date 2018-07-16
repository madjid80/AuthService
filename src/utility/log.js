var log = require('log')

class Log {
  print (str) {
  }
  info () {
    var args = Array.prototype.slice.call(arguments)
    args.unshift(" INFO ")
    args.unshift(new Date())
    this.print(args)
  }
  debug () {
    var args = Array.prototype.slice.call(arguments)
    args.unshift(" DEUG ")
    args.unshift(new Date())
    this.print(args)
  }
  error () {
    var args = Array.prototype.slice.call(arguments)
    args.unshift(" ERROR ")
    args.unshift(new Date())
    this.print(args)
  }
}

class Console extends Log {
  print (str){  
    console.log.apply(console,str);
  }
}

class File extends Log{
  print (str) {
    
  }
}
module.exports = {
  Log: Log, 
  Console: Console
}
