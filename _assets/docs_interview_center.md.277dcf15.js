import{g as e,f as n,E as l}from"./common-d6bd45c0.js";const i='{"title":"","frontmatter":{},"relativePath":"docs/interview/center.md","lastUpdated":1627828179616.4336}';var a={};const t=l('<p>1.flex 方案：</p><div class="language-"><pre><code>display: flex;\njustify-content: center;\nalign-items: center;\n</code></pre></div><p>2.绝对定位+translate(不知子div的宽高)，若已知子div宽高直接用margin调节负值即可</p><div class="language-"><pre><code>position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);\n</code></pre></div><p>3.让一段内容(如文本)在div中居中</p><div class="language-"><pre><code>.parent {\n    display: table;   //1111\n    width: 300px;\n    height: 300px;\n    text-align: center;\n}\n.son  {\n    display: table-cell;  //222\n    height: 200px;\n    background-color: yellow;\n    vertical-align: middle;  //333\n}\n</code></pre></div><p>4.margin:0 auto 让元素水平居中</p><ol start="5"><li>使用inline-block 和 text-align实现</li></ol><div class="language-"><pre><code>.parent{text-align: center;}\n.child{display: inline-block;}\n</code></pre></div><p>6.垂直居中 vertical-align</p><div class="language-"><pre><code>/*第一种方法*/.parent{display:table-cell;vertical-align:middle;height:20px;}\n/*第二种方法*/.parent{display:inline-block;vertical-align:middle;line-height:20px;}\n</code></pre></div><p>7.让img垂直居中</p><div class="language-"><pre><code>/**&lt;img&gt;的容器设置如下**/\n{\n    display:table-cell;\n    text-align:center;\n    vertical-align:middle;\n}\n</code></pre></div><p>8.垂直居中(子容器宽度高度位置，且父容器不是相对定位而是fixed定位)</p><div class="language-"><pre><code>//父容器\n.el-overlay {\n        position:fixed;\n        top:0px;\n    text-align: center;\n}\n.el-overlay:after {\n    content: &#39;&#39;;\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n}\n//子容器，会导致里面的居中，这个是个问题\n.el-dialog {\n    text-align:left;  //让子容器的文字不居中\n    display: inline-block;\n    vertical-align: middle;\n}\n</code></pre></div>',15);a.render=function(l,i,a,d,r,p){return n(),e("div",null,[t])};export default a;export{i as __pageData};
