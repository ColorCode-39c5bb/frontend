import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageArticle.template = templateDocument.getElementById("page-article");
	customElements.define(PageArticle.tagname, PageArticle);
});
export default function PageArticle(){
	const _this = Reflect.construct(HTMLElement, [], PageArticle);
	_this.attachShadow({mode: "open"});
	_this.data_default = {
		title: "无数据",
		create_date: "无数据",
		update_date: "无数据",
		read: "无数据",
		cover: "",
		content: "无数据",
		tags: []
	};
	_this.initShadowRoot();
	_this.followup = {
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
PageArticle.tagname = "page-article";
Object.setPrototypeOf(PageArticle.prototype, HTMLElement.prototype);	
Object.setPrototypeOf(PageArticle, HTMLElement);
Object.defineProperty(PageArticle.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageArticle.prototype.connectedCallback = function(){
	
}
PageArticle.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageArticle.prototype.disconnectedCallback = function(){
	
}
PageArticle.prototype.adoptedCallback = function(){
	
}
PageArticle.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	
	const {title, create_date, update_date, read, cover, content, tag} = this.followup;
	title.textContent = rd.title;
	create_date.textContent = rd.create_date;
	update_date.textContent = rd.update_date;
	read.textContent = rd.read;
	//cover.src = this.reactivedata.cover;
	content.innerHTML = rd.content;
	tag.reactiverender_for(rd.tags, HTMLElement.render_isConnected(function(tag){
		this.innerText = tag.tagname;
	}));
})