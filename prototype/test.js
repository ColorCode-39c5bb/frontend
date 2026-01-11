import Final from "./Final.js";
import Abstract from "./Abstract.js";
import Some from "./Some.js";

console.log(new Final()); //pass
console.log(Final.call(new Final())); //pass
// console.log(Final.call({})); //throw
// console.log(Reflect.construct(Final, [], MyButton)); //throw

// console.log(new Abstract()); //throw "不能实例抽象类"
console.log(Abstract.call(new Final())); //pass
console.log(Reflect.construct(Abstract, [], Final)); //pass
// console.log(Abstract.call(Object.create(Abstract.prototype))); //throw "不能实例抽象类"

console.log(Abstract.call(new Some())); //pass
// console.log(Some.call(new Some())); //throw "必须通过new调用"
console.log(Reflect.construct(Some, [], Some)); //pass
console.log(Reflect.construct(Some, [], Final)); //pass
// console.log(Reflect.construct(Some, [], Abstract)); //throw "不能实例抽象类"
// console.log(Final.call(new Some())); //throw "不能继承最终类"