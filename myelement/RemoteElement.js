import user_config from "../main.js"; //用户定义生命周期回调的地方
import TemplateParser from "../parser/TemplateParser.js";
import InnerHTMLParser from "../parser/InnerHTMLParser.js";

export default function RemoteElement(){
	const instance = Reflect.construct(HTMLElement, [], RemoteElement);
	console.log(user_config);
	Object.defineProperty(instance, "reactiveData", {
		value: user_config,
		configurable: false,
		writable: false,
	});
	// TODO: 这里实现reactiveData的响应式
	instance.attachShadow({mode: "open"});
	const defaultStyleSheet = new CSSStyleSheet();
	defaultStyleSheet.insertRule(`
		*{
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
	`);
	instance.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
	return instance;
}
Object.setPrototypeOf(RemoteElement.prototype, HTMLElement.prototype);


Object.defineProperty(RemoteElement, "templateCache", { //template cache
	value: new Map(),
	configurable: false,
	writable: false,
});
Object.defineProperty(RemoteElement, "observedAttributes", {get: function() {return [
	"url", "version", "dataurl", 
	"userconnectedcallback",
	"templateparser", "innerhtmlparser"
];}});

RemoteElement.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
	console.log(name, oldValue, newValue);
	switch(name){
		case "userconnectedcallback":
			const userConnectedCallback = this.reactiveData.callbacks[newValue];
			if(typeof userConnectedCallback != "function") break;
			this.reactiveData.callbacks.userConnectedCallback = userConnectedCallback;
			break;
		case "templateparser":
			const templateParser = this.reactiveData.parsers.templateParser;
			if(!(templateParser instanceof TemplateParser)) throw new Error("Not instance TemplateParser");
			break;
		case "innerhtmlparser":
			const innerHTMLParser = this.reactiveData.parsers.innerHTMLParser;
			if(!(innerHTMLParser instanceof InnerHTMLParser)) throw new Error("Not instance InnerHTMLParser");
			break;
		default:
			break;
	}
}
RemoteElement.prototype.connectedCallback = function(){
	const userConnectedCallback = this.reactiveData.callbacks.userConnectedCallback;
	if(typeof userConnectedCallback != "function") throw new Error("userconnectedcallback must be a function");
	userConnectedCallback.call(this);
	this.render();
}


RemoteElement.prototype.render = function(){
	if(this.getAttribute("url") == null || this.getAttribute("version") == null) return;
	const url = `${this.getAttribute("url")}?version=${this.getAttribute("version")}`;
	
fetch(url).then(response => response.json())
.then(element => {
	const cache = RemoteElement.templateCache;
	switch(element.type){
	case "innerHTML":
		const documentFragment = this.reactiveData.parsers.innerHTMLParser.parse(element.text);
		this.shadowRoot.appendChild(documentFragment);
		break;
	case "template":
	 	let template = cache.get(url+"");
		if(template == null) {
			template = this.reactiveData.parsers.templateParser.parse(element.text);
			template.id = url;
			cache.set(url+"", template);
		}
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		break;
	case "html":
		this.appendChild(document.createElement("iframe")).srcdoc = element.text; //iframe本身就是隔离的，所以不加到shadowRoot
		break;
	default:
		throw new Error(`type ${element.type} not supported`);
	}
	if(element.scripturl != null) {
		const script = document.createElement("script");
		script.src = element.scripturl;
		script.type = "module";
		this.shadowRoot.appendChild(script);
	}
})
.then(() => {
	if(this.getAttribute("dataurl") != null) {
		fetch(this.getAttribute("dataurl"))
		.then(response => response.json())
		.then(data => {
			this.reactiveData.data = data;
		});
	}
});
}

customElements.define("remote-element", RemoteElement);