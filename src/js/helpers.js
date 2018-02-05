
function getCookie(name) { 
  var start = document.cookie.indexOf(name+'='),
      len = start+name.length+1,
      end = document.cookie.indexOf(';',len);
  if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
  if (start === -1) {return null;}
  if (end === -1) {end = document.cookie.length; }
  return decodeURIComponent(document.cookie.substring(len,end));
}

function getOffsetTop(el) { /**待写入 ftc-utils */
  /**
   * @dest 获得el元素在距页面顶部的距离。即得到this.offsetTop。对应NEXT中main.js的findTop函数.
   * @param el:想要在滚动时粘住的元素
   */
  
  let curTop = el.offsetTop;
  while (el && el.offsetParent) { 
    //NOTE:HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。对于fixed元素来说，其offsetParent是null而非fixed定位的那个视口,所以offsetTop要先执行一次
    el = el.offsetParent;
    curTop += el.offsetTop;//NOTE:HTMLElement.offsetTop 为只读属性，它
  }
  return curTop;
}

function getScrollTop() { /**待写入ftc-utils */
  /**
   * @dest 获得光标现在滚动到的位置距页面顶部的距离。
   */
  const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
  /*NOTE:document.compatMode：表明文档的渲染模式是混杂模式or标准模式
  * 混杂模式值为 "BackCompat"
  * 标准模式值为 "CSS1Compat"
  */
  return window.pageYOffset || isCSS1Compat ? document.documentElement.scrollTop : document.body.srcollTop;
  /* NOTE:
   * window.scrollY:返回文档在垂直方向已滚动的像素值
   * window.pageYOffset:scrollY的别名。为了跨浏览器兼容，请使用 window.pageYOffset 代替 window.scrollY。但IE9以下两种属性都不支持，需要使用scrollTop
   * Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数。
  */
}

function stickyWhenScroll(el) {
  const scrollTop = getScrollTop(el);
  const offsetTop = getOffsetTop(el);
  const isSticky = scrollTop > offsetTop ? true : false;
  this.stickyEl.classList.toggle('ftc-header--sticky',isSticky);
}
export {getCookie};