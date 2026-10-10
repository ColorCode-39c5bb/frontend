import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "pagination.html").then((templateDocument)=>{
	DefaultPagination.prototype.template = templateDocument.getElementById("default-pagination");
	window.constructor_customelement.push(DefaultPagination);
});
export default function DefaultPagination(){
	const _this = Reflect.construct(HTMLElement, [], DefaultPagination);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.elements_todo = {
		actionbutton: _this.shadowRoot.querySelectorAll(".actionbutton"),
		pager: _this.shadowRoot.querySelector(".pager"),
	}
	_this.elements_todo.actionbutton.forEach((ab)=>{
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
	if(rd===undefined) return;
	const {pager: el_pager} = this.elements_todo;
	if(rd.page)
		this.dispatchEvent(new CustomEvent("pagechange", {
			composed: true, bubbles: true,
			detail: {page: rd.page}
		}));
	if(Object.keys(rd).length < 3) return;
	el_pager.reactiverender_for(
		Array.from(
			Array(rd.pagercount), 
			(_, i)=>rd.page-Math.floor(rd.pagercount/2)+i
		),
		function(page){
			if(1<=page && page<=rd.totalpage) this.innerText = page;
			else this.innerText = "";
			if(page==rd.page) this.classList.add("currentpage");
			else this.classList.remove("currentpage");
		}
	);
}

DefaultPagination.prototype.RDCLASS = function(){
	this.construction = {
		mergemode: true,
	}
}