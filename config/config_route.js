import PageHome from "../myelement/page/PageHome.js";
import PageAbout from "../myelement/page/PageAbout.js";
import PageBlog from "../myelement/page/PageBlog.js";
import BlogAbout from "../myelement/page/blog/BlogAbout.js";
import BlogHome from "../myelement/page/blog/BlogHome.js";
import PageArticle from "../myelement/page/PageArticle.js"

export default [
{
	path: "/",
	state: {currentPage: "Home"},
},
{
	path: "/about",
	state: {currentPage: "About"},
},
{
	path: "/blog",
	state: {currentPage: "Blog"},
	call: function(){
		window.router.replace("/blog/home");
	},
	routes: [
		{
			path: "/blog/home",
			state: {currentPage: "BlogHome"},
		},
		{
			path: "/blog/about",
			state: {currentPage: "BlogAbout"},
		},
	]
},
{
	path: "/article",
	state: {currentPage: "Article"},
},
]