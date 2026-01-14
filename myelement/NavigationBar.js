import templatePromise from "../template.js";

export default class NavigationBar extends HTMLElement {
static get observedAttributes() {return ["currentPage"];}

constructor() { super(); 
	templatePromise.then(templateDocument => {
		this.attachShadow({mode: "open"});
		const documentFragment = templateDocument.getElementById("navigation-bar").content.cloneNode(true);
		this.container = documentFragment.getElementById("container");
		this.currentPageBar = documentFragment.getElementById("current-page-bar");
		this.switchButton = documentFragment.getElementById("switch-button");
		this.navigationPage = documentFragment.getElementById("navigation-page");

		this.switchButton.addEventListener("click", (e)=>{
			this.navigationPage.style.display = this.navigationPage.style.display == "none" ? "block" : "none";
		});
		this.navigationPage.filter = documentFragment.getElementById("filter");
		this.navigationPage.addEventListener("click", function(e){
			if(e.target == this.filter) this.style.display = "none";
		});
		
		this.shadowRoot.appendChild(documentFragment);

		window.addEventListener("mousemove", (e)=>{
			if(e.clientY < 33) this.container.style.top = "0px";
			if(e.clientY > 60) this.container.style.top = "-66px";
		});
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
customElements.define("navigation-bar", NavigationBar);