import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogAbout.template = templateDocument.getElementById("blog-about");
	window.constructor_customelement.push(BlogAbout);
});
export default function BlogAbout(){
	const _this = Reflect.construct(HTMLElement, [], BlogAbout);
	_this.initShadowRoot(BlogAbout);
	_this.elements_todo={
		item: _this.querySelector("[slot='item']"),
	};
	_this.reactiverender(null);
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
BlogAbout.prototype.reactiverender = function(delta){
	const {item: el_item} = this.elements_todo; const rd = this.reactivedata.datavalue;
	el_item.reactiverender_for(rd, el_item.reactiverender);
}

BlogAbout.RDCLASS = function(){
	this.construction = {
		data_default: [null]
	}
	return this;
}