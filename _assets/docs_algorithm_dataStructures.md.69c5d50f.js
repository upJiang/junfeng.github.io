import{g as e,f as a,E as t}from"./common-d6bd45c0.js";const p='{"title":"数组","frontmatter":{},"headers":[{"level":2,"title":"数组","slug":"数组"},{"level":3,"title":"数组的创建","slug":"数组的创建"},{"level":3,"title":"数组的访问和遍历","slug":"数组的访问和遍历"},{"level":3,"title":"二维数组","slug":"二维数组"},{"level":3,"title":"数组的增删元素","slug":"数组的增删元素"},{"level":2,"title":"栈（Stack）——只用 pop 和 push 完成增删的“数组”","slug":"栈（stack）——只用-pop-和-push-完成增删的“数组”"},{"level":2,"title":"队列（Queue）——只用 push 和 shift 完成增删的“数组”","slug":"队列（queue）——只用-push-和-shift-完成增删的“数组”"},{"level":2,"title":"链表","slug":"链表"},{"level":3,"title":"链表结点的创建","slug":"链表结点的创建"},{"level":3,"title":"链表元素的添加","slug":"链表元素的添加"},{"level":3,"title":"链表元素的删除","slug":"链表元素的删除"},{"level":3,"title":"链表和数组的辨析","slug":"链表和数组的辨析"},{"level":3,"title":"高效的增删操作","slug":"高效的增删操作"},{"level":3,"title":"麻烦的访问操作","slug":"麻烦的访问操作"},{"level":3,"title":"总结","slug":"总结"},{"level":2,"title":"树","slug":"树"},{"level":3,"title":"理解二叉树结构","slug":"理解二叉树结构"},{"level":3,"title":"二叉树的编码实现","slug":"二叉树的编码实现"}],"relativePath":"docs/algorithm/dataStructures.md","lastUpdated":1645883746547.3503}';var r={};const i=t('<p>数据结构层面，我们需要掌握：</p><ul><li>数组</li><li>栈</li><li>队列</li><li>链表</li><li>树（着重二叉树）</li></ul><h2 id="数组"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><p>作为最简单、最基础的数据结构，大多数的语言都天然地对数组有着原生的表达，JavaScript 亦然。这意味着我们可以对数组做到“开箱即用”，而不必自行模拟实现，非常方便。</p><h3 id="数组的创建"><a class="header-anchor" href="#数组的创建" aria-hidden="true">#</a> 数组的创建</h3><p>平时的数组创建：</p><div class="language-"><pre><code>const arr = [1, 2, 3, 4]   \n</code></pre></div><p>不过在算法题中，很多时候我们初始化一个数组时，并不知道它内部元素的情况。这种场景下，要使用构造函数创建数组的方法：</p><div class="language-"><pre><code>const arr = new Array()  //等价于 const arr = []\n</code></pre></div><p>创建一个长度确定、同时每一个元素的值也都确定的数组</p><div class="language-"><pre><code>const arr = new Array(7).fill(1)\n</code></pre></div><p><a data-fancybox title="img" href="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170b9821b9fce58b~tplv-t2oaga2asx-watermark.awebp"><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170b9821b9fce58b~tplv-t2oaga2asx-watermark.awebp" alt="img"></a></p><h3 id="数组的访问和遍历"><a class="header-anchor" href="#数组的访问和遍历" aria-hidden="true">#</a> 数组的访问和遍历</h3><h4 id="_1-for-循环"><a class="header-anchor" href="#_1-for-循环" aria-hidden="true">#</a> 1. for 循环</h4><p>通过循环数组的下标，来依次访问每个值：</p><div class="language-"><pre><code>// 获取数组的长度\nconst len = arr.length\nfor(let i=0;i&lt;len;i++) {\n    // 输出数组的元素值，输出当前索引\n    console.log(arr[i], i)\n}\n</code></pre></div><h4 id="_2-foreach-方法"><a class="header-anchor" href="#_2-foreach-方法" aria-hidden="true">#</a> 2. forEach 方法</h4><p>通过取 forEach 方法中传入函数的第一个入参和第二个入参，我们也可以取到数组每个元素的值及其对应索引：</p><div class="language-"><pre><code>arr.forEach((item, index)=&gt; {\n    // 输出数组的元素值，输出当前索引\n    console.log(item, index)\n})\n</code></pre></div><h4 id="_3-map-方法"><a class="header-anchor" href="#_3-map-方法" aria-hidden="true">#</a> 3. map 方法</h4><p>对数组进行‘二次加工’，返回一个全新的数组</p><div class="language-"><pre><code>const newArr = arr.map((item, index)=&gt; {\n    // 输出数组的元素值，输出当前索引\n    console.log(item, index)\n    // 在当前元素值的基础上加1\n    return item+1\n})\n</code></pre></div><p><strong>如果没有特殊的需要，那么统一使用 for 循环来实现遍历。因为从性能上看，for 循环遍历起来是最快的</strong></p><h3 id="二维数组"><a class="header-anchor" href="#二维数组" aria-hidden="true">#</a> 二维数组</h3><p>数组里面的值也是一个数组，等价于‘矩阵’</p><h4 id="二维数组的初始化"><a class="header-anchor" href="#二维数组的初始化" aria-hidden="true">#</a> 二维数组的初始化</h4><p>当你给 fill 传递一个入参时，如果这个入参的类型是引用类型，那么 fill 在填充坑位时填充的其实就是入参的引用。使用 fill 初始化二维数组</p><div class="language-"><pre><code>const arr =(new Array(7)).fill([])\narr[0][0] = 1\n结果每一列都被赋值上了1，即 arr[0][0...6]都是1\n</code></pre></div><p>所以<strong>不能使用 fill 初始化二维数组</strong></p><p>本着安全的原则，直接用一个 for 循环来初始化：</p><div class="language-"><pre><code>const len = arr.length\nfor(let i=0;i&lt;len;i++) {\n    // 将数组的每一个坑位初始化为数组\n    arr[i] = []\n}\n</code></pre></div><p>for 循环中，每一次迭代我们都通过“[]”来创建一个新的数组，这样便不会有引用指向问题带来的尴尬。</p><h4 id="二维数组的访问"><a class="header-anchor" href="#二维数组的访问" aria-hidden="true">#</a> 二维数组的访问</h4><p>访问二维数组和访问一维数组差别不大，区别在于我们现在需要的是两层循环：</p><div class="language-"><pre><code>// 缓存外部数组的长度\nconst outerLen = arr.length\nfor(let i=0;i&lt;outerLen;i++) {\n    // 缓存内部数组的长度\n    const innerLen = arr[i].length\n    for(let j=0;j&lt;innerLen;j++) {\n        // 输出数组的值，输出数组的索引\n        console.log(arr[i][j],i,j)\n    }\n}\n</code></pre></div><p>一维数组用 for 循环遍历只需一层循环，二维数组是两层，三维数组就是三层。依次类推，N 维数组需要 N 层循环来完成遍历。</p><h3 id="数组的增删元素"><a class="header-anchor" href="#数组的增删元素" aria-hidden="true">#</a> 数组的增删元素</h3><p>在 JavaScript 中，<strong>栈和队列的实现一般都要依赖于数组</strong>，大家完全可以把栈和队列都看作是“特别的数组”。</p><p>在学习栈与队列之前，我们需要先来明确一下数组中的增删操作具有什么样的特性、对应的方法有哪些：</p><h4 id="数组中增加元素"><a class="header-anchor" href="#数组中增加元素" aria-hidden="true">#</a> 数组中增加元素</h4><ul><li>unshift 方法（直接返回的是数组结果的长度）-添加元素到数组的头部</li></ul><div class="language-"><pre><code>const arr = [1,2]\narr.unshift(0) // arr结果：[0,1,2]\n</code></pre></div><ul><li>push 方法（直接返回的是push的内容）-添加元素到数组的尾部</li></ul><div class="language-"><pre><code>const arr = [1,2]\narr.push(3) // arr结果：[1,2,3]\n</code></pre></div><ul><li>splice 方法（直接返回的是被删除的元素数组）-添加元素到数组的任何位置</li></ul><div class="language-"><pre><code>const arr = [1,2] \narr.splice(1,0,3) // arr结果：[1,3,2]，从索引为1开始，删掉0个元素，插入一个3。可以插入多个，参数直接在后面加\narr.splice(1,0,3，7，8) // [1,3,，7，8，2]\narr.splice(1,1) // arr结果：[1] 删除从索引为1开始的1个元素\n</code></pre></div><h4 id="数组中删除元素"><a class="header-anchor" href="#数组中删除元素" aria-hidden="true">#</a> 数组中删除元素</h4><ul><li>shift 方法（直接返回的是数组结果的长度）-删除数组头部的元素</li></ul><div class="language-"><pre><code>const arr = [1,2,3]\narr.shift() // arr结果：[2,3]\n</code></pre></div><ul><li>pop 方法（直接返回的是pop掉的内容）-删除数组尾部的元素</li></ul><div class="language-"><pre><code>const arr = [1,2,3]\narr.pop() // arr结果：[1,2]\n</code></pre></div><ul><li>splice 方法-删除数组任意位置的元素 略同上</li></ul><h2 id="栈（stack）——只用-pop-和-push-完成增删的“数组”"><a class="header-anchor" href="#栈（stack）——只用-pop-和-push-完成增删的“数组”" aria-hidden="true">#</a> 栈（Stack）——只用 pop 和 push 完成增删的“数组”</h2><p>栈是一种<strong>后进先出</strong>(LIFO，Last In First Out)的数据结构。<br> 可以把它想象为是一个底部封闭的瓶子，东西先放进去的会在底下，最后才能拿出来，最后放进去的在最上面，所以后进先出。</p><p>特征：</p><ul><li>只允许从栈顶添加元素</li><li>只允许从栈顶取出元素</li></ul><p>对应到数组的方法，刚好就是 push 和 pop。因此，我们可以认为在 JavaScript 中，<code>栈就是限制只能用 push 来添加元素，同时只能用 pop 来移除元素的一种特殊的数组</code>。</p><p>下面我们基于数组来实现一波栈的常用操作，完成“放置冰淇淋”和“卖冰淇淋”的过程：</p><div class="language-"><pre><code>// 初始状态，栈空\nconst stack = []  \n// 入栈过程\nstack.push(&#39;东北大板&#39;)\nstack.push(&#39;可爱多&#39;)\nstack.push(&#39;巧乐兹&#39;)\nstack.push(&#39;冰工厂&#39;)\nstack.push(&#39;光明奶砖&#39;)\n\n// 出栈过程，栈不为空时才执行\nwhile(stack.length) {\n    // 单纯访问栈顶元素（不出栈）\n    const top = stack[stack.length-1]\n    console.log(&#39;现在取出的冰淇淋是&#39;, top)  \n    // 将栈顶元素出栈\n    stack.pop()\n}\n\n// 栈空\nstack // []\n</code></pre></div><p>丢到控制台运行，冰淇淋就会按照后进先出的顺序被取出 <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3214df44908b41f0928c51ed5e93cc58~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3214df44908b41f0928c51ed5e93cc58~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><h2 id="队列（queue）——只用-push-和-shift-完成增删的“数组”"><a class="header-anchor" href="#队列（queue）——只用-push-和-shift-完成增删的“数组”" aria-hidden="true">#</a> 队列（Queue）——只用 push 和 shift 完成增删的“数组”</h2><p>队列是一种<strong>先进先出</strong>（FIFO，First In First Out）的数据结构。<br> 它比较像咱们去肯德基排队点餐。先点餐的人先出餐，后点餐的人后出餐</p><p>特征：</p><ul><li>只允许从队尾添加元素</li><li>只允许从队头删除元素</li></ul><p>也就是说整个过程只涉及了数组的 push 和 shift 方法。<br> 在栈元素出栈时，我们关心的是栈顶元素（数组的最后一个元素）；队列元素出队时，我们关心的则是队头元素（数组的第一个元素）。</p><p>下面我们基于数组来实现一波队列的常用操作，完成“小册姐排队”和“小册姐取餐”的过程：</p><div class="language-"><pre><code>const queue = []  \nqueue.push(&#39;小册一姐&#39;)\nqueue.push(&#39;小册二姐&#39;)\nqueue.push(&#39;小册三姐&#39;)  \n  \nwhile(queue.length) {\n    // 单纯访问队头元素（不出队）\n    const top = queue[0]\n    console.log(top,&#39;取餐&#39;)\n    // 将队头元素出队\n    queue.shift()\n}\n\n// 队空\nqueue // []\n</code></pre></div><p>把上面代码丢进控制台运行，我们可以看到小册姐一个接一个地乖乖去取餐了： <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d209732f39cf42da991a17d47dbe1d36~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d209732f39cf42da991a17d47dbe1d36~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><h2 id="链表"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h2><p>数组的元素是连续的，每个元素的内存地址可以根据其索引距离数组头部的距离来计算出来。因此对数组来说，每一个元素都可以通过数组的索引下标直接定位。 <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36ee8a2b5e554d1e99125a3ace41f65a~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36ee8a2b5e554d1e99125a3ace41f65a~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><p>链表：元素和元素之间似乎毫无内存上的瓜葛可言,允许散落在内存空间的各个角落里 <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87081b9e7fea480bb20225830f141e9b~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87081b9e7fea480bb20225830f141e9b~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><p>因此我们需要<strong>创造联系</strong></p><p>在链表中，每一个结点的结构都包括了两部分的内容：<strong>数据域和指针域</strong>。JS 中的链表，是以嵌套的对象的形式来实现的：</p><div class="language-"><pre><code>{\n    // 数据域\n    val: 1,\n    // 指针域，指向下一个结点\n    next: {\n        val:2,\n        next: ...\n    }\n}   \n</code></pre></div><p>数据域存储的是当前结点所存储的数据值，而指针域则代表下一个结点（后继结点）的引用。 有了 next 指针来记录后继结点的引用，每一个结点至少都能知道自己后面的同学是哪位了，原本相互独立的结点之间就有了如下的联系： <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d0baf800bfb4b5bb81f6fbc83dfdb9c~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d0baf800bfb4b5bb81f6fbc83dfdb9c~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><p>我们把这个关系给简化一下： <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae5e9931272d49e18d96122dfa186e86~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae5e9931272d49e18d96122dfa186e86~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><p>要想访问链表中的任何一个元素，我们都得从起点结点开始，逐个访问 next，一直访问到目标结点为止。为了确保起点结点是可抵达的，我们有时还会设定一个 <strong>head</strong> 指针来专门指向链表的开始位置： <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/981d8c74866d4aefb8b695c9e4ed0e1e~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/981d8c74866d4aefb8b695c9e4ed0e1e~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a> 以上，就是链表的基本形态啦。</p><h3 id="链表结点的创建"><a class="header-anchor" href="#链表结点的创建" aria-hidden="true">#</a> 链表结点的创建</h3><p>创建链表结点，咱们需要一个构造函数：</p><div class="language-"><pre><code>function ListNode(val) {\n    this.val = val;\n    this.next = null;\n}\n</code></pre></div><p>在使用构造函数创建结点时，传入 val （数据域对应的值内容）、指定 next （下一个链表结点）即可：</p><div class="language-"><pre><code>const node = new ListNode(1)  \nnode.next = new ListNode(2)\n</code></pre></div><p>以上，就创建出了一个数据域值为1，next 结点数据域值为2的链表结点： <a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/816ad2c296f74df78342093e4d6edcf6~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/816ad2c296f74df78342093e4d6edcf6~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><h3 id="链表元素的添加"><a class="header-anchor" href="#链表元素的添加" aria-hidden="true">#</a> 链表元素的添加</h3><p><strong>在尾部添加结点，将链表末尾结点的next指向新结点</strong></p><div class="language-"><pre><code>const node3 = new ListNode(3)  //要添加的新结点\nnode2.next = node3 //将链表末尾结点的next指向新结点即可\n</code></pre></div><p><a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97312baddfb342128ffb9c205bedccac~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97312baddfb342128ffb9c205bedccac~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><p><strong>在任意位置插入结点，变更的是<code>前驱结点和目标结点</code>的 next 指针指向</strong></p><div class="language-"><pre><code>const node3 = new ListNode(3)     \nnode1.next = node3  //将前驱结点的next指向新结点\nnode3.next = node2.next  //将新结点的next指向后驱结点\n</code></pre></div><p><a data-fancybox title="img" href="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faf00f911dc04864ae52a6343dacafa2~tplv-k3u1fbpfcp-watermark.awebp"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faf00f911dc04864ae52a6343dacafa2~tplv-k3u1fbpfcp-watermark.awebp" alt="img"></a></p><h3 id="链表元素的删除"><a class="header-anchor" href="#链表元素的删除" aria-hidden="true">#</a> 链表元素的删除</h3><p>让目标结点的前驱结点指向目标节点的next即可。如此一来，目标节点被删除后就成为了一个完全不可抵达的结点了，它会被 JS 的垃圾回收器自动回收掉。</p><h3 id="链表和数组的辨析"><a class="header-anchor" href="#链表和数组的辨析" aria-hidden="true">#</a> 链表和数组的辨析</h3><p>在大多数的计算机语言中，数组都对应着一段连续的内存。如果我们想要在任意位置删除一个元素，那么该位置往后的所有元素，都需要往前挪一个位置；相应地，如果要在任意位置新增一个元素，那么该位置往后的所有元素也都要往后挪一个位置。<br><strong>我们假设数组的长度是 n，那么因增加/删除操作导致需要移动的元素数量，就会随着数组长度 n 的增大而增大，呈一个线性关系。所以说数组增加/删除操作对应的复杂度就是 O(n)。</strong></p><p>在 js 中，一个数组只定义了一种类型的元素，它才是连续内存的。</p><div class="language-"><pre><code>const arr = [1,2,3,4]\n</code></pre></div><p>但如果我们定义了不同类型的元素,它对应的就是一段<code>非连续的内存</code>。此时，JS 数组不再具有数组的特征，其底层使用<code>哈希映射分配内存空间，是由对象链表来实现</code>的。</p><div class="language-"><pre><code>const arr = [&#39;haha&#39;, 1, {a:1}]\n</code></pre></div><p><strong>何谓“真正的数组”？</strong><br> 在各大教材（包括百科词条）对数组的定义中，都有一个“存储在连续的内存空间里”这样的必要条件。<br> JS 数组和常规数组的不同,<strong>“JS 数组未必是真正的数组”</strong></p><p>因此：相对于数组来说，链表有一个明显的优点，就是添加和删除元素都不需要挪动多余的元素。</p><h3 id="高效的增删操作"><a class="header-anchor" href="#高效的增删操作" aria-hidden="true">#</a> 高效的增删操作</h3><p>在链表中，添加和删除操作的复杂度是固定的——不管链表里面的结点个数 n 有多大，只要我们明确了要插入/删除的目标位置，那么我们需要做的都仅仅是改变目标结点及其前驱/后继结点的指针指向。 因此我们说链表增删操作的复杂度是常数级别的复杂度，用大 O 表示法表示为 <strong>O(1)</strong>。</p><h3 id="麻烦的访问操作"><a class="header-anchor" href="#麻烦的访问操作" aria-hidden="true">#</a> 麻烦的访问操作</h3><p>但是链表也有一个弊端：当我们试图读取某一个特定的链表结点时，必须遍历整个链表来查找它。比如说我要在一个长度为 n（n&gt;10） 的链表里，定位它的第 10 个结点，我需要这样做：</p><div class="language-"><pre><code>// 记录目标结点的位置\nconst index = 10  \n// 设一个游标指向链表第一个结点，从第一个结点开始遍历\nlet node = head  \n// 反复遍历到第10个结点为止\nfor(let i=0;i&lt;index&amp;&amp;node;i++) {\n    node = node.next\n}\n</code></pre></div><p>随着链表长度的增加，我们搜索的范围也会变大、遍历其中任意元素的时间成本自然随之提高。这个变化的趋势呈线性规律，用大 O 表示法表示为 <strong>O(n)</strong>。</p><p>但在数组中，我们直接访问索引、可以做到一步到位，这个操作的复杂度会被降级为常数级别(O(1))：arr[9]</p><h3 id="总结"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>链表的插入/删除效率较高，而访问效率较低；数组的访问效率较高，而插入效率较低。</p><h2 id="树"><a class="header-anchor" href="#树" aria-hidden="true">#</a> 树</h2><p><a data-fancybox title="img" href="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b267f22329~tplv-t2oaga2asx-watermark.awebp"><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b267f22329~tplv-t2oaga2asx-watermark.awebp" alt="img"></a></p><p>讲解树的关键特性和重点概念,牢记以下几点：</p><ul><li>树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推。</li><li>结点和树的“高度”计算规则：叶子结点高度记为1，每向上一层高度就加1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”。</li><li>“度”的概念：一个结点开叉出去多少个子树，被记为结点的“度”。比如我们上图中，根结点的“度”就是3。</li><li>“叶子结点”：叶子结点就是度为0的结点。在上图中，最后一层的结点的度全部为0，所以这一层的结点都是叶子结点。</li></ul><h3 id="理解二叉树结构"><a class="header-anchor" href="#理解二叉树结构" aria-hidden="true">#</a> 理解二叉树结构</h3><p>二叉树是指满足以下要求的树：</p><ul><li>它可以没有根结点，作为一棵空树存在</li><li>本身是有序树；</li><li>树中包含的各个节点的度不能超过 2，即只能是 0、1 或者 2；</li><li>如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树。如下图完全二叉树：</li></ul><p><a data-fancybox title="img" href="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b275ab6309~tplv-t2oaga2asx-watermark.awebp"><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b275ab6309~tplv-t2oaga2asx-watermark.awebp" alt="img"></a></p><p>如果二叉树中除去最后一层节点为满二叉树，且最后一层的结点依次从左到右分布，则此二叉树被称为完全二叉树。</p><p><a data-fancybox title="image.png" href="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c1b5e45cfc544a2a4689f0892e18d8b~tplv-k3u1fbpfcp-watermark.image?"><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c1b5e45cfc544a2a4689f0892e18d8b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></a></p><p>注意，二叉树不能被简单定义为每个结点的度都是2的树。普通的树并不会区分左子树和右子树，但在二叉树中，左右子树的位置是严格约定、不能交换的。对应到图上来看，也就意味着 B 和 C、D 和 E、F 和 G 是不能互换的。</p><h3 id="二叉树的编码实现"><a class="header-anchor" href="#二叉树的编码实现" aria-hidden="true">#</a> 二叉树的编码实现</h3><p>在 JS 中，二叉树使用对象来定义。它的结构分为三块：</p><ul><li>数据域</li><li>左侧子结点（左子树根结点）的引用</li><li>右侧子结点（右子树根结点）的引用</li></ul><p>在定义二叉树构造函数时，我们需要把左侧子结点和右侧子结点都预置为空：</p><div class="language-"><pre><code>// 二叉树结点的构造函数\nfunction TreeNode(val) {\n    this.val = val;\n    this.left = this.right = null;\n}\n</code></pre></div><p>当你需要新建一个二叉树结点时，直接调用构造函数、传入数据域的值就行了：</p><div class="language-"><pre><code>const node  = new TreeNode(1)\n</code></pre></div><p>如此便能得到一个值为 1 的二叉树结点，从结构上来说，它长这样：</p><p><a data-fancybox title="img" href="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b26ae0d174~tplv-t2oaga2asx-watermark.awebp"><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b26ae0d174~tplv-t2oaga2asx-watermark.awebp" alt="img"></a></p><p>以这个结点为根结点，我们可以通过给 left/right 赋值拓展其子树信息，延展出一棵二叉树。因此从更加细化的角度来看，一棵二叉树的形态实际是这样的：</p><p><a data-fancybox title="img" href="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b268b61522~tplv-t2oaga2asx-watermark.awebp"><img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b268b61522~tplv-t2oaga2asx-watermark.awebp" alt="img"></a></p>',131);r.render=function(t,p,r,n,s,c){return a(),e("div",null,[i])};export default r;export{p as __pageData};
