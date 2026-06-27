import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	TextTyping.template = templateDocument.getElementById("text-typing");
	customElements.define(TextTyping.tagname, TextTyping);
});
export default function TextTyping(){
	const _this = Reflect.construct(HTMLElement, [], TextTyping);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	
	_this.input_interval = null, _this.cursor_interval = null;
	
	const fragment = TextTyping.template.content.cloneNode(true);
	//一系列初始化操作
	_this.input = fragment.getElementById("input");
	_this.cursor = fragment.getElementById("cursor");
	_this.shadowRoot.appendChild(fragment);
	return _this;
}
TextTyping.tagname = "text-typing";
Object.setPrototypeOf(TextTyping.prototype, HTMLElement.prototype);
Object.defineProperty(TextTyping.prototype, "observedAttributes", {get: function() {return ["value"]}});
TextTyping.prototype.connectedCallback = function(){
	let textindex = 0, charindex = 0;
	this.input_interval = setInterval(() => {
		if(!this.reactivedata?.length) return;
		const currenttext = this.reactivedata[textindex];
		if(charindex>currenttext.length){
			textindex++; charindex=0;
			if(!this.reactivedata[textindex]){
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
}
TextTyping.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
TextTyping.prototype.disconnectedCallback = function(){
	clearInterval(this.input_interval);
	clearInterval(this.cursor_interval);
}
TextTyping.prototype.adoptedCallback = function(){
	
}