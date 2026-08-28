import { getTemplate } from "../../template";
getTemplate(import.meta.url, "load-animation-template.html").then((templateDocument)=>{
	PageLoadAnimation.template = templateDocument.getElementById("page-load-animation");
	window.constructor_withTemplate.push(PageLoadAnimation);
});

export default function PageLoadAnimation() {
	const instance = Reflect.construct(HTMLElement, [], this.constructor);
	instance.attachShadow({mode: "open"});
	return instance;
}
Object.setPrototypeOf(PageLoadAnimation.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageLoadAnimation, HTMLElement);