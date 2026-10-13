import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	NavigationBar.template = templateDocument.getElementById("navigation-bar");
	window.constructor_customelement.push(NavigationBar);
});
export default function NavigationBar(){
	const _this = Reflect.construct(HTMLElement, [], NavigationBar);
	_this.initShadowRoot(NavigationBar);
	_this.elements_todo={};

	const currentPageBar = _this.shadowRoot.getElementById("current-page-bar"),
		switchButton = _this.shadowRoot.getElementById("page-button"),
		navigationpage = _this.querySelector("[slot='navigation-page']");

	navigationpage.setAttribute("popover", "");
	switchButton.addEventListener("click", (e)=>{
		navigationpage.showPopover();
	});
	window.addEventListener("mousemove", (e)=>{
		if(e.clientY < 33) _this.style.top = "0px";
		if(e.clientY > 60) _this.style.top = "-66px";
	});	
	window.addEventListener("routechange", (e)=>{
		currentPageBar.innerText = window.history.state.currentPage;
		navigationpage.hidePopover();
	});
	return _this;
}
Object.setPrototypeOf(NavigationBar.prototype, HTMLElement.prototype); Object.setPrototypeOf(NavigationBar, HTMLElement);
Object.defineProperty(NavigationBar, "observedAttributes", {get: function() {return []}});
NavigationBar.prototype.connectedCallback = function(){
}
NavigationBar.prototype.attributeChangedCallback = function(name, oldValue, newValue){
}
NavigationBar.prototype.disconnectedCallback = function(){
}
NavigationBar.prototype.adoptedCallback = function(){
}