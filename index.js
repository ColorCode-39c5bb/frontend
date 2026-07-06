import {getTemplate} from "./template.js";
import Router from "./Router.js";
import config_route from "./config/config_route.js";


import NotSlotted from "./myelement/NotSlotted.js";
import BackgroundImage from "./myelement/BackgroundImage.js";
import ImageLoadAnimation from "./myelement/loadanimation/ImageLoadAnimation.js";
import NavigationBar from "./myelement/NavigationBar.js";
import NavigationPage from "./myelement/navigationpage/NavigationPage.js"
import ArticleCard from "./myelement/ArticleCard.js";
import BlogNavigation from "./myelement/page/blog/BlogNavigation.js";
import TextTyping from "./myelement/TextTyping.js";
import AboutCard from "./myelement/AboutCard.js";



const defaultStyleSheet = new CSSStyleSheet();
for(let i = 1; i < document.styleSheets[0].cssRules.length; i++) 
	defaultStyleSheet.insertRule(document.styleSheets[0].cssRules[i].cssText);
HTMLElement.prototype.initShadowRoot = function(){
	if(this.shadowRoot == null) return;
	this.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
}
HTMLElement.prototype.reactiverefresh_for = function(rdarray){
	if(!this.Ns_for) this.Ns_for = [this];
	let last = null;
	for(let i=0; i<rdarray.length; i++){
		let next = this.Ns_for[i];
		if(next==null){
			next = this.cloneNode(true);
			last.after(next);
			this.Ns_for.push(next);
		}
		next.reactivedata = rdarray[i];
		last = next;
	}
}
HTMLElement.prototype.reactiverender_for = function(reactiverender){
	this.Ns_for.forEach((el)=>{
		reactiverender.call(el);
	});
}


window.router = new Router(config_route);
window.router.replace("/");