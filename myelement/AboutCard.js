import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AboutCard.template = templateDocument.getElementById("about-card");
	window.constructor_withTemplate.push(AboutCard);
});
export default function AboutCard(){
	const _this = Reflect.construct(HTMLElement, [], AboutCard);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.els_tooperate={
		title: _this.shadowRoot.getElementById("title"),
		content: _this.shadowRoot.getElementById("content"),
	};
	return _this;
}
Object.setPrototypeOf(AboutCard.prototype, HTMLElement.prototype);
Object.setPrototypeOf(AboutCard, HTMLElement);
Object.defineProperty(AboutCard, "observedAttributes", {get: function() {return ["value"]}});
AboutCard.prototype.connectedCallback = function(){
}
AboutCard.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
AboutCard.prototype.disconnectedCallback = function(){
	
}
AboutCard.prototype.adoptedCallback = function(){
	
}
AboutCard.prototype.reactiverender = function(rd){
	const {title: el_title, content: el_content} = this.els_tooperate;
	el_title.innerHTML = rd.title;
	el_content.innerHTML = rd.content[0].text;
}
