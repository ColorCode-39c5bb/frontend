import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AppMain.template = templateDocument.getElementById("app-main");
	window.constructor_customelement.push(AppMain);
});
export default function AppMain(){
	const _this = Reflect.construct(HTMLElement, [], AppMain);
	_this.initShadowRoot(AppMain);
	_this.elements_todo={};
	return _this;
}
Object.setPrototypeOf(AppMain.prototype, HTMLElement.prototype); Object.setPrototypeOf(AppMain, HTMLElement);
Object.defineProperty(AppMain, "observedAttributes", {get: function() {return []}});
AppMain.prototype.connectedCallback = function(){
}
AppMain.prototype.attributeChangedCallback = function(name, oldValue, newValue){
}
AppMain.prototype.disconnectedCallback = function(){
}
AppMain.prototype.adoptedCallback = function(){
}