export default class LoadAnimation extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'color', 'radius'];
  }

  constructor() {
    super();
    
    const template = document.getElementById('load-animation');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    
    this.loaderContainer = this.querySelector('.image-loader');
    this.currentType = this.getAttribute('type') || 'spinner';
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

  connectedCallback() {
    this.renderLoader();
    this.setupAttributes();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'type') {
        this.currentType = newValue || 'spinner';
        this.renderLoader();
      } else {
        this.updateStyles();
      }
    }
  }

  renderLoader() {
    // 隐藏所有加载器
    Object.values(this.loaders).forEach(loader => {
      if (loader) loader.style.display = 'none';
    });

    // 显示当前类型的加载器
    const currentLoader = this.loaders[this.currentType];
    if (currentLoader) {
      currentLoader.style.display = '';
    } else {
      // 默认显示旋转加载器
      this.loaders.spinner.style.display = '';
    }
    
    this.updateStyles();
  }

  setupAttributes() {
    // 设置自定义属性
    if (this.hasAttribute('size')) {
      this.loaderContainer.style.setProperty('--loader-size', this.getAttribute('size'));
    }
    
    if (this.hasAttribute('radius')) {
      this.loaderContainer.style.setProperty('--loader-radius', this.getAttribute('radius'));
    }
    
    if (this.hasAttribute('color')) {
      this.loaderContainer.style.setProperty('--spinner-color', this.getAttribute('color'));
      this.loaderContainer.style.setProperty('--grid-color', this.getAttribute('color'));
      this.loaderContainer.style.setProperty('--progress-color', this.getAttribute('color'));
    }
  }

  updateStyles() {
    this.setupAttributes();
  }

  // 公共方法
  show() {
    this.style.display = 'inline-flex';
  }

  hide() {
    this.style.display = 'none';
  }

  changeType(type) {
    if (['spinner', 'skeleton', 'pulse', 'grid', 'progress', 'image-shape', 'custom'].includes(type)) {
      this.setAttribute('type', type);
    }
  }

  setSize(size) {
    this.setAttribute('size', size);
  }
}

// 注册自定义元素
if (!customElements.get('load-animation')) {
  customElements.define('load-animation', LoadAnimation);
}