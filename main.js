import TemplateParser from "./parser/TemplateParser.js";
import InnerHTMLParser from "./parser/InnerHTMLParser.js";

export default {
	callbacks: {
		userConnectedCallback(){
			console.log("connected");
		}
	},
	parsers: {
		templateParser: new TemplateParser,
		innerHTMLParser: new InnerHTMLParser(),
	}
}