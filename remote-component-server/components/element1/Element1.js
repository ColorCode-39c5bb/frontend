export default function Element1(){
	const instance = Reflect.construct(HTMLElement, [], Element1);
	instance.attachShadow({mode: "open"});
	instance.initShadowStyle();

	const fragment = Element1.template.content.cloneNode(true);
	instance.shadowRoot.appendChild(fragment);
	return instance;
}
Object.defineProperty(Element1, "observedAttributes", {get: function() {return ["dataurl"];}});
Element1.prototype.reactToData = function(data){
	console.log("Element1 收到数据", data);
	this.data = data;
}
Element1.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
	switch (name) {
		case "dataurl":
			if(!newValue) return;
			fetch(newValue).then(response => response.json())
			.then(data => this.reactToData(data));
			break;
		default:
			break;
	}
}

Object.setPrototypeOf(Element1.prototype, HTMLElement.prototype);