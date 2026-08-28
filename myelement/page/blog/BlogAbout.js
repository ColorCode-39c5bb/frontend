import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogAbout.template = templateDocument.getElementById("blog-about");
	window.constructor_withTemplate.push(BlogAbout);
});
export default function BlogAbout(){
	const _this = Reflect.construct(HTMLElement, [], BlogAbout);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	_this.els_tooperate={
		item: _this.querySelector("[slot='item']"),
	};
	return _this;
}
Object.setPrototypeOf(BlogAbout.prototype, HTMLElement.prototype);
Object.setPrototypeOf(BlogAbout, HTMLElement);
Object.defineProperty(BlogAbout, "observedAttributes", {get: function() {return ["value"]}});
BlogAbout.prototype.connectedCallback = function(){
	this.reactiverender(this.reactivedata);
}
BlogAbout.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogAbout.prototype.disconnectedCallback = function(){
	
}
BlogAbout.prototype.adoptedCallback = function(){
	
}
BlogAbout.prototype.reactiverender = function(rd){
	const {item} = this.els_tooperate;
	item.reactiverender_for(rd, item.reactiverender);
}
