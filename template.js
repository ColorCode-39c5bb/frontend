export default fetch("./myelement/template.html")
.then(response => {
	if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
	return response.text();
})
.then(text => new DOMParser().parseFromString(text, "text/html"));

const requestCache = new Map();

export function getTemplate(moduleImportMetaUrl, templateRelativePath){
	const templateURL = new URL(templateRelativePath, moduleImportMetaUrl).href;
	if(requestCache.has(templateURL)) return requestCache.get(templateURL);
	const templatePromise = fetch(templateURL).then(response => response.text())
		.then(text => new DOMParser().parseFromString(text, "text/html"))
		.then(templateDocument => {
			requestCache.set(templateURL, templateDocument);
			return templateDocument;
		});
	return templatePromise;
}