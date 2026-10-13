import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	ArticleCard.template = templateDocument.getElementById("article-card");
	window.constructor_customelement.push(ArticleCard);
});
export default function ArticleCard(){
	const _this = Reflect.construct(HTMLElement, [], ArticleCard);
	_this.initShadowRoot(ArticleCard);
	_this.elements_todo={
		cover: _this.shadowRoot.getElementById("cover"),
		title: _this.shadowRoot.getElementById("title"),
		preview: _this.shadowRoot.getElementById("preview"),
		tag: _this.shadowRoot.querySelector(".tag"),
	};
	return _this;
}
Object.setPrototypeOf(ArticleCard.prototype, HTMLElement.prototype); Object.setPrototypeOf(ArticleCard, HTMLElement);
Object.defineProperty(ArticleCard, "observedAttributes", {get: function() {return []}});
ArticleCard.prototype.connectedCallback = function(){
}
ArticleCard.prototype.attributeChangedCallback = function(name, oldValue, newValue){
}
ArticleCard.prototype.disconnectedCallback = function(){
}
ArticleCard.prototype.adoptedCallback = function(){
}
ArticleCard.prototype.reactiverender = function(delta){
	const {cover, title, preview, tag} = this.elements_todo; const rd = this.reactivedata.datavalue;
	//cover.src = this.reactivedata.cover;
	title.textContent = rd.title;
	preview.textContent = rd.content.slice(0, 100);
	tag.reactiverender_for(rd.tags, function(tag){
		this.innerText = tag.tagname;
	})
}

ArticleCard.RDCLASS = function(){
	this.construction = {
		isprimary: false,
		data_default: {
			cover: "封面URL",
			title: "标题",
			content: "内容",
		},
		tags: {data_default: [{tagname: "无标签"}]}
	};
	return this;
}