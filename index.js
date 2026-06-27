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



const defaultStyleSheet = new CSSStyleSheet();
for(let i = 1; i < document.styleSheets[0].cssRules.length; i++) 
	defaultStyleSheet.insertRule(document.styleSheets[0].cssRules[i].cssText);
HTMLElement.prototype.initShadowRoot = function(){
	if(this.shadowRoot == null) return;
	this.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
}
HTMLElement.prototype.reactiverefresh = function(reactivedata){
	this.reactivedata = reactivedata;
	const getdata = function(js_x){
		let rd = reactivedata;
		for(const key of js_x.split(".")) rd = rd[key];
		return rd;
	}

	this.querySelectorAll(":scope > [js-for]").forEach((el)=>{
		const jsfor = el.getAttribute("js-for");
		const array = jsfor==""? reactivedata : getdata(jsfor);
		const parent = el.parentElement,
			samelevel = parent.querySelectorAll(`:scope > [js-for="${el.getAttribute("js-for")}"]`);
		let last = null;
		for(let i=0; i<array.length; i++){
			let next = samelevel[i];
			if(next==null){
				next = el.cloneNode(true);
				last.after(next);
			}
			this.reactiverefresh.call(next, array[i]);
			if(el.reactivedatarender) el.reactivedatarender(array[i]);
			last = next;
		}
	});
	this.querySelectorAll(":scope > [js-data]").forEach((el)=>{
		const jsdata = el.getAttribute("js-data");
		const rd = jsdata==""? reactivedata : getdata(jsdata);
		this.reactiverefresh.call(el, rd);
		if(el.reactivedatarender) el.reactivedatarender(rd);
	});
	
	const jstext =  this.getAttribute("js-text");
	if(jstext) this.innerText = getdata(jstext);
	else if(jstext=="") this.innerText = reactivedata;
};


window.router = new Router(config_route);
window.router.replace("/");