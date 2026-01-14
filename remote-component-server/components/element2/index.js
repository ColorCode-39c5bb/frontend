console.log('Element 2 脚本加载成功');
// innerHTML组件的初始化脚本
const buttons = document.querySelectorAll('.widget button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('按钮被点击');
  });
});