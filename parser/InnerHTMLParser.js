import Parser from "./Parser.js";

export default function InnerHTMLParser(){
	Parser.call(this);
}
Object.setPrototypeOf(InnerHTMLParser.prototype, Parser.prototype);

InnerHTMLParser.prototype.parse = function(text){
	const documentFragment = document.createDocumentFragment();
	const div = document.createElement("div");
	div.innerHTML = text;
	while(div.firstChild) {
		documentFragment.appendChild(div.firstChild);
	}
	return documentFragment;
}