import Router from "./Router.js";
import config_route from "./config/config_route.js";
import {templatePromise, requestCache} from "./template.js";


import NotSlotted from "./myelement/NotSlotted.js";
import BackgroundImage from "./myelement/BackgroundImage.js";
import ImageLoadAnimation from "./myelement/loadanimation/ImageLoadAnimation.js";
import NavigationBar from "./myelement/NavigationBar.js";
import NavigationPage from "./myelement/navigationpage/NavigationPage.js"
import ArticleCard from "./myelement/ArticleCard.js";
import BlogNavigation from "./myelement/page/blog/BlogNavigation.js";
import TextTyping from "./myelement/TextTyping.js";
import AboutCard from "./myelement/AboutCard.js";
import DefaultPagination from "./myelement/pagination/DefaultPagination.js";
import BlogAbout from "./myelement/page/blog/BlogAbout.js";
import BlogHome from "./myelement/page/blog/BlogHome.js";
import AppMain from "./myelement/AppMain.js";

const defaultStyleSheet = new CSSStyleSheet();
for(let i = 1; i < document.styleSheets[0].cssRules.length; i++) 
	defaultStyleSheet.insertRule(document.styleSheets[0].cssRules[i].cssText);
HTMLElement.prototype.initShadowRoot = function(){
	if(this.shadowRoot == null) return;
	this.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
	this.shadowRoot.appendChild(customElements.get(this.tagName.toLowerCase()).template.content.cloneNode(true));
	customElements.upgrade(this.shadowRoot);
	this.reactivedata = structuredClone(this.data_default);
	this.is_first_connected = true;
}
HTMLElement.prototype.first_connected = function(){
	console.log("first_connected", this);
}
HTMLElement.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	console.log("default_reactiverender", this);
})
HTMLElement.prototype.reactiverefresh = function(rd){
	this.reactivedata ??= {};
	Object.assign(this.reactivedata, rd);
}
HTMLElement.prototype.reactiverender_for = function(rdarray, render){
	if(rdarray===undefined) return;
	if(rdarray===null) rdarray = [];
	if(!this.Ns_active) this.Ns_active = [this];
	if(!this.Ns_inactive) this.Ns_inactive = [];
	if(!this.container) this.container = this.parentElement;
	for(let i=0; i<rdarray.length; i++){
		let next = this.Ns_active[i];
		if(!next){
			next = this.Ns_inactive.pop();
			if(!next) next = this.cloneNode(true);
			this.container.appendChild(next);
			this.Ns_active.push(next);
		}
		render.call(next, rdarray[i]);
	}
	for(let j=this.Ns_active.length-rdarray.length; j>0; j--){
		const item = this.Ns_active.pop();
		item.remove();
		this.Ns_inactive.push(item);
	}
}
window.router = new Router(config_route);
const appmain = document.getElementById("app-main");
appmain.remove();
Promise.all([templatePromise, ...requestCache.values()]).then(()=>{
	//第一次connected的元素在connectedCallback时内部使用的自定义元素可能还没有升级，
	//connectedCallback里如果调用这些没有升级的元素的render就会调到默认的HTMLElement.prototype.render，
	//所以必须确保任意元素connectedCallback时，所有元素都已经升级能够调用到自定义的render方法
	window.router.Ns_link_target.values().forEach(target=>{
		customElements.upgrade(target);
	});
	document.body.appendChild(appmain);
	window.router.replace("/");
	//window.router.push("/blog/home");
});