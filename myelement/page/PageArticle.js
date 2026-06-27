import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageArticle.template = templateDocument.getElementById("page-article");
	customElements.define(PageArticle.tagname, PageArticle);
});
export default function PageArticle(){
	const _this = Reflect.construct(HTMLElement, [], PageArticle);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = PageArticle.template.content.cloneNode(true);
	//一系列初始化操作
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
PageArticle.tagname = "page-article";
Object.setPrototypeOf(PageArticle.prototype, HTMLElement.prototype);
Object.defineProperty(PageArticle.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageArticle.prototype.connectedCallback = function(){
	
}
PageArticle.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageArticle.prototype.disconnectedCallback = function(){
	
}
PageArticle.prototype.adoptedCallback = function(){
	
}