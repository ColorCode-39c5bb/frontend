globalThis.RemoteElement = function(){
	const instance = Reflect.construct(HTMLElement, [], RemoteElement);
	return instance;
}
Object.setPrototypeOf(RemoteElement.prototype, HTMLElement.prototype);


Object.defineProperty(RemoteElement, "requestCache", {value: new Map(), configurable: false, writable: false});
Object.defineProperty(RemoteElement, "observedAttributes", {get: function() {return ["elementurl"];}});


RemoteElement.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
	console.log(name, oldValue, newValue);
	switch(name){
		case "connectedcallback":
			const connectedCallback = user_config[newValue];
			if(typeof connectedCallback != "function") throw new Error(newValue + " not found in user_config");
			this.config.connectedCallback = connectedCallback; //如果单独设置则用属性
			break;
		default:
			break;
	}
}


const range = document.createRange();
RemoteElement.prototype.connectedCallback = function(){
	const elementurl = this.getAttribute("elementurl");
	let promise = RemoteElement.requestCache.get(elementurl+"");
	if(!promise) {
		promise = fetch(elementurl).then(response => response.json())
		.then(
			element => { range.selectNode(this);
				// RemoteElement.requestCache.push(remote.tagname+"");
				console.log(element);
				const template = range.createContextualFragment(element.text).firstElementChild;
				if(!element.scripturl) {
					this.appendChild(template.content.cloneNode(true));
					return;
				}
				import(element.scripturl).then(module => {
					if(module.default) {
						module.default.template = template;
						customElements.define(element.tagname, module.default);
					}
					else {
						throw new Error("组件 "+elementurl+" 未默认导出自定义组件构造函数");
					}
				});
			}, 
			error => {
				console.error("组件 "+elementurl+" 获取失败: ", error);
			}
		);
		RemoteElement.requestCache.set(elementurl+"", promise);
	}
}

customElements.define("remote-element", RemoteElement);