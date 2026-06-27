import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	AppMain.template = templateDocument.getElementById("app-main");
	customElements.define(AppMain.tagname, AppMain);
});
export default function AppMain(){
	const _this = Reflect.construct(HTMLElement, [], AppMain);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	const fragment = AppMain.template.content.cloneNode(true);
	//一系列初始化操作
	
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
AppMain.tagname = "app-main";
Object.setPrototypeOf(AppMain.prototype, HTMLElement.prototype);
Object.defineProperty(AppMain.prototype, "observedAttributes", {get: function() {return ["value"]}});
AppMain.prototype.connectedCallback = function(){
	
}
AppMain.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
AppMain.prototype.disconnectedCallback = function(){
	
}
AppMain.prototype.adoptedCallback = function(){
	
}