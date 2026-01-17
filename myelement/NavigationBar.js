import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	NavigationBar.template = templateDocument.getElementById("navigation-bar");
	customElements.define("navigation-bar", NavigationBar);
});

export default class NavigationBar extends HTMLElement {
static get observedAttributes() {return ["currentPage"];}

constructor() { super(); 
	this.attachShadow({mode: "open"});
	const fragment = NavigationBar.template.content.cloneNode(true);
	this.container = fragment.getElementById("container");
	this.currentPageBar = fragment.getElementById("current-page-bar");
	this.switchButton = fragment.getElementById("switch-button");
	this.navigationPage = fragment.getElementById("navigation-page");

	this.switchButton.addEventListener("click", (e)=>{
		this.navigationPage.style.display = this.navigationPage.style.display == "none" ? "block" : "none";
	});
	this.navigationPage.filter = fragment.getElementById("filter");
	this.navigationPage.addEventListener("click", function(e){
		if(e.target == this.filter) this.style.display = "none";
	});
	
	this.shadowRoot.appendChild(fragment);

	window.addEventListener("mousemove", (e)=>{
		if(e.clientY < 33) this.container.style.top = "0px";
		if(e.clientY > 60) this.container.style.top = "-66px";
	});
}
	
attributeChangedCallback(name, oldValue, newValue) {
	switch (name) {
		case "currentPage":
			if(oldValue == null) break; //第一次加载
			this.currentPageBar.innerText = newValue;
			break;
	}
}
}