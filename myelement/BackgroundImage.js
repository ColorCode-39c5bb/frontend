import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	BackgroundImage.template = templateDocument.getElementById("background-image");
	customElements.define("background-image", BackgroundImage);
});

export default function BackgroundImage(){
	const _this = Reflect.construct(HTMLElement, [], BackgroundImage);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.image = null;
	_this.loadAnimation = null;
	_this.imageNaturalRadio = 1;
		
	let heightScrollable = 0;
	_this.resize = function(){
		const image = _this.image;
		if(image == null) return;
		const htmlClientRadio = document.documentElement.clientWidth/document.documentElement.clientHeight;
		if(htmlClientRadio>_this.imageNaturalRadio) {image.style.width = "100%"; image.style.height = "";}
		else {image.style.height = "100%"; image.style.width = "";}
		heightScrollable = document.documentElement.clientHeight - image.clientHeight;
	}
	let lastScrollY = 0;
	_this.scroll = function(){
		const image = _this.image;
		if(image == null) return;
		const scrollY = window.scrollY;
		image.style.filter = `blur(${Math.min(5, scrollY/100)}px)`;
		const deltaY = scrollY - lastScrollY;
		const top = _this.image.style.top.replace("px", "");
		image.style.top = `${Math.min(0, Math.max(heightScrollable, top-deltaY))}px`;
		lastScrollY = scrollY;
	}
	const image = _this.shadowRoot.querySelector("img");
	_this.loadAnimation = _this.shadowRoot.querySelector("image-load-animation");
	
	image.addEventListener("load", function(){
		_this.loadAnimation.style.display = "none";
		this.style.display = "";
		_this.imageNaturalRadio = image.naturalWidth/image.naturalHeight;
		_this.resize();
	});
	_this.image = image;
	_this.templatePromise = null;

	window.addEventListener("resize", _this.resize);
	window.addEventListener("scroll", _this.scroll);
	return _this;
}
Object.setPrototypeOf(BackgroundImage.prototype, HTMLElement.prototype);
Object.setPrototypeOf(BackgroundImage, HTMLElement);
Object.defineProperty(BackgroundImage, "observedAttributes", {get: function() {return ["src"];}});

BackgroundImage.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
	// if(this.templatePromise != null) {
	// 	this.attributeChangedCallbackTimeout = setTimeout(this.attributeChangedCallback.bind(this, name, oldValue, newValue), 500);
	// 	return;
	// }
	switch (name) {
		case "src":
			this.image.src = newValue;
			this.image.style.display = "none";
			this.image.style.width = ""; this.image.style.height = "";
			this.loadAnimation.style.display = "";
			break;
	}
}