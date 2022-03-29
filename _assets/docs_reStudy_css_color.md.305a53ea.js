import{g as e,f as t,E as a}from"./common-d6bd45c0.js";const l='{"title":"RGB 颜色","frontmatter":{},"headers":[{"level":2,"title":"RGB 颜色","slug":"rgb-颜色"},{"level":2,"title":"CMYK 颜色","slug":"cmyk-颜色"},{"level":2,"title":"HSL 颜色","slug":"hsl-颜色"},{"level":2,"title":"其它颜色","slug":"其它颜色"},{"level":2,"title":"渐变","slug":"渐变"},{"level":2,"title":"形状","slug":"形状"}],"relativePath":"docs/reStudy/css_color.md","lastUpdated":1639657876280.8958}';var i={};const r=a('<h2 id="rgb-颜色"><a class="header-anchor" href="#rgb-颜色" aria-hidden="true">#</a> RGB 颜色</h2><p>我们在计算机中，最常见的颜色表示法是 RGB 颜色，它符合光谱三原色理论：<strong>红、绿、蓝</strong>三种颜色的光可以构成所有的颜色。</p><p><a data-fancybox title="image.png" href="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afd4eb263df44169b15122dc9154337d~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afd4eb263df44169b15122dc9154337d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><p>为什么是这三种颜色呢？这跟人类的视神经系统相关，人类的视觉神经分别有对红、绿、蓝三种颜色敏感的类型。</p><p>现代计算机中多用 <strong>0 - 255</strong> 的数字表示每一种颜色，这正好占据了一个字节，每一个颜色就占据三个字节。</p><p>红绿蓝三种颜色的光混合起来就是白光，没有光就是黑暗，所以在 RGB 表示法中，三色数值最大表示白色，三色数值为 0 表示黑色。</p><h2 id="cmyk-颜色"><a class="header-anchor" href="#cmyk-颜色" aria-hidden="true">#</a> CMYK 颜色</h2><p>如果你上过小学美术课，应该听过“红黄蓝”三原色的说法，这好像跟我们说的不太一样。实际上是这样的，颜料显示颜色的原理是它吸收了所有别的颜色的光，只反射一种颜色，所以颜料三原色其实是红、绿、蓝的补色，也就是：品红、黄、青。因为它们跟红、黄、蓝相近，所以有了这样的说法。 <a data-fancybox title="image.png" href="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07a43b0d3e604dafa384282ed5242c6d~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07a43b0d3e604dafa384282ed5242c6d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><p>在印刷行业，使用的就是这样的三原色（品红、黄、青）来调配油墨，这种颜色的表示法叫做 CMYK，它用一个四元组来表示颜色。</p><p>你一定会好奇，为什么它比三原色多了一种，其实答案并不复杂，在印刷行业中，黑色颜料价格最低，而品红、黄、青颜料价格较贵，如果要用三原色调配黑色，经济上是不划算的，所以印刷时会单独指定黑色。</p><p>对 CMYK 颜色表示法来说，同一种颜色会有多种表示方案，但是我们参考印刷行业的习惯，会尽量优先使用黑色。</p><h2 id="hsl-颜色"><a class="header-anchor" href="#hsl-颜色" aria-hidden="true">#</a> HSL 颜色</h2><p>人类对颜色的认识却并非来自自己的神经系统，当我们把阳光散射，可以得到七色光：红橙黄绿蓝靛紫，实际上，阳光接近白光，它包含了各种颜色的光，它散射之后，应该是个基本连续的。这说明对人的感知来说，颜色远远大于红、绿、蓝。</p><p>因此，HSL 这样的颜色模型被设计出来了，它用一个值来表示人类认知中的颜色，我们用专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。</p><p><a data-fancybox title="image.png" href="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90f7cfba72dc4644a9b11e29cb3c0590~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90f7cfba72dc4644a9b11e29cb3c0590~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><h2 id="其它颜色"><a class="header-anchor" href="#其它颜色" aria-hidden="true">#</a> 其它颜色</h2><p>RGBA 是代表 Red（红色）、Green（绿色）、Blue（蓝色）和 Alpha 的色彩空间。RGBA 颜色被用来表示带<strong>透明度</strong>的颜色，实际上，Alpha 通道类似一种颜色值的保留字。在 CSS 中，Alpha 通道被用于透明度，所以我们的颜色表示被称作 RGBA，而不是 RGBO（Opacity）。</p><p>为了方便使用，CSS 还规定了名称型的颜色，它内置了大量（140 种）的<strong>颜色名称</strong>。不过这里我要挑出两个颜色来讲一讲：金（gold）和银（silver）。</p><p>果你使用过这两个颜色，你会发现，金（gold）和银（silver）的视觉表现跟我们想象中的金色和银色相差甚远。与其被叫做金色和银色，它们看起来更像是难看的暗黄色和浅灰色。</p><p>为什么会这样呢？在人类天然的色彩认知中，实际上混杂了很多其它因素，金色和银色不仅仅是一种颜色，它还意味着一定的镜面反光程度，在同样的光照条件下，金属会呈现出更亮的色彩，这并非是用一个色值可以描述的，这就引出了我们接下来要讲的渐变。</p><h2 id="渐变"><a class="header-anchor" href="#渐变" aria-hidden="true">#</a> 渐变</h2><p>在 CSS 中，background-image这样的属性，可以设为渐变。CSS 中支持两种渐变，一种是<strong>线性渐变</strong>，一种是<strong>放射性渐变</strong>，我们先了解一下它们的基本用法：</p><p>线性渐变的写法是：</p><div class="language-"><pre><code>linear-gradient(direction, color-stop1, color-stop2, ...);\n</code></pre></div><p>这里的 direction 可以是方向，也可以是具体的角度。例如：</p><ul><li>to bottom</li><li>to top</li><li>to left</li><li>to right</li><li>to bottom left</li><li>to bottom right</li><li>to top left</li><li>to top right</li><li>120deg</li><li>3.14rad</li></ul><p>以上这些都是合理的方向取值。</p><p>color-stop 是一个颜色和一个区段，例如：</p><ul><li>rgba(255,0,0,0)</li><li>orange</li><li>yellow 10%</li><li>green 20%</li><li>lime 28px</li></ul><p>我们组合一下，产生一个“真正的金色”的背景：</p><div class="language-"><pre><code>&lt;style&gt;\n#grad1 {\n    height: 200px;\n    background: linear-gradient(45deg, gold 10%, yellow 50%, gold 90%); \n}\n&lt;/style&gt;\n&lt;div id=&quot;grad1&quot;&gt;&lt;/div&gt;\n</code></pre></div><p>放射性渐变需要一个中心点和若干个颜色：</p><div class="language-"><pre><code>radial-gradient(shape size at position, start-color, ..., last-color);\n</code></pre></div><p>当我们应用的每一种颜色都是 HSL 颜色时，就产生了一些非常有趣的效果，比如，我们可以通过变量来调整一个按钮的风格：</p><div class="language-"><pre><code>&lt;style&gt;\n.button {\n    display: inline-block;\n    outline: none;\n    cursor: pointer;\n    text-align: center;\n    text-decoration: none;\n    font: 14px/100% Arial, Helvetica, sans-serif;\n    padding: .5em 2em .55em;\n    text-shadow: 0 1px 1px rgba(0,0,0,.3);\n    border-radius: .5em;\n    box-shadow: 0 1px 2px rgba(0,0,0,.2);\n    color: white;\n    border: solid 1px ;\n}\n\n&lt;/style&gt;\n&lt;div class=&quot;button orange&quot;&gt;123&lt;/div&gt;\n\n\nvar btn = document.querySelector(&quot;.button&quot;);\nvar h = 25;\nsetInterval(function(){\n  h ++;\n  h = h % 360;\n  btn.style.borderColor=`hsl(${h}, 95%, 45%)`\n  btn.style.background=`linear-gradient(to bottom,  hsl(${h},95%,54.1%),  hsl(${h},95%,84.1%))`\n},100);\n</code></pre></div><h2 id="形状"><a class="header-anchor" href="#形状" aria-hidden="true">#</a> 形状</h2><p>CSS 中的很多属性还会产生形状，比如我们常见的属性：</p><ul><li>border</li><li>box-shadow</li><li>border-radius</li></ul><p>这些产生形状的属性非常有趣，我们也能看到很多利用它们来产生的 CSS 黑魔法。然而，这里我有一个相反的建议，我们仅仅把它们用于基本的用途，把 border 用于边框、把阴影用于阴影，把圆角用于圆角，所有其它的场景，都有一个更好的替代品：datauri+svg。</p>',39);i.render=function(a,l,i,o,n,p){return t(),e("div",null,[r])};export default i;export{l as __pageData};
