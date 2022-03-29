import{g as e,f as o,E as t}from"./common-d6bd45c0.js";const a='{"title":"react的常用hook钩子","frontmatter":{},"headers":[{"level":2,"title":"react的常用hook钩子","slug":"react的常用hook钩子"}],"relativePath":"docs/interview/reactBaseQuestion.md","lastUpdated":1628519238331.0137}';var r={};const l=t('<p><a href="https://juejin.cn/post/6844903988073070606" target="_blank" rel="noopener noreferrer">35 道咱们必须要清楚的 React 面试题</a></p><h2 id="react的常用hook钩子"><a class="header-anchor" href="#react的常用hook钩子" aria-hidden="true">#</a> react的常用hook钩子</h2><ol><li>useState；定义一个hook数组，数组第一个传入的是state数据的名字，数组第二位是方法用来更新这个hook的数据；useState传入的是该hook的默认值。</li><li>useContext：类似redux和mobx全局store的功能</li><li>useReducer：类似redux通过发布dispatch触发数据更新</li><li>useCallback：在数据更新之后执行的方法 5.useMemo在count改变时触发可以避免非必要渲染(类似vue的计算属性)</li><li>useRef，useImperativeHandle：这两个放到一起来说，主要是hook进行父子组件间的通信</li><li>useEffect： 这个api主要是在更新这个hook的数据的方法执行后的一个回调方法可以传入两个参数，第一个参数是一个callback回调函数；第二个参数是对应哪写hook更新后才执行不传为所有hook更新都执行，形式为数组。useEffect有点类似vue中的watch监听。</li></ol>',3);r.render=function(t,a,r,s,i,c){return o(),e("div",null,[l])};export default r;export{a as __pageData};
