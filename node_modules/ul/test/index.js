var Ul = require("../lib");

var obj = {
        n: null
      , v: 1
    }
  , def = {
        n: 1
      , v: 10
      , a: 20
    }
  , last = { c: 1 }
  , tmp = null
  ;

console.log(tmp = Ul.merge(obj, def));
console.log(tmp === Ul.clone(tmp));
console.log(Ul.USER_DIR);
console.log(Ul.merge({}, obj, def, last));
console.log(Ul.merge({ a: { c: {}, d: 3 } }, { a: {d: undefined, c: {s: {}}} }));
console.log(Ul.merge({ a: 4, b: 1 }, { b: 2, c: 3 }));
console.log(Ul.merge({ a: 4, b: 1, d: { a: { b: [{ a: "foo" }] } } }, { b: 2, c: 3, d: { a: { b: [] } } }));
