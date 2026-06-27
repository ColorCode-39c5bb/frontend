import templatePromise from "../template.js";
templatePromise.then((templateDocument)=>{
	BackgroundImage.template = templateDocument.getElementById("background-image");
	customElements.define("background-image", BackgroundImage);
});

export default function BackgroundImage(){
	const instance = Reflect.construct(HTMLElement, [], BackgroundImage);
	instance.attachShadow({mode: "open"});
	instance.initShadowRoot();
	instance.image = null;
	instance.loadAnimation = null;
	instance.imageNaturalRadio = 1;
		
	let heightScrollable = 0;
	instance.resize = function(){
		const image = instance.image;
		if(image == null) return;
		const htmlClientRadio = document.documentElement.clientWidth/document.documentElement.clientHeight;
		if(htmlClientRadio>instance.imageNaturalRadio) {image.style.width = "100%"; image.style.height = "";}
		else {image.style.height = "100%"; image.style.width = "";}
		heightScrollable = document.documentElement.clientHeight - image.clientHeight;
	}
	let lastScrollY = 0;
	instance.scroll = function(){
		const image = instance.image;
		if(image == null) return;
		const scrollY = window.scrollY;
		image.style.filter = `blur(${Math.min(5, scrollY/100)}px)`;
		const deltaY = scrollY - lastScrollY;
		const top = instance.image.style.top.replace("px", "");
		image.style.top = `${Math.min(0, Math.max(heightScrollable, top-deltaY))}px`;
		lastScrollY = scrollY;
	}
	const fragment = BackgroundImage.template.content.cloneNode(true);
	const image = fragment.querySelector("img");
	instance.loadAnimation = fragment.querySelector("image-load-animation");
	
	image.addEventListener("load", function(){
		instance.loadAnimation.style.display = "none";
		this.style.display = "";
		instance.imageNaturalRadio = image.naturalWidth/image.naturalHeight;
		instance.resize();
	});
	instance.shadowRoot.appendChild(fragment);
	instance.image = image;
	instance.templatePromise = null;

	window.addEventListener("resize", instance.resize);
	window.addEventListener("scroll", instance.scroll);
	return instance;
}
Object.setPrototypeOf(BackgroundImage.prototype, HTMLElement.prototype);
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