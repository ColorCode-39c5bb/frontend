import templatePromise from "../template.js";
import LoadAnimation from "./LoadAnimation.js";

export default function BackgroundImage(){
	const instance = Reflect.construct(HTMLElement, [], BackgroundImage);
	const loadAnimation1 = new LoadAnimation(),
		loadAnimation2 = new LoadAnimation(),
		loadAnimation3 = new LoadAnimation(),
		loadAnimation4 = new LoadAnimation(),
		loadAnimation5 = new LoadAnimation(),
		loadAnimation6 = new LoadAnimation(),
		loadAnimation7 = new LoadAnimation();

	// ['spinner', 'skeleton', 'pulse', 'grid', 'progress', 'image-shape', 'custom']
	loadAnimation1.setAttribute('type', 'grid');
	loadAnimation2.setAttribute('type', 'spinner');
	loadAnimation3.setAttribute('type', 'skeleton');
	loadAnimation4.setAttribute('type', 'pulse');
	loadAnimation5.setAttribute('type', 'progress');
	loadAnimation6.setAttribute('type', 'image-shape');
	loadAnimation7.setAttribute('type', 'custom');
	instance.append(loadAnimation1, loadAnimation2, loadAnimation3, loadAnimation4, loadAnimation5, loadAnimation6, loadAnimation7);
	
	// templatePromise.then(templateDocument => {
	// 	loadAnimation.remove();
	// 	instance.appendChild(templateDocument.getElementById("background-image").content.cloneNode(true));
	// });
	return instance;
}
Object.setPrototypeOf(BackgroundImage.prototype, HTMLElement.prototype);
BackgroundImage.observedAttributes = ["src"];
customElements.define("background-image", BackgroundImage);
