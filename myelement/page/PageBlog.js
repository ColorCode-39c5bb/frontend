import {getTemplate} from "../../template.js";
import config_site from "../../config/config_site.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageBlog.template = templateDocument.getElementById("page-blog");
	customElements.define(PageBlog.tagname, PageBlog);
});
export default function PageBlog(){
	const _this = Reflect.construct(HTMLElement, [], PageBlog);
	_this.reactivedata = null;
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = PageBlog.template.content.cloneNode(true);
	//一系列初始化操作
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
PageBlog.tagname = "page-blog";
Object.setPrototypeOf(PageBlog.prototype, HTMLElement.prototype);
Object.defineProperty(PageBlog.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageBlog.prototype.connectedCallback = function(){
	fetch(`${config_site.server}/blog/profile?id=1`).then(response=>response.json().then(({data: reactivedata})=>{
		console.log(reactivedata);
		reactivedata.signatures = JSON.parse(reactivedata.signatures).map((item)=>item.signature);
		reactivedata.about = JSON.parse(reactivedata.about);
		this.reactiverefresh(reactivedata);
	}));
}
PageBlog.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageBlog.prototype.disconnectedCallback = function(){
}
PageBlog.prototype.adoptedCallback = function(){
}