import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	ArticleCard.template = templateDocument.getElementById("article-card");
	window.constructor_withTemplate.push(ArticleCard);
});

export default class ArticleCard extends HTMLElement {
static get observedAttributes() {return [];}

	constructor() { super(); 
		this.attachShadow({mode: "open"});
		this.initShadowRoot();
		this.els_tooperate={
			cover: this.shadowRoot.getElementById("cover"),
			title: this.shadowRoot.getElementById("title"),
			preview: this.shadowRoot.getElementById("preview"),
			tag: this.shadowRoot.querySelector(".tag"),
		};
	}

	reactiverender(rd){
		const {cover, title, preview, tag} = this.els_tooperate;
		//cover.src = this.reactivedata.cover;
		title.textContent = rd.title;
		preview.textContent = rd.content.slice(0, 100);
		tag.reactiverender_for(rd.tags, function(tag){
			this.innerText = tag.tagname;
		})
	}

	connectedCallback(){
	}
}
