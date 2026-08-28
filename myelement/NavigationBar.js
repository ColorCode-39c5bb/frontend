import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	NavigationBar.template = templateDocument.getElementById("navigation-bar");
	window.constructor_withTemplate.push(NavigationBar);
});

export default class NavigationBar extends HTMLElement {
static get observedAttributes() {return ["currentPage"];}

constructor() { super(); 
	this.attachShadow({mode: "open"});
	this.initShadowRoot();


	const currentPageBar = this.shadowRoot.getElementById("current-page-bar"),
		switchButton = this.shadowRoot.getElementById("page-button"),
		navigationpage = this.querySelector("[slot='navigation-page']");

	navigationpage.setAttribute("popover", "");
	switchButton.addEventListener("click", (e)=>{
		navigationpage.showPopover();
	});
	window.addEventListener("mousemove", (e)=>{
		if(e.clientY < 33) this.style.top = "0px";
		if(e.clientY > 60) this.style.top = "-66px";
	});	
	window.addEventListener("routechange", (e)=>{
		currentPageBar.innerText = window.history.state.currentPage;
		navigationpage.hidePopover();
	});
}

	
attributeChangedCallback(name, oldValue, newValue) {
}

connectedCallback() {

}
}
