export default class ImageLoadAnimation extends HTMLElement {
static get observedAttributes() {
	return ['type', 'size', 'color', 'radius'];
}

constructor() { super();
	this.loaders = {};
	this.loaderContainer = null;

	this.setAttribute('type', "spinner");
	this.appendChild(ImageLoadAnimation.template.content.cloneNode(true));
	this.loaderContainer = this.querySelector('.image-loader');
	this.loaders = {
		spinner: this.querySelector('.loader-spinner'),
		skeleton: this.querySelector('.loader-skeleton'),
		pulse: this.querySelector('.loader-pulse'),
		grid: this.querySelector('.loader-grid'),
		progress: this.querySelector('.loader-progress'),
		'image-shape': this.querySelector('.loader-image-shape'),
		custom: this.querySelector('.loader-custom')
	};
}

attributeChangedCallback(name, oldValue, newValue) {
	if (oldValue == newValue || !newValue) return;
	this.render();
}

connectedCallback() {
	this.render();
}

render() {
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
}