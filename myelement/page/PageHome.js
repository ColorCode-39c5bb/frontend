import {getTemplate} from "../../template.js";	
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageHome.template = templateDocument.getElementById("page-home");
	customElements.define(PageHome.template.id, PageHome);
});
export default function PageHome(){
	const _this = Reflect.construct(HTMLElement, [], PageHome);
	_this.attachShadow({mode: "open"});
	_this.data_default = {
		greeting: [
			"Welcome",
			"There is Not Violet in Garden"
		],
	};
	_this.initShadowRoot();

	_this.followup = {
		greeting: _this.shadowRoot.getElementById("greeting"),
	};

	return _this;
}
Object.setPrototypeOf(PageHome.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageHome, HTMLElement);
Object.defineProperty(PageHome, "observedAttributes", {get: function() {return ["value"]}});
PageHome.prototype.first_connected = function(){
	this.reactiverender(this.reactivedata);
}
PageHome.prototype.connectedCallback = HTMLElement.connected_withFirst(function(){
})
PageHome.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageHome.prototype.disconnectedCallback = function(){
	
}
PageHome.prototype.adoptedCallback = function(){
	
}
PageHome.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	const {greeting} = this.followup;
	greeting.reactiverender(rd.greeting);
})