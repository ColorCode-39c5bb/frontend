import templatePromise from "../template.js";
import ShadowElement from "./ShadowElement.js";

export default class NavigationPage extends ShadowElement {
static get observedAttributes() {return [];}

constructor() { super(); 
	templatePromise.then(templateDocument => {
		const documentFragment = templateDocument.getElementById("navigation-page").content.cloneNode(true);
		this.shadowRoot.appendChild(documentFragment);
	});
}

connectedCallback() {

}

attributeChangedCallback(name, oldValue, newValue) {
}
}
customElements.define("navigation-page", NavigationPage);