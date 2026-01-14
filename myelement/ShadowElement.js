export default class ShadowElement extends HTMLElement {
	constructor() { super();
		this.attachShadow({mode: "open"});
		const defaultStyleSheet = new CSSStyleSheet();
		defaultStyleSheet.insertRule(`
			*{
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
		`);
		this.shadowRoot.adoptedStyleSheets.push(defaultStyleSheet);
	}
}