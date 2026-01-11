export default function Abstract(){
	console.log("Abstract.new.target: "+new.target?.name);
	if(new.target==Abstract || Object.getPrototypeOf(this)==Abstract.prototype) throw new Error("不能实例抽象类");
	return this;
}