import config_site from "../../../config/config_site.js";
import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogHome.template = templateDocument.getElementById("blog-home");
	window.constructor_customelement.push(BlogHome);
});
export default function BlogHome(){
	const _this = Reflect.construct(HTMLElement, [], BlogHome);
	_this.initShadowRoot(BlogHome);
	_this.elements_todo={
		item: _this.querySelector("[slot='item']"),
		pagination: _this.querySelector("[slot='pagination']"),
		page_article: window.router.Ns_link_target.get("/article"),
	};
	_this.addEventListener("click", function(e){
		if(e.target == _this || e.target.tagName != "ARTICLE-CARD") return;
		window.router.push("/article");
		_this.elements_todo.page_article.reactiverender(e.target.reactivedata.datavalue);
	});
	_this.elements_todo.pagination.addEventListener("pagechange", function(e){
		_this.reactiverender({requestbody: {page: e.detail.page,}});
	});
	_this.reactiverender({ pagination: {pagercount: 7} });
	return _this;
}
Object.setPrototypeOf(BlogHome.prototype, HTMLElement.prototype);
Object.setPrototypeOf(BlogHome, HTMLElement);
Object.defineProperty(BlogHome, "observedAttributes", {get: function() {return ["value"]}});
BlogHome.prototype.connectedCallback = function(){
}
BlogHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogHome.prototype.disconnectedCallback = function(){
	
}
BlogHome.prototype.adoptedCallback = function(){
	
}
BlogHome.prototype.reactiverender = function(delta){
	const {item: el_item, pagination: el_pagination} = this.elements_todo; const rd = this.reactivedata.datavalue;
	if(delta.requestbody){ //keys.length > 0
		for(let key in delta.requestbody) if(key!="page") return setTimeout(this.reactiverender.bind(this, {pagination: {page: 1}}));
		if(Object.keys(rd.requestbody).length==4) 
			return fetch(`${config_site.server}/blog/articles`, {
				method: "PUT", headers: {"Content-Type": "application/json",},
				body: JSON.stringify(rd.requestbody)
			}).then((response)=>response.json())
			.then((body)=>this.reactiverender({ 
				articles: body, 
				pagination: {totalpage: 1}
			}));
	}
	if(delta.pagination)
		el_pagination.reactiverender(delta.pagination);
	if(delta.articles)
		el_item.reactiverender_for(delta.articles);
};

BlogHome.RDCLASS = function(){
	this.construction = {
		mergemode: "mode_incremental", isprimary: false,
		data_default: {
			requestbody: undefined,
			articles: [null],
			pagination: null,
		},
		requestbody: {mergemode: "mode_incremental", isprimary: false},
		articles: {mergemode: "mode_full"},
		pagination: {mergemode: "mode_transitive", data_default: null},
	}
	return this;
};