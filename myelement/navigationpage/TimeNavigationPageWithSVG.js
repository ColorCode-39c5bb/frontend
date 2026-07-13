import { getTemplate } from "../../template.js";
getTemplate(import.meta.url, "navigation-page-template.html").then((templateDocument)=>{
	TimeNavigationPageWithSVG.template = templateDocument.getElementById("time-navigation-page-with-svg");
	customElements.define("time-navigation-page-with-svg", TimeNavigationPageWithSVG);
});

export default function TimeNavigationPageWithSVG(){
	const instance = Reflect.construct(HTMLElement, [], TimeNavigationPageWithSVG);
	const fragment = TimeNavigationPageWithSVG.template.content;
	instance.svg = fragment.querySelector("svg");
	instance.svg.setAttribute("width", window.innerWidth); instance.svg.setAttribute("height", window.innerHeight);
	instance.itemContainer =fragment.querySelector("#navigation-item-container");
	instance.container = fragment.getElementById("container");

	instance.svg.group = instance.svg.querySelector("g");
	const [edge, hour, minute, second] = instance.svg.group.querySelectorAll("circle");
	const radius = edge.getAttribute("r");
	const cy = -radius - instance.svg.getAttribute("height")/2 + instance.svg.getAttribute("height")/4;
	instance.svg.group.style.transform = `translateY(${cy}px)`;
	second.style.setProperty("--dasharray", Math.PI*second.getAttribute("r")*2/24);
	minute.style.setProperty("--dasharray", Math.PI*minute.getAttribute("r")*2/24);
	hour.style.setProperty("--dasharray", Math.PI*hour.getAttribute("r")*2/24);

	(function() {
		const centerX = instance.svg.getAttribute("width")/2;
		const centerY = instance.svg.getAttribute("height")/2;
		const radius = hour.getAttribute("r")-0+8;

		const texts = ['Ⅻ', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ'];
		const total = texts.length;
		const markersGroup = instance.svg.group.querySelector('#hour-markers');
		texts.forEach((text, index) => {
			// 计算每个文字的角度位置（12点钟方向为起点）
			const angle = (index * 360 / total - 90) * Math.PI / 180;
			// 计算坐标
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			// 创建text元素
			const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			textElem.setAttribute('x', x);
			textElem.setAttribute('y', y);
			textElem.setAttribute('text-anchor', 'middle');
			textElem.setAttribute('dominant-baseline', 'bottom');
			textElem.setAttribute('font-size', '50');
			textElem.setAttribute('fill', 'red');
			// 调整文字方向使其径向朝外
			textElem.setAttribute('transform', `rotate(${index * 30}, ${x}, ${y})`);
			textElem.textContent = text;
			markersGroup.appendChild(textElem);
		});
	})();

	instance.svg.groupCopy = instance.svg.group.cloneNode(true);
	instance.svg.groupCopy.style.transform = `translateY(${-cy}px) scale(-1)`;
	instance.svg.appendChild(instance.svg.groupCopy);

	instance.attachShadow({mode: "open"});
	instance.initShadowRoot();
	instance.shadowRoot.appendChild(fragment);
	instance.itemContainer.slotted = instance.shadowRoot.querySelector("slot").assignedNodes();
	return instance;
}
Object.setPrototypeOf(TimeNavigationPageWithSVG.prototype, HTMLElement.prototype);
Object.setPrototypeOf(TimeNavigationPageWithSVG, HTMLElement);

TimeNavigationPageWithSVG.prototype.connectedCallback = function() {
	const interval = 1/45*1000;
	let lastTime = 0;
	window.addEventListener("mousemove", (e)=>{
		if(Date.now()-lastTime < interval) return;
		const angle = Math.atan2(e.clientY - window.innerHeight/2, e.clientX - window.innerWidth/2);

		this.itemContainer.slotted.forEach((item)=>item.style.transform = `rotate(${-angle}rad)`);
		this.container.style.transform = `rotate(${angle}rad)`;
		[this.svg.group, this.svg.groupCopy].forEach((g)=>{
			const [edge, hour, minute, second] = g.children;
			hour.style.transform = `rotate(${angle}rad)`;
			minute.style.transform = `rotate(${angle*60}rad)`;
			second.style.transform = `rotate(${angle*3600}rad)`;
		});
		lastTime = Date.now();
	});
	// window.addEventListener("resize", (e)=>{
	// 	this.svg.setAttribute("width", window.innerWidth); 
	// 	this.svg.setAttribute("height", window.innerHeight);
	// 	const centerX = window.innerWidth/2;
	// 	const centerY = window.innerHeight/2;
	// 	const [edge, hour] = this.svg.group.children;
	// 	const radius = hour.children[1].getAttribute("r")-0+8;
	// 	const markersGroup = hour.children[0];
	// 	const total = markersGroup.children.length;
	// 	[this.svg.group, this.svg.groupCopy].forEach((g)=>{
	// 		g.querySelector('#hour-markers').childNodes.forEach((marker, index) => {
	// 			const angle = (index * 360 / total - 90) * Math.PI / 180;
	// 			const x = centerX + radius * Math.cos(angle);
	// 			const y = centerY + radius * Math.sin(angle);
	// 			marker.setAttribute("x", x); marker.setAttribute("y", y);
	// 			marker.setAttribute('transform', `rotate(${index * 30}, ${x}, ${y})`);
	// 		});
	// 	});
	// });
	window.addEventListener("wheel", (e)=>{

	});
}