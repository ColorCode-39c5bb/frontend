import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	ArticleCard.template = templateDocument.getElementById("article-card");
	customElements.define("article-card", ArticleCard);
});

export default class ArticleCard extends HTMLElement {
static get observedAttributes() {return [];}

constructor() {
	super(); this.attachShadow({mode: "open"});
	const fragment = ArticleCard.template.content.cloneNode(true);
	this.shadowRoot.appendChild(fragment);
}
}