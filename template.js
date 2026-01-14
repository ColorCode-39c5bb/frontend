export default fetch("./myelement/template.html")
.then(response => {
	if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	return response.text();
})
.then(text => new DOMParser().parseFromString(text, "text/html"));

const templatePromises = {};

export function getTemplate(moduleImportMetaUrl, templateRelativePath){
	const templateURL = new URL(templateRelativePath, moduleImportMetaUrl).href;
	if(templatePromises[templateURL]) return templatePromises[templateURL];
	const templatePromise = fetch(templateURL)
		.then(response => response.text())
		.then(text => new DOMParser().parseFromString(text, "text/html"))
		.then(document => {
			templatePromises[templateURL] = templatePromise;
			return document;
		});
	return templatePromise;
}