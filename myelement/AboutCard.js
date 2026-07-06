import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AboutCard.template = templateDocument.getElementById("about-card");
	customElements.define(AboutCard.tagname, AboutCard);
});
export default function AboutCard(){
	const _this = Reflect.construct(HTMLElement, [], AboutCard);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.shadowRoot.appendChild(AboutCard.template.content.cloneNode(true));
	_this.followup={
		title: _this.shadowRoot.getElementById("title"),
		content: _this.shadowRoot.getElementById("content"),
	};
	return _this;
}
AboutCard.tagname = "about-card";
Object.setPrototypeOf(AboutCard.prototype, HTMLElement.prototype);
Object.defineProperty(AboutCard, "observedAttributes", {get: function() {return ["value"]}});
AboutCard.prototype.connectedCallback = function(){
	//this.reactiverender?.call(this);
}
AboutCard.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
AboutCard.prototype.disconnectedCallback = function(){
	
}
AboutCard.prototype.adoptedCallback = function(){
	
}
AboutCard.prototype.reactiverender = function(){
	this.followup.title.innerHTML = this.reactivedata.title;
	this.followup.content.innerHTML = this.reactivedata.content[0].text;
}