import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "pagination.html").then((templateDocument)=>{
	DefaultPagination.template = templateDocument.getElementById("default-pagination");
	window.constructor_withTemplate.push(DefaultPagination);
});
export default function DefaultPagination(){
	const _this = Reflect.construct(HTMLElement, [], DefaultPagination);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.els_tooperate = {
		actionbutton: _this.shadowRoot.querySelectorAll(".actionbutton"),
		pager: _this.shadowRoot.querySelector(".pager"),
	}
	_this.els_tooperate.actionbutton.forEach((ab)=>{
		ab.addEventListener("click", function(e){
			let page = _this.reactivedata.page;
			switch(ab.id){
				case "prev":
					page = Math.max(page-1, 1);
					break;
				case "next":
					page = Math.min(page+1, _this.reactivedata.totalpage);
					break;
			}
			_this.reactiverender({page});
		});
	});
	return _this;
}
DefaultPagination.tagname = "default-pagination";
Object.setPrototypeOf(DefaultPagination.prototype, HTMLElement.prototype);
Object.setPrototypeOf(DefaultPagination, HTMLElement);
Object.defineProperty(DefaultPagination, "observedAttributes", {get: function() {return ["value"]}});
DefaultPagination.prototype.connectedCallback = function(){
	
}
DefaultPagination.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
DefaultPagination.prototype.disconnectedCallback = function(){
	
}
DefaultPagination.prototype.adoptedCallback = function(){
	
}
DefaultPagination.prototype.reactiverender = function(rd){
	const {pager} = this.els_tooperate;
	const {page, totalpage, pagercount} = this.reactivedata;
	if(rd.page) {setTimeout(() => {
		this.dispatchEvent(new CustomEvent("pagechange", {
			composed: true, bubbles: true,
			detail: {page}
		}));
	});}
	if(Object.keys(this.reactivedata).length < 3) return;
	const currentpage = page;
	pager.reactiverender_for(
		Array.from(
			Array(pagercount), 
			(_, i)=>page-Math.floor(pagercount/2)+i
		),
		function(page){
			if(1<=page && page<=totalpage) this.innerText = page;
			else this.innerText = "";
			if(page==currentpage) this.classList.add("currentpage");
			else this.classList.remove("currentpage");
		}
	);
}