import {getTemplate} from "../../template.js";
import config_site from "../../config/config_site.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageBlog.template = templateDocument.getElementById("page-blog");
	customElements.define(PageBlog.template.id, PageBlog);
});
export default function PageBlog(){
	const _this = Reflect.construct(HTMLElement, [], PageBlog);
	_this.attachShadow({mode: "open"});
	_this.data_default = {
		homedata:{requestbody: {
			tags: [],
			keyword: "p",
		}},
		profile: null,
	}
	_this.initShadowRoot();

	_this.followup = {
		tagcontainer: _this.shadowRoot.querySelector("#tags"),
		keyword: _this.shadowRoot.querySelector("[name='keyword']"),
		
		tag: _this.shadowRoot.querySelector(".tag"),
		navigation: _this.querySelector("[slot='navigation']"),
		bloghome: window.router.Ns_link_target.get("/blog/home"),
		blogabout: window.router.Ns_link_target.get("/blog/about"),
	};
	_this.followup.tagcontainer.addEventListener("click", function(e){
		if(e.target == this) return;
		e.target.classList.toggle("selected");
		_this.reactiverender({requestbody: {
			tags: this.querySelectorAll(".tag.selected"),
		}});
	});
	_this.followup.keyword.addEventListener("change", function(e){
		_this.reactiverender({requestbody: {
			keyword: this.value,
		}});
	});

	return _this;
}
Object.setPrototypeOf(PageBlog.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageBlog, HTMLElement);
Object.defineProperty(PageBlog, "observedAttributes", {get: function() {return ["value"]}});
PageBlog.prototype.first_connected = function(){
	this.reactiverender(this.reactivedata);
}
PageBlog.prototype.connectedCallback = HTMLElement.connected_withFirst(function(){
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
})
PageBlog.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageBlog.prototype.disconnectedCallback = function(){
}
PageBlog.prototype.adoptedCallback = function(){
}
PageBlog.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	const {tag,	bloghome,blogabout,navigation,} = this.followup;
	const {tags,homedata,profile,} = rd;
	tag.reactiverender_for(tags, HTMLElement.render_isConnected(function(tag){
		this.firstElementChild.innerText = tag.tagname;
	}));
	bloghome.reactiverender(homedata);
	blogabout.reactiverender(profile?.about);
	navigation.reactiverender(profile);
})
