import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	TextTyping.template = templateDocument.getElementById("text-typing");
	customElements.define(TextTyping.template.id, TextTyping);
});
export default function TextTyping(){
	const _this = Reflect.construct(HTMLElement, [], TextTyping);
	_this.attachShadow({mode: "open"});
	_this.data_default = [
		"TextTyping: No Text"
	];
	_this.initShadowRoot();
	
	_this.input_interval = null, _this.cursor_interval = null;
	//一系列初始化操作
	_this.input = _this.shadowRoot.getElementById("input");
	_this.cursor = _this.shadowRoot.getElementById("cursor");
	return _this;
}
Object.setPrototypeOf(TextTyping.prototype, HTMLElement.prototype);
Object.setPrototypeOf(TextTyping, HTMLElement);
Object.defineProperty(TextTyping, "observedAttributes", {get: function() {return ["value"]}});
TextTyping.prototype.connectedCallback = function(){

}
TextTyping.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
TextTyping.prototype.disconnectedCallback = function(){
}
TextTyping.prototype.adoptedCallback = function(){
	
}

TextTyping.prototype.reactiverender = HTMLElement.render_isConnected(function(rd){
	clearInterval(this.input_interval);
	clearInterval(this.cursor_interval);

	let textindex = 0, charindex = 0;
	this.input_interval = setInterval(() => {
		if(!rd?.length) return;
		const currenttext = rd[textindex];
		if(charindex>currenttext.length){
			textindex++; charindex=0;
			if(!rd[textindex]){
				textindex=0;
			}
		}
		this.input.innerText = currenttext.slice(0, charindex);
		charindex++;
	}, this.getAttribute("typeinterval"));
	let cursorblink = true;
	this.cursor_interval = setInterval(() => {
		this.cursor.innerText = cursorblink ? "_" : "";
		cursorblink = !cursorblink;
	}, 513);
})