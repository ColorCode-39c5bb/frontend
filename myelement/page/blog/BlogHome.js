import config_site from "../../../config/config_site.js";
import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{	
	BlogHome.template = templateDocument.getElementById("blog-home");
	customElements.define(BlogHome.template.id, BlogHome);
});
export default function BlogHome(){
	const _this = Reflect.construct(HTMLElement, [], BlogHome);
	_this.attachShadow({mode: "open"});
	_this.data_default = {
		requestbody: {
			page: 1,
			pagesize: 5,
			keyword: "",
			tags: []
		},
		articles: [],
	}
	_this.initShadowRoot();

	_this.followup={
		item: _this.querySelector("[slot='item']"),
		pagination: _this.querySelector("[slot='pagination']"),
	};
	return _this;
}
Object.setPrototypeOf(BlogHome.prototype, HTMLElement.prototype);
Object.setPrototypeOf(BlogHome, HTMLElement);
Object.defineProperty(BlogHome, "observedAttributes", {get: function() {return ["value"]}});
BlogHome.prototype.connectedCallback = async function(){
	getarticles(this.reactivedata.requestbody).then(({data: articles})=>{
		this.reactiverender({articles});
	});
}
BlogHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogHome.prototype.disconnectedCallback = function(){
	
}
BlogHome.prototype.adoptedCallback = function(){
	
}
BlogHome.prototype.reactiverefresh = function(rd){
	Object.assign(this.reactivedata.requestbody, rd.requestbody);
	if(rd.requestbody) Object.assign(rd.requestbody, this.reactivedata.requestbody);
	Object.assign(this.reactivedata, rd);
}
BlogHome.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	const {				item,pagination} = this.followup;
	const {requestbody,	articles} = rd;
	item.reactiverender_for(articles, item.reactiverender);
	if(requestbody) getarticles(requestbody).then(({data: articles})=>{
		this.reactiverender({articles});
	});
})
function getarticles(requestbody){
	return fetch(`${config_site.server}/blog/articles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestbody)
	}).then((response)=>response.json());
}