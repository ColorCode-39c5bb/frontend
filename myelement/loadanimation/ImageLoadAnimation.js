import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "load-animation-template.html").then((templateDocument)=>{
	ImageLoadAnimation.template = templateDocument.getElementById("image-load-animation");
	window.constructor_customelement.push(ImageLoadAnimation);
});
export default function ImageLoadAnimation(){
	const _this = Reflect.construct(HTMLElement, [], ImageLoadAnimation);
	_this.initShadowRoot(ImageLoadAnimation);
	_this.elements_todo={};
	_this.loaders = {};
	_this.loaderContainer = null;

	_this.setAttribute('type', "spinner");
	_this.loaderContainer = _this.shadowRoot.querySelector('.image-loader');
	_this.loaders = {
		spinner: _this.shadowRoot.querySelector('.loader-spinner'),
		skeleton: _this.shadowRoot.querySelector('.loader-skeleton'),
		pulse: _this.shadowRoot.querySelector('.loader-pulse'),
		grid: _this.shadowRoot.querySelector('.loader-grid'),
		progress: _this.shadowRoot.querySelector('.loader-progress'),
		'image-shape': _this.shadowRoot.querySelector('.loader-image-shape'),
		custom: _this.shadowRoot.querySelector('.loader-custom')
	};
	return _this;
}
Object.setPrototypeOf(ImageLoadAnimation.prototype, HTMLElement.prototype); Object.setPrototypeOf(ImageLoadAnimation, HTMLElement);
Object.defineProperty(ImageLoadAnimation, "observedAttributes", {get: function() {return ['type', 'size', 'color', 'radius']}});
ImageLoadAnimation.prototype.connectedCallback = function(){
	this.render();
}
ImageLoadAnimation.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	if (oldValue == newValue || !newValue) return;
	this.render();
}
ImageLoadAnimation.prototype.disconnectedCallback = function(){
}
ImageLoadAnimation.prototype.adoptedCallback = function(){
}
ImageLoadAnimation.prototype.render = function(){
	// 隐藏所有加载器
	Object.values(this.loaders).forEach(loader => loader.style.display = 'none');
	// 显示当前类型的加载器
	const currentLoader = this.loaders[this.getAttribute('type')];
	if (currentLoader) currentLoader.style.display = '';
	else this.loaders.spinner.style.display = ''; // 默认显示旋转加载器

	this.loaderContainer.style.setProperty('--loader-size', this.getAttribute('size'));
	this.loaderContainer.style.setProperty('--loader-radius', this.getAttribute('radius'));
	this.loaderContainer.style.setProperty('--spinner-color', this.getAttribute('color'));
	this.loaderContainer.style.setProperty('--grid-color', this.getAttribute('color'));
	this.loaderContainer.style.setProperty('--progress-color', this.getAttribute('color'));
}