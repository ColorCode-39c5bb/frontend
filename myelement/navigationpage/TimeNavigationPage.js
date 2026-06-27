import { getTemplate } from "../../template.js";
getTemplate(import.meta.url, "navigation-page-template.html").then((templateDocument)=>{
	TimeNavigationPage.template = templateDocument.getElementById("time-navigation-page");
	customElements.define("time-navigation-page", TimeNavigationPage);
});

export default function TimeNavigationPage(){
	const instance = Reflect.construct(HTMLElement, [], TimeNavigationPage);
	instance.attachShadow({mode: "open"}); instance.initShadowRoot();
	const fragment = TimeNavigationPage.template.content;
	instance.canvas = fragment.querySelector("canvas");
	instance.canvas.width = window.innerWidth; instance.canvas.height = window.innerHeight;
	instance.canvasRender();
	window.addEventListener("resize", instance.resize.bind(instance));
	instance.shadowRoot.appendChild(fragment);
	return instance;
}
Object.setPrototypeOf(TimeNavigationPage.prototype, HTMLElement.prototype);

TimeNavigationPage.prototype.resize = function() {
	this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight;
}

TimeNavigationPage.prototype.canvasRender = function() {
	const null0 = new Layer();

	const ctx = this.canvas.getContext("2d");
	ctx.arc(this.canvas.width/2,-1500+this.canvas.height/4,1500, 0, 2*Math.PI);
	ctx.arc(this.canvas.width/2,1500+this.canvas.height-this.canvas.height/4,1500, 0, 2*Math.PI);
	ctx.strokeStyle = "red";
	ctx.stroke();
}


function Layer(){
	this.children = [];
	this.position = [0, 0];
}
