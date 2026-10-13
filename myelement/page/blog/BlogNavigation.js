import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{
	BlogNavigation.template = templateDocument.getElementById("blog-navigation");
	window.constructor_customelement.push(BlogNavigation);
});
export default function BlogNavigation(){
	const _this = Reflect.construct(HTMLElement, [], BlogNavigation);
	_this.initShadowRoot(BlogNavigation);
	_this.elements_todo={
		avatar: _this.shadowRoot.getElementById("avatar"),
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
BlogNavigation.prototype.reactiverender = function(delta){
	const {avatar: el_avatar, nick: el_nick, signature: el_signature} = this.elements_todo; const rd = this.reactivedata.datavalue;
	el_avatar.innerText = rd.profile.avatar;
	el_nick.innerText = rd.nick;
	el_signature.reactiverender(rd.profile.signatures || []);
}
