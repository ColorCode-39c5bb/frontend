export default fetch("./template.html")
.then(response => response.text())
.then(text => new DOMParser().parseFromString(text, "text/html"));