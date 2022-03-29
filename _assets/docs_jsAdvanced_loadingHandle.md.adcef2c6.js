import{g as e,f as n,E as t}from"./common-d6bd45c0.js";const o='{"title":"设置全局变量 loading","frontmatter":{},"headers":[{"level":2,"title":"设置全局变量 loading","slug":"设置全局变量-loading"},{"level":2,"title":"在 App.vue 中做一个全局 loading 动画","slug":"在-app-vue-中做一个全局-loading-动画"},{"level":2,"title":"在 request.ts 中通过请求开始与结束状态控制 loading 的开始与结束","slug":"在-request-ts-中通过请求开始与结束状态控制-loading-的开始与结束"},{"level":2,"title":"在 api 文件中设置请求接口，以及传参方式","slug":"在-api-文件中设置请求接口，以及传参方式"},{"level":2,"title":"在页面中使用看看","slug":"在页面中使用看看"}],"relativePath":"docs/jsAdvanced/loadingHandle.md","lastUpdated":1643027116981.2046}';var a={};const l=t('<blockquote><p>页面在请求接口时，我们通常会加一个 loading 状态。如果有多个请求，当所有请求都结束才结束 loading 状态，这个时候你会怎么做？是在页面级上一个个加 promise，await，promise.all 去处理吗？这种方式确实可以，但是太繁琐了。这里我将教大家在 axios 的配置文件中去全局封装可以控制多个请求 loading 的开始与结束，以及接口是否需要 loading。</p></blockquote><p>在这里我以 vue3 项目为例，其它框架也是一样的，方法思路都一样，最核心的思想就是在接口封装文件中，通过请求数的增减来控制 loading 的展示与关闭，通过接口传参控制是否需要 loading 以及是否需要延迟合并串行的下一个请求。</p><h2 id="设置全局变量-loading"><a class="header-anchor" href="#设置全局变量-loading" aria-hidden="true">#</a> 设置全局变量 loading</h2><p>我们首先需要一个全局变量，这个变量可以控制 loading 的开始与结束，这里我使用 vuex</p><p>/src/store/modules/common.ts</p><div class="language-"><pre><code>import { Module } from &quot;vuex&quot;;\nimport { State as RootState } from &quot;../index&quot;;\n\nexport interface State {\n  loading: boolean;\n}\n\nconst state = {\n  loading: false\n};\n\nconst mutations = {\n  setLoading(state, flag: boolean) {\n    state.loading = flag;\n  },\n};\n\nexport default {\n  namespaced: true,\n  state,\n  mutations,\n} as Module&lt;State, RootState&gt;;\n\n</code></pre></div><h2 id="在-app-vue-中做一个全局-loading-动画"><a class="header-anchor" href="#在-app-vue-中做一个全局-loading-动画" aria-hidden="true">#</a> 在 App.vue 中做一个全局 loading 动画</h2><p>在 App.vue 中做一个 loading 动画，这个 loading 动画应该是绝对定位的，如果是有骨架的页面，则需要在 layout 那些页面中写，应该都懂。这里我是用 ant-design 的 spin 组件做的 loading 动画效果，通过 vuex 的 loading 变量控制显示</p><div class="language-"><pre><code>&lt;template&gt;\n  &lt;div class=&quot;spin-loading-container&quot; v-if=&quot;$store.state.common.loading&quot;&gt;\n    &lt;a-spin&gt;&lt;/a-spin&gt;\n  &lt;/div&gt;\n  &lt;router-view /&gt;\n&lt;/template&gt;\n\n&lt;style lang=&quot;less&quot;&gt;\n.spin-loading-container {\n  position: absolute;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  \n  width: 100%;\n  height: 100%;\n  \n  z-index: 999;\n  \n  background-color: rgba(255, 255, 255, 0.4);\n}\n&lt;/style&gt;\n</code></pre></div><h2 id="在-request-ts-中通过请求开始与结束状态控制-loading-的开始与结束"><a class="header-anchor" href="#在-request-ts-中通过请求开始与结束状态控制-loading-的开始与结束" aria-hidden="true">#</a> 在 request.ts 中通过请求开始与结束状态控制 loading 的开始与结束</h2><p>思路：设置一个请求数 reqNum，每有一个请求开始则+1，开始 loading 状态，请求结束则-1，当请求数 reqNum 为0时，结束 loading 状态。</p><p>通过传入的 loading 变量，判断是否要开始 loading <br> 如果是串行请求需要增加 delay 变量，判断是否需要添加延迟，合并下一个串行请求（同步请求），如果是异步的并行请求则不需要传，否则 loading 会出现一闪一闪的情况。因为项目中串行的情况还是比较少的，所以这里选择增加一个变量控制，延迟设置为150ms，emmmmmm，感觉应该还可以更小一些</p><p>/src/config/request.ts</p><div class="language-"><pre><code>//每个人的 requst 封装可能不同，但思路都是一样的\n\nimport { store } from &quot;@/store/index&quot;;\nlet reqNum = 0;\nconst startLoading = () =&gt; {\n  if (reqNum === 0) {\n    //loading 开始\n    store.commit(&quot;common/setLoading&quot;, true);\n  }\n  reqNum++;\n};\nconst endLoading = () =&gt; {\n  if (reqNum &lt;= 0) return;\n  reqNum--;\n  if (reqNum === 0) {\n    //loading 结束\n    store.commit(&quot;common/setLoading&quot;, false);\n  }\n};\n\nconst request = (options: AxiosRequestConfig = {}, loading = false , delay = false) =&gt; {\n  //请求开始的时候，判断是否有传 loading，为 true 则开始 loading\n  loading &amp;&amp; startLoading();\n  return new Promise&lt;ApiResult&gt;((resolve, reject) =&gt; {\n    instance(options)\n      .then((response: AxiosResponse) =&gt; {\n          //结束 loading，如果传了 delay 为 true，则延迟150ms用于合并下一个串行请求\n          loading &amp;&amp; setTimeout(\n          () =&gt; {\n            endLoading();\n          },\n          delay ? 150 : 0\n        );\n      })\n      .catch((result) =&gt; {\n       //结束 loading\n       endLoading();\n      });\n  });\n};\n</code></pre></div><h2 id="在-api-文件中设置请求接口，以及传参方式"><a class="header-anchor" href="#在-api-文件中设置请求接口，以及传参方式" aria-hidden="true">#</a> 在 api 文件中设置请求接口，以及传参方式</h2><p>其它都不重要，注意loading的参数位置，后面调用方法的时候，传 loading 参数进来判断是否 loading， loading 默认为 false</p><p>/src/api/apiTest.ts</p><div class="language-"><pre><code>export const requestTest1 = (data: object, loading = false, delay = false) =&gt; {\n  return request(\n    {\n      url: &quot;/mock/getUser&quot;,\n      method: &quot;GET&quot;,\n      data,\n    },\n    loading,\n    delay\n  );\n};\n\nexport const requestTest2 = (data: object, loading = false) =&gt; {\n  return request(\n    {\n      url: &quot;/mock/getUser&quot;,\n      method: &quot;GET&quot;,\n      data,\n    },\n    loading\n  );\n};\n</code></pre></div><h2 id="在页面中使用看看"><a class="header-anchor" href="#在页面中使用看看" aria-hidden="true">#</a> 在页面中使用看看</h2><p>/src/views/Home.vue</p><div class="language-"><pre><code>&lt;template&gt;\n&lt;a-button @click=&quot;clickAllLoading&quot;&gt;点击测试多个请求实现loading&lt;/a-button&gt;\n&lt;/template&gt;\n\nimport { requestTest1, requestTest2 } from &quot;@/api/apiTest&quot;;\nconst clickAllLoading = () =&gt; {\n // 模拟串行,如果是串行请求，需要在所有非最后一个请求中加 delay 为 true，传两个 true，下面跟使用 await 是一样的\n  requestTest1({}, true, true).then((res) =&gt; {\n    console.log(&quot;请求1完成&quot;, res);\n    //模拟增加延迟，因为我这个是假的请求，使用的 mock\n    setTimeout(() =&gt; {\n      requestTest2({}, true).then((res) =&gt; {\n        console.log(&quot;请求2完成&quot;, res);\n      });\n    }, 50);\n  });\n\n  // 模拟并行\n  requestTest1({}, true).then((res) =&gt; {\n    console.log(&quot;请求1完成&quot;, res);\n  });\n  requestTest2({}, true).then((res) =&gt; {\n    console.log(&quot;请求2完成&quot;, res);\n  });\n};\n</code></pre></div><p>点击运行结果</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e6899cb3a82467aa4ea0db3c3b438ec~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>总结：通过全局变量控制 loading 的显示隐藏，设置全局 loading 动画，在请求封装文件中通过控制请求数去实现多个请求的 loading 控制，在 api 文件中通过传参控制控制是否需要 loading，以及是否需要延迟合并串行的下一个请求。这个弄好之后，以后需要页面 loading 的接口，只需要传参到 api 文件的接口接收即可，再也不用在页面级上一个个去写了，最关键的就是通过请求数去合并请求以及串行的延迟合并处理，其它都没啥~觉得可以点个赞</p><p><a href="https://github.com/upJiang/jiangVue3Test" target="_blank" rel="noopener noreferrer">项目代码地址</a></p>',25);a.render=function(t,o,a,i,s,r){return n(),e("div",null,[l])};export default a;export{o as __pageData};
