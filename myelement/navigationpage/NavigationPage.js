import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "navigation-page-template.html").then((templateDocument)=>{
	NavigationPage.template = templateDocument.getElementById("navigation-page");
	window.constructor_customelement.push(NavigationPage);
});
export default function NavigationPage(){
	const _this = Reflect.construct(HTMLElement, [], NavigationPage);
	_this.initShadowRoot(NavigationPage);
	_this.elements_todo={};
	return _this;
}
Object.setPrototypeOf(NavigationPage.prototype, HTMLElement.prototype); Object.setPrototypeOf(NavigationPage, HTMLElement);
Object.defineProperty(NavigationPage, "observedAttributes", {get: function() {return []}});
NavigationPage.prototype.connectedCallback = function(){
}
NavigationPage.prototype.attributeChangedCallback = function(name, oldValue, newValue){
}
NavigationPage.prototype.disconnectedCallback = function(){
}
NavigationPage.prototype.adoptedCallback = function(){
}