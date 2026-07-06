import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	RouterElement.template = templateDocument.getElementById("router-element");
	customElements.define(RouterElement.tagname, RouterElement);
});
export default function RouterElement(){
	const _this = Reflect.construct(HTMLElement, [], RouterElement);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.shadowRoot.appendChild(RouterElement.template.content.cloneNode(true));
	
	_this.followup={
		
	};
	return _this;
}
RouterElement.tagname = "router-element";
Object.setPrototypeOf(RouterElement.prototype, HTMLElement.prototype);
Object.defineProperty(RouterElement, "observedAttributes", {get: function() {return ["value"]}});
RouterElement.prototype.connectedCallback = function(){
	
}
RouterElement.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
RouterElement.prototype.disconnectedCallback = function(){
	
}
RouterElement.prototype.adoptedCallback = function(){
	
}