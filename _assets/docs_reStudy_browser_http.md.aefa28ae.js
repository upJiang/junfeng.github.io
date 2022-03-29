import{g as t,f as e,E as l}from"./common-d6bd45c0.js";const p='{"title":"浏览器到底是如何工作的?","frontmatter":{},"headers":[{"level":2,"title":"浏览器到底是如何工作的?","slug":"浏览器到底是如何工作的"},{"level":2,"title":"HTTP 协议","slug":"http-协议"},{"level":2,"title":"实验","slug":"实验"},{"level":2,"title":"HTTP 协议格式","slug":"http-协议格式"},{"level":2,"title":"HTTP Method（方法）","slug":"http-method（方法）"},{"level":2,"title":"HTTP Status code（状态码）和 Status text（状态文本）","slug":"http-status-code（状态码）和-status-text（状态文本）"},{"level":2,"title":"HTTP Head (HTTP 头)","slug":"http-head-http-头"},{"level":2,"title":"HTTP Request Body","slug":"http-request-body"},{"level":2,"title":"HTTPS","slug":"https"},{"level":2,"title":"HTTP 2","slug":"http-2"}],"relativePath":"docs/reStudy/browser_http.md","lastUpdated":1639657876279.8945}';var a={};const r=l('<h2 id="浏览器到底是如何工作的"><a class="header-anchor" href="#浏览器到底是如何工作的" aria-hidden="true">#</a> 浏览器到底是如何工作的?</h2><blockquote><p>实际上，对浏览器的实现者来说，他们做的事情，就是把一个 URL 变成一个屏幕上显示的网页。</p></blockquote><p>这个过程是这样的：</p><ol><li>浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务端请求页面；</li><li>把请求回来的 HTML 代码经过解析，构建成 DOM 树；</li><li>计算 DOM 树上的 CSS 属性；</li><li>最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图；</li><li>一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度；</li><li>合成之后，再绘制到界面上。</li></ol><p><a data-fancybox title="image.png" href="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9541217b5967480f9dfc5dd09c5bd191~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9541217b5967480f9dfc5dd09c5bd191~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><p>我们从 HTTP 请求回来开始，这个过程并非一般想象中的一步做完再做下一步，而是一条流水线。</p><p>从 HTTP 请求回来，就产生了流式的数据，后续的 DOM 树构建、CSS 计算、渲染、合成、绘制，都是尽可能地流式处理前一步的产出：即不需要等到上一步骤完全结束，就开始处理上一步的输出，这样我们在浏览网页时，才会看到逐步出现的页面。</p><h2 id="http-协议"><a class="header-anchor" href="#http-协议" aria-hidden="true">#</a> HTTP 协议</h2><p>浏览器首先要做的事就是根据 URL 把数据取回来，取回数据使用的是 HTTP 协议，实际上这个过程之前还有 DNS 查询</p><p>HTTP 标准由 IETF 组织制定，跟它相关的标准主要有两份：</p><ul><li>HTTP1.1 <a href="https://tools.ietf.org/html/rfc2616" target="_blank" rel="noopener noreferrer">https://tools.ietf.org/html/rfc2616</a></li><li>HTTP1.1 <a href="https://tools.ietf.org/html/rfc7234" target="_blank" rel="noopener noreferrer">https://tools.ietf.org/html/rfc7234</a></li></ul><p>HTTP 协议是基于 TCP 协议出现的，对 TCP 协议来说，TCP 协议是一条双向的通讯通道，HTTP 在 TCP 的基础上，规定了 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。</p><p>大部分情况下，浏览器的实现者只需要用一个 TCP 库，甚至一个现成的 HTTP 库就可以搞定浏览器的网络通讯部分。<strong>HTTP 是纯粹的文本协议，它是规定了使用 TCP 协议来传输文本格式的一个应用层协议</strong>。</p><h2 id="实验"><a class="header-anchor" href="#实验" aria-hidden="true">#</a> 实验</h2><p>我们的实验需要使用 telnet 客户端，这个客户端是一个纯粹的 TCP 连接工具（安装方法）。</p><p>首先我们运行 telnet，连接到极客时间主机，在命令行里输入以下内容：</p><div class="language-"><pre><code>telnet time.geekbang.org 80\n</code></pre></div><p>这个时候，TCP 连接已经建立，我们输入以下字符作为请求：</p><div class="language-"><pre><code>GET / HTTP/1.1\nHost: time.geekbang.org\n</code></pre></div><p>按下两次回车，我们收到了服务端的回复：</p><div class="language-"><pre><code>HTTP/1.1 301 Moved Permanently\nDate: Fri, 25 Jan 2019 13:28:12 GMT\nContent-Type: text/html\nContent-Length: 182\nConnection: keep-alive\nLocation: https://time.geekbang.org/\nStrict-Transport-Security: max-age=15768000\n\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;301 Moved Permanently&lt;/title&gt;&lt;/head&gt;\n&lt;body bgcolor=&quot;white&quot;&gt;\n&lt;center&gt;&lt;h1&gt;301 Moved Permanently&lt;/h1&gt;&lt;/center&gt;\n&lt;hr&gt;&lt;center&gt;openresty&lt;/center&gt;\n&lt;/body&gt;\n&lt;/html&gt;\n</code></pre></div><p>这就是一次完整的 HTTP 请求的过程了，我们可以看到，在 TCP 通道中传输的，<strong>完全是文本</strong>。</p><p>在请求部分，第一行被称作 request line，它分为三个部分，HTTP Method，也就是请求的“方法”，请求的路径和请求的协议和版本。</p><p>在响应部分，第一行被称作 response line，它也分为三个部分，协议和版本、状态码和状态文本。</p><p>紧随在 request line 或者 response line 之后，是请求头 / 响应头，这些头由若干行组成，每行是用冒号分隔的名称和值。</p><p>在头之后，以一个空行（两个换行符）为分隔，是请求体 / 响应体，请求体可能包含文件或者表单数据，响应体则是 HTML 代码。</p><h2 id="http-协议格式"><a class="header-anchor" href="#http-协议格式" aria-hidden="true">#</a> HTTP 协议格式</h2><p>根据上面的分析，我们可以知道 HTTP 协议，大概可以划分成如下部分。 <a data-fancybox title="image.png" href="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab365e79add04a539e586d027d6382ed~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab365e79add04a539e586d027d6382ed~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a> 我们简单看一下，在这些部分中，path 是请求的路径完全由服务端来定义，没有很多的特别内容；而 version 几乎都是固定字符串；response body 是我们最熟悉的 HTML</p><h2 id="http-method（方法）"><a class="header-anchor" href="#http-method（方法）" aria-hidden="true">#</a> HTTP Method（方法）</h2><p>我们首先来介绍一下 request line 里面的方法部分。这里的方法跟我们编程中的方法意义类似，表示我们此次 HTTP 请求希望执行的操作类型。方法有以下几种定义：</p><ul><li>GET</li><li>POST</li><li>HEAD</li><li>PUT</li><li>DELETE</li><li>CONNECT</li><li>OPTIONS</li><li>TRACE</li></ul><p>浏览器通过地址栏访问页面都是 <strong>GET</strong> 方法。表单提交产生 <strong>POST</strong> 方法。</p><p><strong>HEAD</strong> 则是跟 GET 类似，只返回响应头，多数由 JavaScript 发起。</p><p><strong>PUT</strong> 和 <strong>DELETE</strong> 分别表示添加资源和删除资源，但是实际上这只是语义上的一种约定，并没有强约束。</p><p><strong>CONNECT</strong> 现在多用于 HTTPS 和 WebSocket。</p><p><strong>OPTIONS</strong> 和 <strong>TRACE</strong> 一般用于调试，多数线上服务都不支持。</p><h2 id="http-status-code（状态码）和-status-text（状态文本）"><a class="header-anchor" href="#http-status-code（状态码）和-status-text（状态文本）" aria-hidden="true">#</a> HTTP Status code（状态码）和 Status text（状态文本）</h2><p>接下来我们看看 response line 的状态码和状态文本。常见的状态码有以下几种。</p><ul><li>1xx：临时回应，表示客户端请继续。</li><li>2xx：请求成功。 <ul><li>200：请求成功。</li></ul></li><li>3xx: 表示请求的目标有变化，希望客户端进一步处理。 <ul><li>301&amp;302：永久性与临时性跳转。</li><li>304：跟客户端缓存没有更新。</li></ul></li><li>4xx：客户端请求错误。 <ul><li>403：无权限。</li><li>404：表示请求的页面不存在。</li><li>418：It’s a teapot. 这是一个彩蛋，来自 ietf 的一个愚人节玩笑。</li></ul></li><li>5xx：服务端请求错误。 <ul><li>500：服务端错误。</li><li>503：服务端暂时性错误，可以一会再试。</li></ul></li></ul><p>对我们前端来说，1xx 系列的状态码是非常陌生的，原因是 1xx 的状态被浏览器 HTTP 库直接处理掉了，不会让上层应用知晓。</p><p>2xx 系列的状态最熟悉的就是 200，这通常是网页请求成功的标志，也是大家最喜欢的状态码。</p><p>3xx 系列比较复杂，301 和 302 两个状态表示当前资源已经被转移，只不过一个是永久性转移，一个是临时性转移。实际上 301 更接近于一种报错，提示客户端下次别来了。</p><p>304 又是一个每个前端必知必会的状态，产生这个状态的前提是：客户端本地已经有缓存的版本，并且在 Request 中告诉了服务端，当服务端通过时间或者 tag，发现没有更新的时候，就会返回一个不含 body 的 304 状态。</p><h2 id="http-head-http-头"><a class="header-anchor" href="#http-head-http-头" aria-hidden="true">#</a> HTTP Head (HTTP 头)</h2><p>HTTP 头可以看作一个键值对。原则上，HTTP 头也是一种数据，我们可以自由定义 HTTP 头和值。不过在 HTTP 规范中，规定了一些特殊的 HTTP 头，我们现在就来了解一下它们。</p><p>在 HTTP 标准中，有完整的请求 / 响应头规定，这里我们挑几个重点的说一下：</p><p>我们先来看看 Request Header。</p><p><a data-fancybox title="image.png" href="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04d3fd0b45b4494faf5ed360fa216d89~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04d3fd0b45b4494faf5ed360fa216d89~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><p>接下来看一下 Response Header。</p><p><a data-fancybox title="image.png" href="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09266507ab744ca09cbb008df39d891f~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09266507ab744ca09cbb008df39d891f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><p>这里仅仅列出了我认为比较常见的 HTTP 头，这些头是我认为前端工程师应该做到不需要查阅，看到就可以知道意思的 HTTP 头。完整的列表还是请你参考我给出的 rfc2616 标准。</p><h2 id="http-request-body"><a class="header-anchor" href="#http-request-body" aria-hidden="true">#</a> HTTP Request Body</h2><p>HTTP 请求的 body 主要用于提交表单场景。实际上，HTTP 请求的 body 是比较自由的，只要浏览器端发送的 body 服务端认可就可以了。一些常见的 body 格式是：</p><ul><li>application/json</li><li>application/x-www-form-urlencoded</li><li>multipart/form-data</li><li>text/xml</li></ul><p>我们使用 HTML 的 form 标签提交产生的 HTML 请求，默认会产生 application/x-www-form-urlencoded 的数据格式，当有文件上传时，则会使用 multipart/form-data。</p><h2 id="https"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h2><p>在 HTTP 协议的基础上，HTTPS 和 HTTP2 规定了更复杂的内容，但是它基本保持了 HTTP 的设计思想，即：使用上的 <strong>Request-Response</strong> 模式。</p><p>我们首先来了解下 HTTPS。HTTPS 有两个作用</p><ul><li>确定请求的目标服务端身份</li><li>保证传输的数据不会被网络中间节点窃听或者篡改</li></ul><p>HTTPS 的标准也是由 RFC 规定的，你可以查看它的<a href="https://tools.ietf.org/html/rfc2818" target="_blank" rel="noopener noreferrer">详情链接</a></p><p>HTTPS 是使用<strong>加密通道</strong>来传输 HTTP 的内容。但是 HTTPS 首先与服务端建立一条 <strong>TLS 加密通道</strong>。TLS 构建于 TCP 协议之上，它实际上是对传输的内容做一次加密，所以从传输内容上看，HTTPS 跟 HTTP 没有任何区别。</p><h2 id="http-2"><a class="header-anchor" href="#http-2" aria-hidden="true">#</a> HTTP 2</h2><p>HTTP 2 是 HTTP 1.1 的升级版本，你可以查看它的<a href="https://tools.ietf.org/html/rfc7540" target="_blank" rel="noopener noreferrer">详情链接</a></p><p>HTTP 2.0 最大的改进有两点，一是<strong>支持服务端推送</strong>，二是<strong>支持 TCP 连接复用</strong>。</p><ul><li><p>服务端推送能够在客户端发送第一个请求到服务端时，提前把一部分内容推送给客户端，放入缓存当中，这可以避免客户端请求顺序带来的并行度不高，从而导致的性能问题。</p></li><li><p>TCP 连接复用，则使用同一个 TCP 连接来传输多个 HTTP 请求，避免了 TCP 连接建立时的三次握手开销，和初建 TCP 连接时传输窗口小的问题。</p></li></ul><h4 id="如何查看请求是不是使用http2-0"><a class="header-anchor" href="#如何查看请求是不是使用http2-0" aria-hidden="true">#</a> 如何查看请求是不是使用http2.0</h4><p>network中任意右键一个请求 --》 Header Options --&gt; 勾选中 Protocol --》请求列会多出 Protocol ,其中h2的就是http2.0</p><p>或者直接看 Response Header/Request Header , 没有view source 就是 http2.0</p>',68);a.render=function(l,p,a,i,o,n){return e(),t("div",null,[r])};export default a;export{p as __pageData};
