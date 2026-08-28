import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "navigation-page-template.html").then((templateDocument)=>{
	NavigationPage.template = templateDocument.getElementById("navigation-page");
	window.constructor_withTemplate.push(NavigationPage);
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