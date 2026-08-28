import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageArticle.template = templateDocument.getElementById("page-article");
	window.constructor_withTemplate.push(PageArticle);
});
export default function PageArticle(){
	const _this = Reflect.construct(HTMLElement, [], PageArticle);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.els_tooperate = {
		title: _this.shadowRoot.getElementById("title"),
		create_date: _this.shadowRoot.getElementById("create-date"),
		update_date: _this.shadowRoot.getElementById("update-date"),
		read: _this.shadowRoot.getElementById("read"),
		cover: _this.shadowRoot.getElementById("cover"),
		content: _this.shadowRoot.getElementById("content"),
		tag: _this.shadowRoot.querySelector(".tag"),
	};
	return _this;
}
Object.setPrototypeOf(PageArticle.prototype, HTMLElement.prototype);	
Object.setPrototypeOf(PageArticle, HTMLElement);
Object.defineProperty(PageArticle, "observedAttributes", {get: function() {return ["value"]}});
PageArticle.prototype.connectedCallback = function(){
	
}
PageArticle.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageArticle.prototype.disconnectedCallback = function(){
	
}
PageArticle.prototype.adoptedCallback = function(){
	
}
PageArticle.prototype.reactiverender = function(rd){
	const {title, create_date, update_date, read, cover, content, tag} = this.els_tooperate;
	title.textContent = rd.title;
	create_date.textContent = rd.create_date;
	update_date.textContent = rd.update_date;
	read.textContent = rd.read;
	//cover.src = this.reactivedata.cover;
	content.innerHTML = rd.content;
	tag.reactiverender_for(rd.tags, function(tag){
		this.innerText = tag.tagname;
	})
}