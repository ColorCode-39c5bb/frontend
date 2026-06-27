class HistoryRouter {
    constructor() {
        this.routes = {};
        this.currentPath = '';
        this.currentParams = {};
        this.middlewares = [];
        
        // 绑定 this
        this.refresh = this.refresh.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.init();
    }
    
    init() {
        // 监听 popstate 事件（浏览器前进后退）
        window.addEventListener('popstate', this.refresh, false);
        
        // 监听页面加载
        window.addEventListener('load', this.refresh, false);
        
        // 拦截所有链接点击事件
        document.addEventListener('click', this.handleClick, false);
    }
    
    // 注册路由
    route(path, callback) {
        this.routes[path] = callback || function() {};
    }
    
    // 添加中间件
    use(middleware) {
        this.middlewares.push(middleware);
    }
    
    // 处理链接点击
    handleClick(e) {
        // 只处理带有 data-link 属性的链接
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentNode;
            if (target === document.body) {
                target = null;
                break;
            }
        }
        
        if (target && target.hasAttribute('data-link')) {
            e.preventDefault();
            const href = target.getAttribute('href');
            const title = target.getAttribute('title') || '';
            this.push(href, title);
        }
    }
    
    // 解析路径和参数
    parsePath(fullPath) {
        const [path, queryString] = fullPath.split('?');
        const params = this.parseQuery(queryString);
        return { path: path || '/', params };
    }
    
    // 解析查询参数
    parseQuery(queryString) {
        const params = {};
        if (queryString) {
            queryString.split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                if (key) {
                    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                }
            });
        }
        return params;
    }
    
    // 刷新路由
    refresh(e) {
        // 获取当前路径
        const fullPath = window.location.pathname + window.location.search;
        const { path, params } = this.parsePath(fullPath);
        
        this.currentPath = path;
        this.currentParams = params;
        
        // 执行中间件
        const context = {
            path,
            params,
            redirect: (to) => {
                this.push(to);
                return false; // 停止后续执行
            }
        };
        
        // 中间件执行链
        const executeMiddlewares = (index) => {
            if (index < this.middlewares.length) {
                const next = () => executeMiddlewares(index + 1);
                this.middlewares[index](context, next);
            } else {
                // 执行路由回调
                this.executeRoute(path, params);
            }
        };
        
        executeMiddlewares(0);
    }
    
    // 执行路由回调
    executeRoute(path, params) {
        let matched = false;
        
        // 支持动态路由参数，如 /user/:id
        for (const routePath in this.routes) {
            if (this.isRouteMatch(routePath, path)) {
                const dynamicParams = this.extractDynamicParams(routePath, path);
                const allParams = { ...params, ...dynamicParams };
                
                this.routes[routePath](allParams);
                matched = true;
                break;
            }
        }
        
        if (!matched && this.routes['*']) {
            this.routes['*']();
        }
    }
    
    // 检查路由是否匹配
    isRouteMatch(routePattern, currentPath) {
        if (routePattern === currentPath) return true;
        
        // 处理动态路由 /user/:id
        const patternParts = routePattern.split('/');
        const pathParts = currentPath.split('/');
        
        if (patternParts.length !== pathParts.length) return false;
        
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) continue;
            if (patternParts[i] !== pathParts[i]) return false;
        }
        
        return true;
    }
    
    // 提取动态路由参数
    extractDynamicParams(routePattern, currentPath) {
        const params = {};
        const patternParts = routePattern.split('/');
        const pathParts = currentPath.split('/');
        
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].slice(1);
                params[paramName] = decodeURIComponent(pathParts[i]);
            }
        }
        
        return params;
    }
    
    // 跳转到新路由
    push(path, title = '', state = {}) {
        const fullPath = path + (window.location.search || '');
        history.pushState(state, title, fullPath);
        this.refresh();
    }
    
    // 替换当前路由
    replace(path, title = '', state = {}) {
        const fullPath = path + (window.location.search || '');
        history.replaceState(state, title, fullPath);
        this.refresh();
    }
    
    // 返回
    back() {
        history.back();
    }
    
    // 前进
    forward() {
        history.forward();
    }
    
    // 获取当前路由信息
    getCurrentRoute() {
        return {
            path: this.currentPath,
            params: { ...this.currentParams },
            fullPath: window.location.pathname + window.location.search
        };
    }
}

// 使用示例
const router = new HistoryRouter();

// 添加中间件（权限检查）
router.use((context, next) => {
    console.log('中间件1: 检查权限');
    if (context.path === '/admin') {
        if (!localStorage.getItem('token')) {
            context.redirect('/login');
            return;
        }
    }
    next();
});

// 注册路由
router.route('/', (params) => {
    document.getElementById('app').innerHTML = '<h1>首页</h1>';
});

router.route('/about', (params) => {
    document.getElementById('app').innerHTML = '<h1>关于我们</h1>';
});

router.route('/user/:id', (params) => {
    document.getElementById('app').innerHTML = `
        <h1>用户详情</h1>
        <p>用户ID: ${params.id}</p>
        <p>查询参数: ${JSON.stringify(params)}</p>
    `;
});

router.route('/login', () => {
    document.getElementById('app').innerHTML = '<h1>登录页面</h1>';
});

// 404
router.route('*', () => {
    document.getElementById('app').innerHTML = '<h1>404 页面不存在</h1>';
});

// 程序化导航
document.getElementById('go-to-about').addEventListener('click', () => {
    router.push('/about');
});

// 获取当前路由信息
console.log(router.getCurrentRoute());