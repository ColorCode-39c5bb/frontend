import templatePromise from "../template.js";

export default class ArticleCard extends HTMLElement {
static get observedAttributes() {return [];}

constructor() {
	super(); this.attachShadow({mode: "open"});
	templatePromise.then(templateDocument => {
		const documentFragment = templateDocument.getElementById("article-card").content.cloneNode(true);
		this.shadowRoot.appendChild(documentFragment);
	});
}
}
customElements.define("article-card", ArticleCard);