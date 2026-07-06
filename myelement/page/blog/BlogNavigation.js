import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{	
	BlogNavigation.template = templateDocument.getElementById("blog-navigation");
	customElements.define(BlogNavigation.tagname, BlogNavigation);
});
export default function BlogNavigation(){
	const _this = Reflect.construct(HTMLElement, [], BlogNavigation);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.shadowRoot.appendChild(BlogNavigation.template.content.cloneNode(true));
	_this.followup={
		profile: _this.shadowRoot.getElementById("profile"),
		nick: _this.shadowRoot.getElementById("nick"),
		signature: _this.shadowRoot.getElementById("signature"),
	};
	return _this;
}
BlogNavigation.tagname = "blog-navigation";
Object.setPrototypeOf(BlogNavigation.prototype, HTMLElement.prototype);
Object.defineProperty(BlogNavigation, "observedAttributes", {get: function() {return ["value"]}});
BlogNavigation.prototype.connectedCallback = function(){
	this.followup.signature.reactivedata = [];
}
BlogNavigation.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogNavigation.prototype.disconnectedCallback = function(){
	
}
BlogNavigation.prototype.adoptedCallback = function(){
	
}
BlogNavigation.prototype.reactiverender = function(){
	this.followup.profile.innerText = this.reactivedata.profile;
	this.followup.nick.innerText = this.reactivedata.nick;
	this.followup.signature.reactivedata = this.reactivedata.signatures.map((item)=>item.signature);
}