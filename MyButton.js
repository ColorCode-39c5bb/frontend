export default function MyButton(){
	// return HTMLElement.call(this);
	return Reflect.construct(HTMLElement, [], MyButton);
};
Object.setPrototypeOf(MyButton.prototype, HTMLElement.prototype);
// Object.setPrototypeOf(MyButton, HTMLElement); //静态字段不继承

MyButton.prototype.connectedCallback = function() {
  console.log("自定义元素添加至页面。");
}

MyButton.prototype.disconnectedCallback = function() {
  console.log("自定义元素从页面中移除。");
}

MyButton.prototype.adoptedCallback = function() {
  console.log("自定义元素移动至新页面。");
}

MyButton.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
  console.log(`属性 ${name} 已变更。`);
}

MyButton.observedAttributes = ["color", "size"];

customElements.define("my-button", MyButton);
