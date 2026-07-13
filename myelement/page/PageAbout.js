import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageAbout.template = templateDocument.getElementById("page-about");
	customElements.define(PageAbout.tagname, PageAbout);
});
export default function PageAbout(){
	const _this = Reflect.construct(HTMLElement, [], PageAbout);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	return _this;
}
PageAbout.tagname = "page-about";
Object.setPrototypeOf(PageAbout.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageAbout, HTMLElement);
Object.defineProperty(PageAbout.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageAbout.prototype.connectedCallback = function(){
	console.log("blogabout connected");
}
PageAbout.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageAbout.prototype.disconnectedCallback = function(){
	
}
PageAbout.prototype.adoptedCallback = function(){
	
}