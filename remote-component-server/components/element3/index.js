console.log('Element 3 iframe脚本加载成功');
// 这个脚本会在iframe外部执行
// 可以用来与iframe通信
window.addEventListener('message', (event) => {
  console.log('收到iframe消息:', event.data);
});