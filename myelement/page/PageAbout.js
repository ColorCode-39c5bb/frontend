import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageAbout.template = templateDocument.getElementById("page-about");
	customElements.define(PageAbout.tagname, PageAbout);
});
export default function PageAbout(){
	const _this = Reflect.construct(HTMLElement, [], PageAbout);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = PageAbout.template.content.cloneNode(true);
	//一系列初始化操作
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
PageAbout.tagname = "page-about";
Object.setPrototypeOf(PageAbout.prototype, HTMLElement.prototype);
Object.defineProperty(PageAbout.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageAbout.prototype.connectedCallback = function(){
	
}
PageAbout.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageAbout.prototype.disconnectedCallback = function(){
	
}
PageAbout.prototype.adoptedCallback = function(){
	
}