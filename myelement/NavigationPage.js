import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	NavigationPage.template = templateDocument.getElementById("navigation-page");
	customElements.define("navigation-page", NavigationPage);
});

export default class NavigationPage extends HTMLElement{
static get observedAttributes() {return [];}

constructor() { super();
	this.attachShadow({mode: "open"});
	this.initShadowStyle();
	const fragment = NavigationPage.template.content.cloneNode(true);
	this.shadowRoot.appendChild(fragment);
}

connectedCallback() {

}

attributeChangedCallback(name, oldValue, newValue) {
}
}