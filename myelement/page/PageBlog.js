import {getTemplate} from "../../template.js";
import config_site from "../../config/config_site.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageBlog.prototype.template = templateDocument.getElementById("page-blog");
	window.constructor_customelement.push(PageBlog);
});
export default function PageBlog(){
	const _this = Reflect.construct(HTMLElement, [], PageBlog);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();

	_this.elements_todo = {
		tagcontainer: _this.shadowRoot.querySelector("#tags"),
		keyword: _this.shadowRoot.querySelector("[name='keyword']"),
		
		tag: _this.shadowRoot.querySelector(".tag"),
		navigation: _this.querySelector("[slot='navigation']"),
		bloghome: window.router.Ns_link_target.get("/blog/home"),
		blogabout: window.router.Ns_link_target.get("/blog/about"),
	};
	_this.elements_todo.tagcontainer.addEventListener("click", function(e){
		if(e.target == this) return;
		e.target.classList.toggle("selected");
		_this.reactiverender(
			{bloghome: {fetch: {tags: Array.from(this.querySelectorAll(".tag.selected")).map(tag=>tag.reactivedata.datavalue.name)}},
		});
	});
	_this.elements_todo.keyword.addEventListener("change", function(e){
		_this.reactiverender({bloghome: {fetch: {keyword: this.value,}}});
	});
	window.router.push("/blog/home");
	_this.reactiverender({bloghome: {requestbody: {keyword: "", tags: [], pagesize: 3}}});
	return _this;
}
Object.setPrototypeOf(PageBlog.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageBlog, HTMLElement);
Object.defineProperty(PageBlog, "observedAttributes", {get: function() {return []}});
PageBlog.prototype.connectedCallback = function(){
	Promise.all([
		fetch(`${config_site.server}/blog/account?number=0001`).then(response=>response.json().then((account)=>{
			account.profile = JSON.parse(account.profile.value);
			return account;
		})),
		fetch(`${config_site.server}/blog/tags`).then(response=>response.json()),
	])
	.then(([account, tags])=>{
		this.reactiverender({account, tags});
	});
}
PageBlog.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageBlog.prototype.disconnectedCallback = function(){
}
PageBlog.prototype.adoptedCallback = function(){
}
PageBlog.prototype.reactiverender = function(rd){
	const {tag:el_tag, bloghome:el_bloghome, blogabout:el_blogabout, navigation:el_navigation,} = this.elements_todo;
	el_tag.reactiverender_for(rd.tags, function(tag){
		this.firstElementChild.innerText = tag.name;
		this.lastElementChild.innerText = tag.article_count;
	});
	if(rd.account){
		el_bloghome.reactiverender({fetch: {page: 1}});
		el_navigation.reactiverender(rd.account);
		el_blogabout.reactiverender(rd.account.profile.about);
	}
}

PageBlog.prototype.RDCLASS = function(){
	this.construction = {
		mergemode: true,
		bloghome: {mergemode: "transitive"},
		account: {mergemode: false, isprimary: true},
		tags: {mergemode: false},
	}
	return this;
}