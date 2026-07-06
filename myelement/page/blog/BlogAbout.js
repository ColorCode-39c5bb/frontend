import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogAbout.template = templateDocument.getElementById("blog-about");
	customElements.define(BlogAbout.tagname, BlogAbout);
});
export default function BlogAbout(){
	const _this = Reflect.construct(HTMLElement, [], BlogAbout);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.shadowRoot.appendChild(BlogAbout.template.content.cloneNode(true));
	_this.followup={
		item: _this.querySelector("[slot='item']"),
	};
	return _this;
}
BlogAbout.tagname = "blog-about";
Object.setPrototypeOf(BlogAbout.prototype, HTMLElement.prototype);
Object.defineProperty(BlogAbout.prototype, "observedAttributes", {get: function() {return ["value"]}});
BlogAbout.prototype.connectedCallback = function(){
	
}
BlogAbout.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogAbout.prototype.disconnectedCallback = function(){
	
}
BlogAbout.prototype.adoptedCallback = function(){
	
}
BlogAbout.prototype.reactiverender = function(){
	this.followup.item.reactiverefresh_for(this.reactivedata);
	this.followup.item.reactiverender_for(this.followup.item.reactiverender);
}
