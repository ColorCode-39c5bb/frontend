import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	ArticleCard.template = templateDocument.getElementById("article-card");
	customElements.define("article-card", ArticleCard);
});

export default class ArticleCard extends HTMLElement {
static get observedAttributes() {return [];}

constructor() { super(); 
	this.attachShadow({mode: "open"});
	this.data_default = {
		cover: "",
		title: "无数据",
		content: "无数据",
		tags: []
	};
	this.initShadowRoot();
	this.followup={
		cover: this.shadowRoot.getElementById("cover"),
		title: this.shadowRoot.getElementById("title"),
		preview: this.shadowRoot.getElementById("preview"),
		tag: this.shadowRoot.querySelector(".tag"),
		page_article: window.router.Ns_link_target.get("/article"),
	};

	this.addEventListener("click", ()=>{
		console.log(this.reactivedata);
		this.followup.page_article.reactivedata = this.reactivedata;
		window.router.push("/article");
	});
}
}
ArticleCard.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	
	const {cover, title, preview, tag} = this.followup;
	//cover.src = this.reactivedata.cover;
	title.textContent = rd.title;
	preview.textContent = rd.content.slice(0, 100);
	tag.reactiverender_for(rd.tags, HTMLElement.render_isConnected(function(tag){
		this.innerText = tag.tagname;
	}))
})