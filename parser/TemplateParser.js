import Parser from "./Parser.js";

export default function TemplateParser(){
	Parser.call(this);
}
Object.setPrototypeOf(TemplateParser.prototype, Parser.prototype);

TemplateParser.prototype.parse = function(text){
	const template = document.createElement("template");
	template.innerHTML = text.replace(/<template\b[^>]*>([\s\S]*?)<\/template>/i, "$1");
	return template;
}
