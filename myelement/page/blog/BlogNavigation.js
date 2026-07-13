import {getTemplate} from "../../../template.js";
getTemplate(import.meta.url, "blog.html").then((templateDocument)=>{	
	BlogNavigation.template = templateDocument.getElementById("blog-navigation");
	customElements.define(BlogNavigation.template.id, BlogNavigation);
});
export default function BlogNavigation(){
	const _this = Reflect.construct(HTMLElement, [], BlogNavigation);
	_this.attachShadow({mode: "open"});
	_this.data_default = {
		nick: "[昵称]",
		signatures: ["[签名1]", "[签名2]"],
		profile: ""
	}
	_this.initShadowRoot();
	_this.followup={
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
BlogNavigation.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	const {profile, nick, signature} = this.followup;
	profile.innerText = rd.profile;
	nick.innerText = rd.nick;
	signature.reactiverender(rd.signatures);
})