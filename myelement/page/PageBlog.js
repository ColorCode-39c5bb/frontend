import {getTemplate} from "../../template.js";
import config_site from "../../config/config_site.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageBlog.template = templateDocument.getElementById("page-blog");
	window.constructor_withTemplate.push(PageBlog);
});
export default function PageBlog(){
	const _this = Reflect.construct(HTMLElement, [], PageBlog);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();

	_this.els_tooperate = {
		tagcontainer: _this.shadowRoot.querySelector("#tags"),
		keyword: _this.shadowRoot.querySelector("[name='keyword']"),
		
		tag: _this.shadowRoot.querySelector(".tag"),
		navigation: _this.querySelector("[slot='navigation']"),
		bloghome: window.router.Ns_link_target.get("/blog/home"),
		blogabout: window.router.Ns_link_target.get("/blog/about"),
	};
	_this.els_tooperate.tagcontainer.addEventListener("click", function(e){
		if(e.target == this) return;
		e.target.classList.toggle("selected");
		_this.reactiverender({bloghome: {
			requestbody: {
				tags: Array.from(this.querySelectorAll(".tag.selected")).map(tag=>tag.reactivedata),
			},
			pagination: {
				page: 1,
			}
		}});
	});
	_this.els_tooperate.keyword.addEventListener("change", function(e){
		_this.reactiverender({bloghome: {
			requestbody: {
				keyword: this.value,
			},
			pagination: {
				page: 1,
			}
		}});
	});
	window.router.push("/blog/home");
	_this.reactiverender({
		bloghome: {requestbody: {
			tags: [],
			keyword: "",
			pagesize: 3,
		}}
	});
	return _this;
}
Object.setPrototypeOf(PageBlog.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageBlog, HTMLElement);
Object.defineProperty(PageBlog, "observedAttributes", {get: function() {return ["value"]}});
PageBlog.prototype.connectedCallback = function(){
	Promise.all([
		fetch(`${config_site.server}/blog/profile?id=1`).then(response=>response.json().then(({data: profile})=>{
			profile.signatures = JSON.parse(profile.signatures).map((item)=>item.signature);
			profile.about = JSON.parse(profile.about);
			return profile;
		})),
		fetch(`${config_site.server}/blog/tags`).then(response=>response.json()).then(({data: tags})=>tags)
	])
	.then(([profile, tags])=>{
		this.reactiverender({profile, tags});
	});
}
PageBlog.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageBlog.prototype.disconnectedCallback = function(){
}
PageBlog.prototype.adoptedCallback = function(){
}
PageBlog.prototype.reactiverender = function(rd){
	const {tag:el_tag, bloghome:el_bloghome, blogabout:el_blogabout, navigation:el_navigation,} = this.els_tooperate;
	const {tags:rd_tags, bloghome:rd_bloghome, profile:rd_profile,} = rd;
	el_tag.reactiverender_for(rd_tags, function(tag){
		this.firstElementChild.innerText = tag.tagname;
		this.lastElementChild.innerText = tag.article_count;
	});
	el_bloghome.reactiverender(rd_bloghome);
	el_blogabout.reactiverender(rd_profile?.about);
	el_navigation.reactiverender(rd_profile);
}
