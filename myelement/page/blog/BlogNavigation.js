import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{	
	BlogNavigation.template = templateDocument.getElementById("blog-navigation");
	customElements.define(BlogNavigation.tagname, BlogNavigation);
});
export default function BlogNavigation(){
	const _this = Reflect.construct(HTMLElement, [], BlogNavigation);
	_this.data = null;
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = BlogNavigation.template.content.cloneNode(true);
	//一系列初始化操作
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
BlogNavigation.tagname = "blog-navigation";
Object.setPrototypeOf(BlogNavigation.prototype, HTMLElement.prototype);
Object.defineProperty(BlogNavigation.prototype, "observedAttributes", {get: function() {return ["value"]}});
BlogNavigation.prototype.connectedCallback = function(){
}
BlogNavigation.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogNavigation.prototype.disconnectedCallback = function(){
	
}
BlogNavigation.prototype.adoptedCallback = function(){
	
}