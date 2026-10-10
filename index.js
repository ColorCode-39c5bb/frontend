HTMLElement._render = function(render){
	return function(rd, render_acquired){
		this.rd_torender ??= [];
		if(rd?.is_transitive) this.rd_torender.push(...rd);
		else this.rd_torender.push(rd);
		if(this.__proto__.constructor == HTMLElement) return; //排除还没有升级的自定义元素
		if(!this.isConnected) return;

		this.reactivedata ??= new DataReactive(); //自定义元素在初始化时已确保，此句仅作用于内置元素
		render.call(this, this.reactivedata.merge(this.rd_torender), render_acquired);
		this.rd_torender.length = 0;
	};
};

HTMLElement._connectedcallback = function(connectedcallback){
	return function(){
		if(this.rd_torender?.length) this.reactiverender();
		return connectedcallback.call(this);
	}
};

const defaultStyleSheet = new CSSStyleSheet();
for(let i=1; i<document.styleSheets[0].cssRules.length; i++) defaultStyleSheet.insertRule(document.styleSheets[0].cssRules[i].cssText);
HTMLElement.prototype.initShadowRoot = function(){
	//this.attachShadow({mode: "open"});
	this.reactivedata = this.RDCLASS.call(Reflect.construct(DataReactive, [], this.RDCLASS), this); //this.reactivedata = this.RDCLASS.call(DataReactive.call(Object.create(this.RDCLASS.prototype)), this);
	this.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
	this.shadowRoot.appendChild(this.template.content.cloneNode(true));
	this.shadowRoot.querySelectorAll(".fold-trigger").forEach(btn=>btn.addEventListener("click", (e)=>btn.parentElement.classList.toggle("fold")));
	this.shadowRoot.querySelectorAll(".fold-trigger").forEach(btn=>btn.parentElement.classList.add("fold"));
}

HTMLElement.prototype.reactiverender = HTMLElement._render(function(rd_merged, render_acquired){
	//到这里只有内置元素
	if(typeof(render_acquired)!="function") return;
	render_acquired.call(this, rd_merged);
});

HTMLElement.prototype.reactiverender_for = function(rdarray, render_acquired){
	//if(!rdarray) throw new Error("rdarray必须是数组, 否则此方法不应该有机会调用");
	if(rdarray === undefined) return;
	this.Ns_active ??= [this];
	this.Ns_inactive ??= [];
	this.container ??= this.parentElement;
	for(let i=0; i<rdarray.length; i++){
		let next = this.Ns_active[i];
		if(!next){
			next = this.Ns_inactive.pop();
			if(!next) next = this.cloneNode(true);
			this.container.appendChild(next);
			this.Ns_active.push(next);
		}
		next.reactiverender(rdarray[i], render_acquired);
	}
	for(let j=this.Ns_active.length-rdarray.length; j>0; j--){
		const item = this.Ns_active.pop();
		item.remove();
		this.Ns_inactive.push(item);
	}
};


function DataReactive(){
	return this;
}
DataReactive.prototype.construction = {mergemode: false, isprimary: true};
DataReactive.prototype.merge = function(rd_torender){
	const keys_transitive = [];
	function f(dt, dd, construction){ Object.keys(dd).forEach((k)=>{
		if(dt[k]===undefined) return dt[k]=dd[k];
		if(dd[k].isprimary===undefined?construction[k].isprimary:dd[k].isprimary || typeof(dd[k])!="object") return dt[k]=dd[k];
		switch(dd[k]?.mergemode===undefined?construction[k].mergemode:dd[k].mergemode){
			case undefined: case false: case "full":
				if(!dd[k]) return dt[k]=dd[k];
				if(dd[k].__proto__.constructor==Array) return dt[k]=dd[k];
				break;
			case true: case "incremental":
				if(dd[k]===undefined) return;
				if(dd[k].__proto__.constructor==Array) return dt[k].push(...dd[k]);
				break;
			case "transitive":
				const keypath = construction[k].keypath+"."+k;
				if(!keys_transitive.includes(keypath)){
					keys_transitive.push(keypath);
					dt[k] = Object.defineProperty([], "is_transitive", {value: true});
				}
				return dt[k].push(dd[k]);
		}
		f(dt[k], dd[k], Object.defineProperty(construction[k], "keypath", {value: construction[k].keypath+"."+k}));
	});}
	for(let rd of rd_torender){
		f(this, {datavalue: rd}, Object.defineProperty({datavalue: Object.defineProperty(this.construction, "keypath", {value: "", configurable: true})}, "mergemode", {value: true}));
	};
	return this.datavalue;
};

import Router from "./Router.js";
import config_route from "./config/config_route.js";
window.router = new Router(config_route);
window.router.push("/");
import {requestCache} from "./template.js";
window.TRUE = {value: true, enumerable: false};
window.FALSE = {value: false, enumerable: false};
window.constructor_customelement = [];
Promise.all(requestCache.values()).then(()=>{
	const appmain = document.getElementById("appmain");
	appmain.remove();
	constructor_customelement.forEach((C)=>{
		C.prototype.reactiverender = HTMLElement._render(C.prototype.reactiverender);
		C.prototype.connectedCallback = HTMLElement._connectedcallback(C.prototype.connectedCallback);
		if(C.prototype.RDCLASS) Object.setPrototypeOf(C.prototype.RDCLASS.prototype, DataReactive.prototype);
		else C.prototype.RDCLASS = DataReactive;
		customElements.define(C.prototype.template.id, C);
	});
	document.body.appendChild(appmain);
});
import NotSlotted from "./myelement/NotSlotted.js";
import AppMain from "./myelement/AppMain.js";


import PageHome from "./myelement/page/PageHome.js";
import PageAbout from "./myelement/page/PageAbout.js";
import PageBlog from "./myelement/page/PageBlog.js";
import BlogAbout from "./myelement/page/blog/BlogAbout.js";
import BlogHome from "./myelement/page/blog/BlogHome.js";
import PageArticle from "./myelement/page/PageArticle.js"
import BackgroundImage from "./myelement/BackgroundImage.js";
import ImageLoadAnimation from "./myelement/loadanimation/ImageLoadAnimation.js";
import NavigationBar from "./myelement/NavigationBar.js";
import NavigationPage from "./myelement/navigationpage/NavigationPage.js"
import ArticleCard from "./myelement/ArticleCard.js";
import BlogNavigation from "./myelement/page/blog/BlogNavigation.js";
import TextTyping from "./myelement/TextTyping.js";
import AboutCard from "./myelement/AboutCard.js";
import DefaultPagination from "./myelement/pagination/DefaultPagination.js";