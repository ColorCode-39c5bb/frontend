import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "navigation-page-template.html").then((templateDocument)=>{
	NavigationPage.template = templateDocument.getElementById("navigation-page");
	customElements.define("navigation-page", NavigationPage);
});

export default class NavigationPage extends HTMLElement{
static get observedAttributes() {return [];}

constructor() { super();
	this.attachShadow({mode: "open"});
	this.initShadowRoot();
}

connectedCallback() {
}

attributeChangedCallback(name, oldValue, newValue) {
}
}