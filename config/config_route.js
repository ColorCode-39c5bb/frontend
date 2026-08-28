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