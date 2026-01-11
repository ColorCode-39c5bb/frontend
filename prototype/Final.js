import Some from "./Some.js";

export default function Final(){
	console.log("Final.new.target: "+new.target?.name, ", Final.this.__proto__.constructor: "+this.__proto__.constructor.name);
	if(!(new.target==Final || (new.target==undefined && Object.getPrototypeOf(this)==Final.prototype))){
		throw new Error("不能继承最终类");
	};
	return Reflect.construct(Some, [], Final);
	// return Some.call(this);
}

Object.setPrototypeOf(Final.prototype, Some.prototype);
