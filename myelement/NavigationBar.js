import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	NavigationBar.template = templateDocument.getElementById("navigation-bar");
	customElements.define("navigation-bar", NavigationBar);
});

export default class NavigationBar extends HTMLElement {
static get observedAttributes() {return ["currentPage"];}

constructor() { super(); 
	this.attachShadow({mode: "open"});
	this.initShadowRoot();
	const fragment = NavigationBar.template.content.cloneNode(true);
	this.currentPageBar = fragment.getElementById("current-page-bar");
	this.switchButton = fragment.getElementById("page-button");
	this.navigationpage_container = fragment.getElementById("navigation-page");
	this.navigationpage_container.filter = fragment.getElementById("filter");

	this.shadowRoot.appendChild(fragment);
}

	
attributeChangedCallback(name, oldValue, newValue) {
	switch (name) {
		case "currentPage":
			if(oldValue == null) break; //第一次加载
			this.currentPageBar.innerText = newValue;
			break;
	}
}

connectedCallback() {
	this.switchButton.addEventListener("click", (e)=>{
		this.navigationpage_container.style.display = this.navigationpage_container.style.display == "none" ? "block" : "none";
	});
	this.navigationpage_container.addEventListener("click", function(e){
		if(e.target == this.filter) this.style.display = "none";
	});
	window.addEventListener("mousemove", (e)=>{
		if(e.clientY < 33) this.style.top = "0px";
		if(e.clientY > 60) this.style.top = "-66px";
	});	
	window.addEventListener("routechange", (e)=>{
		this.currentPageBar.innerText = window.history.state.currentPage;
		this.navigationpage_container.style.display = "none";
	});
}
}
