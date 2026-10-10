import config_site from "../../../config/config_site.js";
import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogHome.prototype.template = templateDocument.getElementById("blog-home");
	window.constructor_customelement.push(BlogHome);
});
export default function BlogHome(){
	const _this = Reflect.construct(HTMLElement, [], BlogHome);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();

	_this.elements_todo={
		item: _this.querySelector("[slot='item']"),
		pagination: _this.querySelector("[slot='pagination']"),
		page_article: window.router.Ns_link_target.get("/article"),
	};
	_this.addEventListener("click", function(e){
		if(e.target == _this || e.target.tagName != "ARTICLE-CARD") return;
		console.log(e.target.reactivedata);
		window.router.push("/article");
		_this.elements_todo.page_article.reactiverender(e.target.reactivedata);
	});
	_this.elements_todo.pagination.addEventListener("pagechange", function(e){
		setTimeout(()=>_this.reactiverender({fetch: {page: e.detail.page,}}));
	});
	_this.reactiverender({
		pagination: {pagercount: 7}, 
		requestbody: {page: 1},
	});
	return _this;
}
Object.setPrototypeOf(BlogHome.prototype, HTMLElement.prototype);
Object.setPrototypeOf(BlogHome, HTMLElement);
Object.defineProperty(BlogHome, "observedAttributes", {get: function() {return ["value"]}});
BlogHome.prototype.connectedCallback = async function(){
}
BlogHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogHome.prototype.disconnectedCallback = function(){
	
}
BlogHome.prototype.adoptedCallback = function(){
	
}
BlogHome.prototype.reactiverender = function(rd){
	const {item: el_item, pagination: el_pagination} = this.elements_todo;
	el_pagination.reactiverender();
	if(rd.fetch){
		Object.assign(rd.requestbody, rd.fetch);
		if(Object.keys(rd.requestbody).length==4)
			return fetch(`${config_site.server}/blog/articles`, {
				method: "PUT", headers: {"Content-Type": "application/json",},
				body: JSON.stringify(rd.requestbody)
			}).then((response)=>response.json())
			.then((body)=>{
				this.reactiverender({
					fetch: undefined, articles: body,
					pagination: {
						page: 1,
						totalpage: Math.ceil(body.dataExtra/rd.requestbody.pagesize),
					},
				});
			});
	}
	el_item.reactiverender_for(rd.articles);
};

BlogHome.prototype.RDCLASS = function(){
	this.construction = {
		fetch: {mergemode: false, isprimary: true},
		requestbody: {mergemode: true},
		articles: {mergemode: false},
		pagination: {mergemode: "transitive"},
	}
	return this;
};