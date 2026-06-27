import { getTemplate } from "../../template";
getTemplate(import.meta.url, "load-animation-template.html").then((templateDocument)=>{
	PageLoadAnimation.template = templateDocument.getElementById("page-load-animation");
	customElements.define("page-load-animation", PageLoadAnimation);
});

export default function PageLoadAnimation() {
	const instance = Reflect.construct(HTMLElement, [], this.constructor);
	instance.attachShadow({mode: "open"});
	instance.shadowRoot.appendChild(PageLoadAnimation.template.content);
	return instance;
}
Object.setPrototypeOf(PageLoadAnimation.prototype, HTMLElement.prototype);