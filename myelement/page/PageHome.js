import {getTemplate} from "../../template.js";	
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageHome.template = templateDocument.getElementById("page-home");
	window.constructor_customelement.push(PageHome);
});
export default function PageHome(){
	const _this = Reflect.construct(HTMLElement, [], PageHome);
	_this.initShadowRoot(PageHome);
	_this.elements_todo = {
		greeting: _this.shadowRoot.getElementById("greeting"),
	};

	_this.reactiverender({
		greeting: [
			"Welcome",
			"There is Not Violet in Garden"
		],
	});
	return _this;
}
Object.setPrototypeOf(PageHome.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageHome, HTMLElement);
Object.defineProperty(PageHome, "observedAttributes", {get: function() {return ["value"]}});
PageHome.prototype.connectedCallback = function(){
}
PageHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageHome.prototype.disconnectedCallback = function(){
	
}
PageHome.prototype.adoptedCallback = function(){
	
}
PageHome.prototype.reactiverender = function(delta){
	const {greeting} = this.elements_todo; const rd = this.reactivedata.datavalue;
	greeting.reactiverender(rd.greeting);
}
