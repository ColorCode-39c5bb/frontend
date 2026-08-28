import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogNavigation.template = templateDocument.getElementById("blog-navigation");
	window.constructor_withTemplate.push(BlogNavigation);
});
export default function BlogNavigation(){
	const _this = Reflect.construct(HTMLElement, [], BlogNavigation);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.els_tooperate={
		profile: _this.shadowRoot.getElementById("profile"),
		nick: _this.shadowRoot.getElementById("nick"),
		signature: _this.shadowRoot.getElementById("signature"),
	};
	return _this;
}
Object.setPrototypeOf(BlogNavigation.prototype, HTMLElement.prototype);
Object.setPrototypeOf(BlogNavigation, HTMLElement);
Object.defineProperty(BlogNavigation, "observedAttributes", {get: function() {return ["value"]}});
BlogNavigation.prototype.connectedCallback = function(){
}
BlogNavigation.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
BlogNavigation.prototype.disconnectedCallback = function(){
	
}
BlogNavigation.prototype.adoptedCallback = function(){
	
}
BlogNavigation.prototype.reactiverender = function(rd){
	const {profile, nick, signature} = this.els_tooperate;
	profile.innerText = rd.profile;
	nick.innerText = rd.nick;
	signature.reactiverender(rd.signatures);
}
