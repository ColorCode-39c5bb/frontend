import { getTemplate } from "../../template";
getTemplate(import.meta.url, "load-animation-template.html").then((templateDocument)=>{
	PageLoadAnimation.template = templateDocument.getElementById("page-load-animation");
	window.constructor_customelement.push(PageLoadAnimation);
});

export default function PageLoadAnimation() {
	const _this = Reflect.construct(HTMLElement, [], this.constructor);
	_this.initShadowRoot(PageLoadAnimation);
	_this.elements_todo={};
	return _this;
}
Object.setPrototypeOf(PageLoadAnimation.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageLoadAnimation, HTMLElement);
PageLoadAnimation.prototype.connectedCallback = function(){
}