import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AboutCard.template = templateDocument.getElementById("about-card");
	customElements.define(AboutCard.template.id, AboutCard);
});
export default function AboutCard(){
	const _this = Reflect.construct(HTMLElement, [], AboutCard);
	_this.attachShadow({mode: "open"});
	_this.data_default = {
		title: "无数据",
		content: [{
			text: "无数据"
		}]
	};
	_this.initShadowRoot();
	_this.followup={
		title: _this.shadowRoot.getElementById("title"),
		content: _this.shadowRoot.getElementById("content"),
	};
	return _this;
}
Object.setPrototypeOf(AboutCard.prototype, HTMLElement.prototype);
Object.setPrototypeOf(AboutCard, HTMLElement);
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
AboutCard.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	
	this.followup.title.innerHTML = rd.title;
	this.followup.content.innerHTML = rd.content[0].text;
})