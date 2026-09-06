import {getTemplate} from "../../template.js";
getTemplate(import.meta.url, "page.html").then((templateDocument)=>{
	PageAbout.template = templateDocument.getElementById("page-about");
	window.constructor_withTemplate.push(PageAbout);
});
export default function PageAbout(){
	const _this = Reflect.construct(HTMLElement, [], PageAbout);
	_this.attachShadow({mode: "open"});
	_this.initShadowRoot();
	_this.els_tooperate = {
		item: _this.querySelector("[slot='item']"),
	}
	_this.reactiverender([
	    {
	        id: 0,
	        title: '网站简介',
	        content: [{node: null, text: `
	            <div style="padding: 15px 0;">
	            <p>这是一跟随学习进度搭建的个人博客网站，分享一些学习过程中的笔记和问题。</p>
	            <p>&gt; <a ref="/blog/about" style="text-decoration: underline;">关于作者</a> &lt;</p>
	            </div>
	        `}]
	    },
	    {
	        id: 1,
	        title: '技术栈',
	        content: [{node: null, text: `
	            <div id="tech-stack" style="padding: 7px; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px">
	                <div id="tech-item">
	                    <i class="fa-brands fa-js"></i>
	                    <div>
	                        <h3>JavaScript</h3>
	                        <p>浏览器原生Web Component框架</p>
	                    </div>
	                </div>
	                <div id="tech-item">
	                    <i class="fa-brands fa-java"></i>
	                    <div>
	                        <h3>Spring</h3>
	                        <p>Java Spring开发框架，提供全面的编程和配置模型</p>
	                    </div>
	                </div>
	                <div id="tech-item">
	                    <i class="fa-solid fa-database"></i>
	                    <div>
	                        <h3>MySQL</h3>
	                        <p>MySQL数据库，提供灵活的数据存储方案</p>
	                    </div>
	                </div>
	                <div id="tech-item">
	                    <i class="fa-solid fa-code"></i>
	                    <div>
	                        <h3>VS Code</h3>
	                        <p>轻量级但功能强大的源代码编辑器，支持多种编程语言</p>
	                    </div>
	                </div>
	            </div>

	            <style>
	                #tech-item{
	                    display: flex;
	                    align-items: flex-start;
	                    gap: 15px;
	                    padding: 10px;
	                    border-radius: 6px;
						transition: all 0.1s ease-in-out;
	                }
	                #tech-item:hover{
	                    transform: translateY(-5px);
	                    box-shadow: var(--box-shadow-small);
	                }
	                #tech-item i{
	                    font-size: 200%;
	                }
	                #tech-item h3{
	                    margin: 0 0 5px 0;
	                }
	            </style>
	        `}],
	    },
	    {
	        id: 3,
	        title: '网站数据',
	        content:[{node: null, text:`
	            <div sytle="display: flex; flex-wrap: wrap;">
	                <div id="stat-item">
	                    <div class="stat-value">2025</div>
	                    <div>创立年份</div>
	                </div>
	                <div id="stat-item">
	                    <div class="stat-value">XXX</div>
	                    <div>总访问量</div>
	                </div>
	            </div>

	            <style>
	                #stat-item {
	                    flex: 1;
	                    text-align: center;
	                    padding: 20px;
	                    border-radius: 6px;
	                }
	                
	                .stat-value {
	                    font-size: 200%;
	                    font-weight: bold;
	                    margin-bottom: 5px;
	                }
	            </style>
	        `}]
	    }
	]);
	return _this;
}
PageAbout.tagname = "page-about";
Object.setPrototypeOf(PageAbout.prototype, HTMLElement.prototype);
Object.setPrototypeOf(PageAbout, HTMLElement);
Object.defineProperty(PageAbout.prototype, "observedAttributes", {get: function() {return ["value"]}});
PageAbout.prototype.connectedCallback = function(){
}
PageAbout.prototype.attributeChangedCallback = function(name, oldValue, newValue){
	
}
PageAbout.prototype.disconnectedCallback = function(){
	
}
PageAbout.prototype.adoptedCallback = function(){
	
}
PageAbout.prototype.reactiverender = function(rd){
	this.els_tooperate.item.reactiverender_for(rd);
}
