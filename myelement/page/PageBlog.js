import {getTemplate} from "../../template.js";
import config_site from "../../config/config_site.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageBlog.template = templateDocument.getElementById("page-blog");
	customElements.define(PageBlog.tagname, PageBlog);
});
export default function PageBlog(){
	const _this = Reflect.construct(HTMLElement, [], PageBlog);
	_this.reactivedata = null;
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.shadowRoot.appendChild(PageBlog.template.content.cloneNode(true));
	_this.followup = {
		tag: _this.shadowRoot.querySelector(".tag"),
		home: window.router.Ns_link_target.get("/blog/home"),
		about: window.router.Ns_link_target.get("/blog/about"),
		navigation: _this.querySelector("[slot='navigation']"),
	};
	return _this;
}
PageBlog.tagname = "page-blog";
Object.setPrototypeOf(PageBlog.prototype, HTMLElement.prototype);
Object.defineProperty(PageBlog.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageBlog.prototype.connectedCallback = function(){
	Promise.all([
		fetch(`${config_site.server}/blog/profile?id=1`).then(response=>response.json().then(({data: profile})=>{
			profile.signatures = JSON.parse(profile.signatures);
			profile.about = JSON.parse(profile.about);
			return profile;
		})),
		fetch(`${config_site.server}/blog/tags`).then(response=>response.json()).then(({data: tags})=>tags)
	])
	.then((reactivedata)=>{
		this.reactivedata = reactivedata;
		this.reactiverender();
	});
}
PageBlog.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageBlog.prototype.disconnectedCallback = function(){
}
PageBlog.prototype.adoptedCallback = function(){
}
PageBlog.prototype.reactiverender = function(){
	const [profile, tags] = this.reactivedata;
	const {tag, home, about, navigation} = this.followup;
	tag.reactiverefresh_for(tags);
	tag.reactiverender_for(function(){
		this.firstElementChild.innerText = this.reactivedata.tagname;
	})
	home.reactivedata = profile;
	about.reactivedata = profile.about;
	navigation.reactivedata = profile;
	navigation.reactiverender();
}