import Abstract from "./Abstract.js";

export default class Some extends Abstract{
	constructor(){ // 等效于 if(new.target==undefined) throw new Error("必须通过new调用");
		super();
	}
}
