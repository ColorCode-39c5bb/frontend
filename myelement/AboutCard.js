import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AboutCard.template = templateDocument.getElementById("about-card");
	window.constructor_customelement.push(AboutCard);
});
export default function AboutCard(){
	const _this = Reflect.construct(HTMLElement, [], AboutCard);
	_this.initShadowRoot(AboutCard);
	_this.elements_todo={
		title: _this.shadowRoot.getElementById("title"),
		content: _this.shadowRoot.getElementById("content"),
	};
	return _this;
}
Object.setPrototypeOf(AboutCard.prototype, HTMLElement.prototype); Object.setPrototypeOf(AboutCard, HTMLElement);
Object.defineProperty(AboutCard, "observedAttributes", {get: function() {return []}});
AboutCard.prototype.connectedCallback = function(){
}
AboutCard.prototype.attributeChangedCallback = function(name, oldValue, newValue){
}
AboutCard.prototype.disconnectedCallback = function(){
}
AboutCard.prototype.adoptedCallback = function(){
}
AboutCard.prototype.reactiverender = function(delta){
	const {title: el_title, content: el_content} = this.elements_todo; const rd = this.reactivedata.datavalue;
	el_title.innerHTML = rd.title;
	el_content.innerHTML = rd.content[0].text;
}

AboutCard.RDCLASS = function(){
	this.construction = {
		data_default: {
			title: "标题",
			content: [{text: "内容"}]
		}
	};
	return this;
}