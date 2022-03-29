import{g as t,f as l,E as i}from"./common-d6bd45c0.js";const n='{"title":"正常流","frontmatter":{},"headers":[{"level":2,"title":"正常流","slug":"正常流"},{"level":2,"title":"正常流的原理","slug":"正常流的原理"}],"relativePath":"docs/reStudy/css_compose.md","lastUpdated":1639657876281.8933}';var e={};const o=i('<h2 id="正常流"><a class="header-anchor" href="#正常流" aria-hidden="true">#</a> 正常流</h2><p><strong>我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。</strong></p><h2 id="正常流的原理"><a class="header-anchor" href="#正常流的原理" aria-hidden="true">#</a> 正常流的原理</h2><p>在 CSS 标准中，规定了如何排布每一个文字或者盒的算法，这个算法依赖一个排版的“当前状态”，CSS 把这个当前状态称为“格式化上下文（formatting context）”。</p><p>我们可以认为排版过程是这样的：</p><ul><li>格式化上下文 + 盒 / 文字 = 位置</li><li>formatting context + boxes/charater = positions</li></ul><p>当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理。</p><ul><li><strong>当遇到块级盒</strong>：排入块级格式化上下文。</li><li><strong>当遇到行内级盒或者文字</strong>：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。</li><li><strong>遇到 float 盒</strong>：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。</li></ul><p>我们以上讲的都是一个块级格式化上下文中的排版规则，实际上，页面中的布局没有那么简单，一些元素会在其内部创建新的块级格式化上下文，这些元素有</p><ul><li>浮动元素；</li><li>绝对定位元素；</li><li>非块级但仍能包含块级元素的容器（如 inline-blocks, table-cells, table-captions）；</li><li>块级的能包含块级元素的容器，且属性 overflow 不为 visible。</li></ul><p>写一个自适应宽</p><div class="language-"><pre><code>&lt;div class=&quot;outer&quot;&gt;\n    &lt;div class=&quot;fixed&quot;&gt;&lt;/div&gt;\n    &lt;div class=&quot;auto&quot;&gt;&lt;/div&gt;\n&lt;/div&gt;\n\n\n.fixed {\n    display:inline-block;\n    vertical-align:top;\n}\n.auto {\n    margin-left:-200px;\n    padding-left:200px;\n    box-sizing:border-box;\n    width:100%;\n    display:inline-block;\n    vertical-align:top;\n}\n</code></pre></div>',12);e.render=function(i,n,e,a,r,s){return l(),t("div",null,[o])};export default e;export{n as __pageData};
