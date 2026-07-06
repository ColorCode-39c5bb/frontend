import config_site from "../../../config/config_site.js";
import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{	
	BlogHome.template = templateDocument.getElementById("blog-home");
	customElements.define(BlogHome.tagname, BlogHome);
});
export default function BlogHome(){
	const _this = Reflect.construct(HTMLElement, [], BlogHome);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = BlogHome.template.content.cloneNode(true);
	//一系列初始化操作
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
BlogHome.tagname = "blog-home";
Object.setPrototypeOf(BlogHome.prototype, HTMLElement.prototype);
Object.defineProperty(BlogHome.prototype, "observedAttributes", {get: function() {return ["value"]}});
BlogHome.prototype.connectedCallback = function(){
	fetch(`${config_site.server}/blog/articles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			page: 1,
			page_size: 5,
			keywords: "",
			tags: [],
		})
	}).then((response)=>response.json()).then(({data})=>{
		this.reactivedata = data;
		this.reactiverender();
	})
}
BlogHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogHome.prototype.disconnectedCallback = function(){
	
}
BlogHome.prototype.adoptedCallback = function(){
	
}