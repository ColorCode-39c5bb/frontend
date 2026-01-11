import MyButton from "./myelement/MyButton.js";
import BackgroundImage from "./myelement/BackgroundImage.js";
import LoadAnimation from "./myelement/LoadAnimation.js";
const shadowRoot = document.getElementById("shadow-root").attachShadow({mode: "open"});

const mybutton1 = new MyButton();
mybutton1.style.backgroundColor = "red";
mybutton1.innerText = "这是一个按钮";
shadowRoot.appendChild(mybutton1);

const backgroundImage1 = new BackgroundImage();
shadowRoot.appendChild(backgroundImage1);

document.getElementsByTagName("iframe")[0].addEventListener("load", function(){
	console.log(this.contentDocument.getElementsByTagName("p")[0].ownerDocument);
	shadowRoot.appendChild(document.importNode(this.contentDocument.getElementsByTagName("p")[0], true));
});
