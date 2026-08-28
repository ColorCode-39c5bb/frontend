import config_site from "../../../config/config_site.js";
import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogHome.template = templateDocument.getElementById("blog-home");
	window.constructor_withTemplate.push(BlogHome);
});
export default function BlogHome(){
	const _this = Reflect.construct(HTMLElement, [], BlogHome);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();

	_this.els_tooperate={
		item: _this.querySelector("[slot='item']"),
		pagination: _this.querySelector("[slot='pagination']"),
		page_article: window.router.Ns_link_target.get("/article"),
	};
	_this.addEventListener("click", function(e){
		if(e.target == _this || e.target.tagName != "ARTICLE-CARD") return;
		console.log(e.target.reactivedata);
		window.router.push("/article");
		_this.els_tooperate.page_article.reactiverender(e.target.reactivedata);
	});
	_this.els_tooperate.pagination.addEventListener("pagechange", function(e){
		_this.reactiverender({
			requestbody: {
				page: e.detail.page,
			}
		});
	});
	_this.reactiverender({
		pagination: {
			page: 1,
			pagercount: 7,
		}
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
BlogHome.prototype.reactivemerge = function(){
	const rd = this.rd_torender.reduce(function(pre, cur){
		if(!pre) return cur;
		if(!pre.requestbody) pre.requestbody = cur?.requestbody;
		else Object.assign(pre.requestbody, cur?.requestbody);
		delete cur?.requestbody;
		return Object.assign(pre, cur);
	});
	if(!rd) return rd;
	this.reactivedata ??= { requestbody: {} };
	Object.assign(this.reactivedata.requestbody, rd.requestbody);
	const requestbody = rd.requestbody;
	delete rd.requestbody;
	Object.assign(this.reactivedata, rd);
	rd.requestbody = requestbody;
	return rd;
}
BlogHome.prototype.reactiverender = function(rd){
	const {				item: el_item, pagination: el_pagination} = this.els_tooperate;
	const {requestbody: rd_requestbody,	articles: rd_articles, pagination: rd_pagination} = rd;
	el_pagination.reactiverender(rd_pagination);
	if(rd_requestbody && Object.keys(this.reactivedata.requestbody).length==4){
		fetch(`${config_site.server}/blog/articles`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.assign(this.reactivedata.requestbody, rd_requestbody))
		}).then((response)=>response.json())
		.then((body)=>{
			this.reactiverender({
				articles: body.data,
				pagination: {
					totalpage: Math.ceil(body.dataExtra/this.reactivedata.requestbody.pagesize),
				},
			});
		});
		return;
	}
	el_item.reactiverender_for(rd_articles);
};