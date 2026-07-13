import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "pagination.html").then((templateDocument)=>{
	DefaultPagination.template = templateDocument.getElementById("default-pagination");
	customElements.define(DefaultPagination.tagname, DefaultPagination);
});
export default function DefaultPagination(){
	const _this = Reflect.construct(HTMLElement, [], DefaultPagination);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.followup = {
		
	}
	return _this;
}
DefaultPagination.tagname = "default-pagination";
Object.setPrototypeOf(DefaultPagination.prototype, HTMLElement.prototype);
Object.setPrototypeOf(DefaultPagination, HTMLElement);
Object.defineProperty(DefaultPagination, "observedAttributes", {get: function() {return ["value"]}});
DefaultPagination.prototype.connectedCallback = function(){
	
}
DefaultPagination.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
DefaultPagination.prototype.disconnectedCallback = function(){
	
}
DefaultPagination.prototype.adoptedCallback = function(){
	
}