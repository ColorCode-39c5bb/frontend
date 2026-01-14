export default function Parser(){
	if(new.target==Parser || Object.getPrototypeOf(this)==Parser.prototype) throw new Error("不能实例抽象类");
	return this;
}

Parser.prototype.parse = function(){
	throw new Error("此抽象方法未实现");
}