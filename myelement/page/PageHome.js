import {getTemplate} from "../../template.js";	
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageHome.template = templateDocument.getElementById("page-home");
	customElements.define(PageHome.tagname, PageHome);
});
export default function PageHome(){
	const _this = Reflect.construct(HTMLElement, [], PageHome);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = PageHome.template.content.cloneNode(true);
	//一系列初始化操作
	fragment.getElementById("welcome").reactivedata = [
		"Welcome",
		"There is Not Violet in Garden"
	];
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
PageHome.tagname = "page-home";
Object.setPrototypeOf(PageHome.prototype, HTMLElement.prototype);
Object.defineProperty(PageHome.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageHome.prototype.connectedCallback = function(){
}
PageHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageHome.prototype.disconnectedCallback = function(){
	
}
PageHome.prototype.adoptedCallback = function(){
	
}