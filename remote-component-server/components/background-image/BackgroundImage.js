export default function BackgroundImage(){
	const instance = Reflect.construct(HTMLElement, [], BackgroundImage);
	instance.image = null;
	instance.loadAnimation = null;
	instance.attachShadow({mode: "open"});
	instance.initShadowStyle();

	let heightScrollable = 0;
	instance.resize = function(){
		const image = instance.image;
		if(image == null) return;
		const htmlClientRadio = document.documentElement.clientWidth/document.documentElement.clientHeight,
			imageNaturalRadio = image.naturalWidth/image.naturalHeight;
		if(htmlClientRadio>imageNaturalRadio) {image.style.width = "100%"; image.style.height = "";}
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
		instance.resize();
	});
	instance.shadowRoot.appendChild(fragment);
	instance.image = image;
	image.src = instance.getAttribute("src");
	instance.templatePromise = null;

	window.addEventListener("resize", instance.resize);
	window.addEventListener("scroll", instance.scroll);
	return instance;
}
Object.setPrototypeOf(BackgroundImage.prototype, HTMLElement.prototype);
Object.defineProperty(BackgroundImage, "observedAttributes", {get: function() {return ["src"];}});

BackgroundImage.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
	switch (name) {
		case "src":
			if(!(newValue&&oldValue)) return;
			this.image.src = newValue;
			this.image.style.display = "none";
			this.image.style.width = ""; this.image.style.height = "";
			this.loadAnimation.style.display = "";
			break;
	}
}