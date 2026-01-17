const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const COMPONENTS_DIR = path.join(__dirname, 'components');

// 确保目录存在
if (!fs.existsSync(COMPONENTS_DIR)) {
    fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
    console.log('创建组件目录:', COMPONENTS_DIR);
    
    // 创建示例组件
    createExampleComponents();
}

// 创建示例组件（如果没有的话）
function createExampleComponents() {
    const examples = {
        'element1': {
            json: {
                "type": "template",
                "template": "template.html",
                "scripturl": "http://localhost:3000/components/element1/index.js"
            },
            html: '<template>\n  <style>\n    .card {\n      border: 1px solid #ccc;\n      padding: 20px;\n      border-radius: 8px;\n      background: white;\n    }\n    h2 { color: #333; }\n  </style>\n  <div class="card">\n    <h2>Element 1 - Template组件</h2>\n    <p>这是一个template类型的远程组件</p>\n    <slot name="content">默认内容</slot>\n  </div>\n</template>',
            js: `console.log('Element 1 脚本加载成功');\n// 这里可以初始化组件逻辑\nconst host = document.currentScript?.closest('remote-element');\nif (host) {\n  console.log('找到宿主元素:', host);\n}`
        },
        'element2': {
            json: {
                "type": "innerHTML",
                "template": "innerHtml.html", 
                "scripturl": "http://localhost:3000/components/element2/index.js"
            },
            html: '<style>\n  .widget {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    padding: 30px;\n    border-radius: 12px;\n    text-align: center;\n  }\n  button {\n    background: white;\n    color: #667eea;\n    border: none;\n    padding: 10px 20px;\n    border-radius: 20px;\n    cursor: pointer;\n    margin-top: 15px;\n  }\n</style>\n<div class="widget">\n  <h2>Element 2 - innerHTML组件</h2>\n  <p>这是一个innerHTML类型的远程组件</p>\n  <button onclick="alert(\'按钮点击!\')">点击我</button>\n</div>',
            js: `console.log('Element 2 脚本加载成功');\n// innerHTML组件的初始化脚本\nconst buttons = document.querySelectorAll('.widget button');\nbuttons.forEach(btn => {\n  btn.addEventListener('click', () => {\n    console.log('按钮被点击');\n  });\n});`
        },
        'element3': {
            json: {
                "type": "html",
                "template": "iframe.html",
                "scripturl": "http://localhost:3000/components/element3/index.js"
            },
            html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Element 3 - HTML文档</title>\n  <style>\n    body {\n      margin: 0;\n      padding: 20px;\n      font-family: Arial, sans-serif;\n      background: #f0f0f0;\n    }\n    .iframe-content {\n      max-width: 800px;\n      margin: 0 auto;\n      background: white;\n      padding: 30px;\n      border-radius: 10px;\n      box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n    }\n  </style>\n</head>\n<body>\n  <div class="iframe-content">\n    <h1>Element 3 - 完整HTML文档</h1>\n    <p>这是一个iframe中显示的完整HTML文档</p>\n    <ul>\n      <li>特性1: 完全独立的文档环境</li>\n      <li>特性2: 自己的样式和作用域</li>\n      <li>特性3: 适合嵌入第三方内容</li>\n    </ul>\n  </div>\n  <script>\n    console.log('iframe内部脚本执行');\n    // iframe内的脚本\n    document.querySelector('.iframe-content').addEventListener('click', () => {\n      alert('iframe内容被点击！');\n    });\n  </script>\n</body>\n</html>`,
            js: `console.log('Element 3 iframe脚本加载成功');\n// 这个脚本会在iframe外部执行\n// 可以用来与iframe通信\nwindow.addEventListener('message', (event) => {\n  console.log('收到iframe消息:', event.data);\n});`
        }
    };

    Object.entries(examples).forEach(([name, data]) => {
        const dir = path.join(COMPONENTS_DIR, name);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            
            // 写入JSON配置
            fs.writeFileSync(
                path.join(dir, `${name}.json`),
                JSON.stringify(data.json, null, 2)
            );
            
            // 写入HTML模板
            const htmlFileName = data.json.type === 'template' ? 'template.html' :
                               data.json.type === 'innerHTML' ? 'innerHtml.html' : 'iframe.html';
            fs.writeFileSync(path.join(dir, htmlFileName), data.html);
            
            // 写入JavaScript文件
            fs.writeFileSync(path.join(dir, 'index.js'), data.js);
            
            console.log(`创建示例组件: ${name}`);
        }
    });
}

// 处理CORS头
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// 根据请求返回适当的Content-Type
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
        '.json': 'application/json',
        '.js': 'application/javascript',
        '.html': 'text/html',
        '.css': 'text/css',
        '.txt': 'text/plain'
    };
    return contentTypes[ext] || 'application/octet-stream';
}

// 主请求处理函数
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // 处理预检请求
    if (req.method === 'OPTIONS') {
        setCORSHeaders(res);
        res.writeHead(204);
        res.end();
        return;
    }
    
    console.log(`${req.method} ${pathname}`);
    
    // 设置CORS头
    setCORSHeaders(res);
    
    // 路由处理
    if (req.method === 'GET') {
        // 1. 组件列表
        if (pathname === '/api/components' || pathname === '/api/components/') {
            try {
                const components = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => {
                        const name = dirent.name;
                        const jsonPath = path.join(COMPONENTS_DIR, name, `${name}.json`);
                        try {
                            const config = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                            return {
                                name,
                                tagname: config.tagname || name,
                                description: config.description || `${name} 组件`,
                                url: `http://localhost:${PORT}/api/components/${name}`
                            };
                        } catch (e) {
                            return { name, error: '配置读取失败' };
                        }
                    });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    components,
                    server: 'Remote Component Server',
                    version: '1.0.0'
                }, null, 2));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: true,
                    message: '读取组件列表失败',
                    details: error.message
                }));
            }
            return;
        }
        
        // 2. 获取特定组件
        const componentMatch = pathname.match(/^\/api\/components\/([^\/]+)$/);
        if (componentMatch) {
            const componentName = componentMatch[1];
            const componentDir = path.join(COMPONENTS_DIR, componentName);
            const configPath = path.join(componentDir, `${componentName}.json`);
            
            if (!fs.existsSync(configPath)) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: true,
                    message: `组件 ${componentName} 不存在`,
                    code: 'COMPONENT_NOT_FOUND'
                }));
                return;
            }
            
            try {
                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                const { tagname, template } = config;
                
                // 读取模板文件
                const templatePath = path.join(componentDir, template);
                if (!fs.existsSync(templatePath)) {
                    throw new Error(`模板文件 ${template} 不存在`);
                }
                
                const templateContent = fs.readFileSync(templatePath, 'utf8');
                
                // 构建响应数据
                const response = {
					tagname: tagname || componentName,
                    text: templateContent,
                    scripturl: config.scripturl || ''
                };
                
                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=300'
                });
                res.end(JSON.stringify(response, null, 2));
                
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: true,
                    message: '读取组件失败',
                    details: error.message
                }));
            }
            return;
        }
        
        // 3. 获取组件文件（如JS脚本）
        const fileMatch = pathname.match(/^\/components\/([^\/]+)\/(.+)$/);
        if (fileMatch) {
            const [, componentName, fileName] = fileMatch;
            const filePath = path.join(COMPONENTS_DIR, componentName, fileName);
            
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                try {
                    const content = fs.readFileSync(filePath);
                    const contentType = getContentType(filePath);
                    
                    res.writeHead(200, { 
                        'Content-Type': contentType,
                        'Cache-Control': 'public, max-age=3600'
                    });
                    res.end(content);
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('文件读取失败');
                }
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('文件不存在');
            }
            return;
        }
        
        // 4. 静态文件服务（可选）
        if (pathname === '/' || pathname === '/index.html') {
            const html = `
<!DOCTYPE html>
<html>
<head>
    <title>远程组件服务器</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        .component { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .type { display: inline-block; padding: 2px 8px; background: #eee; border-radius: 3px; font-size: 12px; }
        .template { background: #e3f2fd; }
        .innerHTML { background: #f3e5f5; }
        .html { background: #e8f5e8; }
        code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>远程组件服务器</h1>
    <p>服务器运行在: <code>http://localhost:${PORT}</code></p>
    
    <h2>API端点</h2>
    <ul>
        <li><code>GET /api/components</code> - 获取组件列表</li>
        <li><code>GET /api/components/:name</code> - 获取特定组件</li>
        <li><code>GET /components/:name/:file</code> - 获取组件文件（JS等）</li>
    </ul>
    
    <h2>示例组件</h2>
    <div id="components"></div>
    
    <h2>使用示例</h2>
    <pre><code>&lt;remote-element 
    url="http://localhost:3000/api/components/element1"
    version="1.0.0"
&gt;&lt;/remote-element&gt;</code></pre>
    
    <script>
        fetch('/api/components')
            .then(r => r.json())
            .then(data => {
                if (data.components) {
                    const container = document.getElementById('components');
                    data.components.forEach(comp => {
                        const div = document.createElement('div');
                        div.className = 'component';
                        div.innerHTML = \`
                            <h3>\${comp.name}</h3>
                            <span class="type \${comp.type}">\${comp.type}</span>
                            <p>\${comp.description}</p>
                            <p>URL: <code>\${comp.url}</code></p>
                            <button onclick="testComponent('\${comp.name}')">测试组件</button>
                        \`;
                        container.appendChild(div);
                    });
                }
            });
        
        function testComponent(name) {
            const url = \`/api/components/\${name}\`;
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    console.log(\`组件 \${name}:\`, data);
                    alert(\`组件 \${name} 加载成功！查看控制台获取详细信息。\`);
                })
                .catch(err => {
                    console.error(\`加载组件 \${name} 失败:\`, err);
                    alert(\`加载失败: \${err.message}\`);
                });
        }
    </script>
</body>
</html>`;
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
            return;
        }
        
        // 5. 健康检查端点
        if (pathname === '/health' || pathname === '/status') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                components: fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory()).length
            }));
            return;
        }
    }
    
    // 默认404响应
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: true,
        message: '端点不存在',
        path: pathname,
        method: req.method
    }));
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`
=======================================
  远程组件服务器已启动！
  地址: http://localhost:${PORT}
=======================================

可用端点：
  GET /                    - 管理界面
  GET /health              - 健康检查
  GET /api/components      - 组件列表
  GET /api/components/:name - 获取组件
  
示例组件：
  http://localhost:${PORT}/api/components/element1
  http://localhost:${PORT}/api/components/element2
  http://localhost:${PORT}/api/components/element3

使用示例：
  <remote-element 
      url="http://localhost:${PORT}/api/components/element1"
      version="1.0.0"
  ></remote-element>
=======================================
    `);
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n正在关闭服务器...');
    server.close(() => {
        console.log('服务器已关闭');
        process.exit(0);
    });
});

// 错误处理
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`端口 ${PORT} 已被占用，请使用其他端口`);
        process.exit(1);
    } else {
        console.error('服务器错误:', error);
    }
});