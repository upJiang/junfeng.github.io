import{g as e,f as s,E as n}from"./common-d6bd45c0.js";const r='{"title":"安装依赖","frontmatter":{},"headers":[{"level":2,"title":"安装依赖","slug":"安装依赖"},{"level":2,"title":"组合任务","slug":"组合任务"},{"level":2,"title":"gulp 返回","slug":"gulp-返回"},{"level":2,"title":"gulp 实战","slug":"gulp-实战"},{"level":3,"title":"创建任务","slug":"创建任务"},{"level":3,"title":"处理js","slug":"处理js"},{"level":3,"title":"处理css","slug":"处理css"},{"level":3,"title":"处理图片","slug":"处理图片"},{"level":3,"title":"处理less","slug":"处理less"}],"relativePath":"docs/jsAdvanced/gulp.md","lastUpdated":1644324626235.2224}';var a={};const i=n('<p><a href="https://www.gulpjs.com.cn/" target="_blank" rel="noopener noreferrer">gulp 官网</a></p><h2 id="安装依赖"><a class="header-anchor" href="#安装依赖" aria-hidden="true">#</a> 安装依赖</h2><div class="language-"><pre><code>// 全局安装 gulp-cli\nnpm install --global gulp-cli\n\n// 在项目下安装 gulp，目前最新是4.0版本\n// 语法跟3.0会有所不同，但3.0版本需要低版本的node，所以这里直接使用最新的\nyarn add gulp -D\n</code></pre></div><h2 id="组合任务"><a class="header-anchor" href="#组合任务" aria-hidden="true">#</a> 组合任务</h2><p>gulp 组合任务，可以任意嵌套任何深度</p><ul><li>如果需要让任务（task）按顺序执行，请使用 <code>series()</code> 方法。</li><li>对于希望以最大并发来运行的任务（tasks），可以使用 <code>parallel()</code> 方法将它们组合起来。</li></ul><div class="language-"><pre><code>const { series, parallel } = require(&#39;gulp&#39;);\n\nfunction clean(cb) {\n  // body omitted\n  cb();\n}\n\nfunction css(cb) {\n  // body omitted\n  cb();\n}\n\nfunction javascript(cb) {\n  // body omitted\n  cb();\n}\n\nexports.build = series(clean, parallel(css, javascript));\n</code></pre></div><p>当使用 <code>series()</code> 组合多个任务（task）时，任何一个任务（task）的错误将导致整个任务组合结束，并且不会进一步执行其他任务。当使用 <code>parallel()</code> 组合多个任务（task）时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务（task）可能会执行完，也可能没有执行完。</p><p>gulp <code>不再支持同步任务</code>（Synchronous tasks）。因为同步任务常常会导致难以调试的细微错误，例如忘记从任务（task）中返回 stream。</p><h2 id="gulp-返回"><a class="header-anchor" href="#gulp-返回" aria-hidden="true">#</a> gulp 返回</h2><p>gulp 任务必须要有 return，返回方式有如下几种:</p><ul><li><p>stream</p><div class="language-"><pre><code>const { src, dest } = require(&#39;gulp&#39;);\nfunction streamTask() {\n    return src(&#39;*.js&#39;)\n        .pipe(dest(&#39;output&#39;));\n    }\nexports.default = streamTask;\n</code></pre></div></li><li><p>promise</p><div class="language-"><pre><code>function promiseTask() {\n     return Promise.resolve(&#39;the value is ignored&#39;);\n}\nexports.default = promiseTask;\n</code></pre></div></li><li><p>event emitter</p><div class="language-"><pre><code>const { EventEmitter } = require(&#39;events&#39;);\nfunction eventEmitterTask() {\n    const emitter = new EventEmitter();\n    // Emit has to happen async otherwise gulp isn&#39;t listening yet\n    setTimeout(() =&gt; emitter.emit(&#39;finish&#39;), 250);\n    return emitter;\n}\n\nexports.default = eventEmitterTask;\n</code></pre></div></li><li><p>child process</p><div class="language-"><pre><code>const { exec } = require(&#39;child_process&#39;);\n\nfunction childProcessTask() {\n    return exec(&#39;date&#39;);\n}\n\nexports.default = childProcessTask;\n</code></pre></div></li><li><p>observable</p><div class="language-"><pre><code>const { Observable } = require(&#39;rxjs&#39;);\n\nfunction observableTask() {\n    return Observable.of(1, 2, 3);\n}\n\nexports.default = observableTask;\n</code></pre></div></li><li><p>callback</p><p>如果任务（task）不返回任何内容，则必须使用 callback 来指示任务已完成。在如下示例中，callback 将作为唯一一个名为 cb() 的参数传递给你的任务（task）。</p><div class="language-"><pre><code>function callbackTask(cb) {\n      // `cb()` should be called by some async work\n     cb();\n}\n\nexports.default = callbackTask;\n</code></pre></div><p>如需通过 callback 把任务（task）中的错误告知 gulp，请将 Error 作为 callback 的唯一参数。</p><div class="language-"><pre><code>function callbackError(cb) {\n    // `cb()` should be called by some async work\n     cb(new Error(&#39;kaboom&#39;));\n}\n\nexports.default = callbackError;\n</code></pre></div><p>然而，你通常会将此 callback 函数传递给另一个 API ，而不是自己调用它。</p><div class="language-"><pre><code>const fs = require(&#39;fs&#39;);\n\nfunction passingCallback(cb) {\n    fs.access(&#39;gulpfile.js&#39;, cb);\n}\n\nexports.default = passingCallback;\n</code></pre></div></li><li><p>async/await</p><p>如果不使用前面提供到几种方式，你还可以将任务（task）定义为一个 async 函数，它将利用 promise 对你的任务（task）进行包装。这将允许你使用 await 处理 promise，并使用其他同步代码。</p><div class="language-"><pre><code>const fs = require(&#39;fs&#39;);\n\nasync function asyncAwaitTask() {\n    const { version } = fs.readFileSync(&#39;package.json&#39;);\n    console.log(version);\n    await Promise.resolve(&#39;some result&#39;);\n}\n\nexports.default = asyncAwaitTask;\n</code></pre></div></li></ul><p>当你看到 <em>&quot;Did you forget to signal async completion?&quot;</em> 警告时，说明你并未使用前面提到的返回方式。你需要<strong>使用 callback 或返回 stream、promise、event emitter、child process、observable</strong>来解决此问题。</p><h2 id="gulp-实战"><a class="header-anchor" href="#gulp-实战" aria-hidden="true">#</a> gulp 实战</h2><h3 id="创建任务"><a class="header-anchor" href="#创建任务" aria-hidden="true">#</a> 创建任务</h3><p>在项目根目录创建个 <code>gulpfile.js</code> 文件,执行 <code>gulp</code> 命令后，<code>gulp</code> 会去读取 <code>gulpfile.js</code> 文件，这是 <code>gulp</code> 的入口文件，所有的指令逻辑处理都在此文件中进行。</p><p>当项目体量过大时，可以在根目录内创建个 <code>gulpfile.js</code> 文件夹，文件夹内部创建 <code>index.js</code>，可以在 <code>index.js</code> 中引入不同的处理模块.</p><p>在以前的版本中都是通过 <code>gulp.task</code> 来创建不同的任务，新版本主要通过 <code>exports.xxx</code> 来导出任务</p><div class="language-"><pre><code>function test(cb) {\n cb()\n}\n\nexports.test = test;\n</code></pre></div><p>在控制台输入指令gulp test</p><div class="language-"><pre><code>[16:41:29] Using gulpfile F:\\gulp\\gulpfile.js\n[16:41:29] Starting &#39;test&#39;...\n[16:41:29] Finished &#39;test&#39; after 1.95 ms\n</code></pre></div><p>如果将 <code>exports.test = test</code>改为 <code>exports.default=test</code>,在控制台直接输入 <code>gulp</code> 就可以直接构建了。</p><h3 id="处理js"><a class="header-anchor" href="#处理js" aria-hidden="true">#</a> 处理js</h3><p>压缩js、创建sourcemap、重命名js</p><div class="language-"><pre><code>const {\n  src, //gulp的内置方法\n  dest\n} = require(&#39;gulp&#39;);\n//重命名js文件\nconst rename = require(&#39;gulp-rename&#39;);\nconst uglify = require(&#39;gulp-uglify&#39;);\nconst sourcemaps = require(&#39;gulp-sourcemaps&#39;);\n\nfunction javascript() {\n  return src([&#39;src/js/*.js&#39;, &#39;!src/js/*.min.js&#39;]) //1.创建一个流，从src读取\n    //2.创建sourcemap\n    .pipe(sourcemaps.init()) \n    //pipe为gulp内的一个方法\n    //用于流之间的链接\n    // 3. 压缩文件\n    .pipe(uglify())\n    //4.重命名，名称后加min.js\n    .pipe(rename({\n      extname: &#39;.min.js&#39;\n    }))\n    //5.将sourcemap写入\n    .pipe(sourcemaps.write(&#39;./&#39;))\n    // 6.将文件写入build/js目录下\n    .pipe(dest(&#39;build/js&#39;))\n}\n\nexports.javascript = javascript;\n</code></pre></div><p>控制台输入指令 gulp javascript</p><p>在build/js下会生成两个文件index.min.js 以及index.min.js.map</p><h3 id="处理css"><a class="header-anchor" href="#处理css" aria-hidden="true">#</a> 处理css</h3><p>压缩css、创建sourcemap、重命名css</p><div class="language-"><pre><code>const {\n  src,\n  dest\n} = require(&#39;gulp&#39;);\nconst minifyCSS = require(&#39;gulp-clean-css&#39;);\nconst sourcemaps = require(&#39;gulp-sourcemaps&#39;);\nconst autoprefixer = require(&#39;gulp-autoprefixer&#39;);\n\nfunction css() {\n  return src(&#39;src/css/*.css&#39;) //1.流入口文件\n    //2.创建sourcemap\n    .pipe(sourcemaps.init())\n    //3.自动添加浏览器前缀\n    .pipe(autoprefixer())\n    // 4.压缩css\n    .pipe(minifyCSS())\n    //5.写入sourcemap\n    .pipe(sourcemaps.write(&#39;./&#39;))\n    //6.写入文件\n    .pipe(dest(&#39;build/css&#39;))\n}\n\nexports.css = css;\n</code></pre></div><p>控制台输入指令gulp css</p><p>在build/js下会生成两个文件index.min.css 以及index.min.css.map</p><h3 id="处理图片"><a class="header-anchor" href="#处理图片" aria-hidden="true">#</a> 处理图片</h3><div class="language-"><pre><code>const {\n  src,\n  dest\n} = require(&#39;gulp&#39;);\nconst imagemin = require(&#39;gulp-imagemin&#39;)\n\nfunction image() {\n  return src(&#39;src/images/*.*&#39;) // 1. 创建输入流\n    // 2. 压缩图片\n    .pipe(imagemin({\n      progressive: true\n    }))\n    // 3. 写入文件\n    .pipe(dest(&#39;build/images&#39;))\n}\n\nexports.image = image;\n</code></pre></div><p>控制台输入指令gulp image,可以看到图片的压缩比例</p><div class="language-"><pre><code>[17:00:07] Using gulpfile F:\\gulp-demo\\gulpfile.js\n[17:00:07] Starting &#39;image&#39;...\n[17:00:19] gulp-imagemin: Minified 3 images (saved 449 kB - 35.5%)\n[17:00:19] Finished &#39;image&#39; after 12 s\n</code></pre></div><h3 id="处理less"><a class="header-anchor" href="#处理less" aria-hidden="true">#</a> 处理less</h3><div class="language-"><pre><code>const {\n  src,\n  dest\n} = require(&#39;gulp&#39;);\nconst gulpLess = require(&#39;gulp-less&#39;);\nconst minifyCss = require(&#39;gulp-clean-css&#39;)\nconst sourcemaps = require(&#39;gulp-sourcemaps&#39;);\nconst rename = require(&#39;gulp-rename&#39;);\n\nfunction less() {\n  return src(&#39;src/less/**.less&#39;) //1.创建输入流\n    //2.创建sourcemap\n    .pipe(sourcemaps.init())\n    //3.less转为css\n    .pipe(gulpLess())\n    //4.压缩css\n    .pipe(minifyCss())\n    //5.修改名称\n    .pipe(rename({extname: &#39;.min.css&#39;}))\n    //6.写入sourcemap\n    .pipe(sourcemaps.write(&#39;./&#39;))\n    //7.写入文件\n    .pipe(dest(&#39;build/less&#39;))\n}\n\nexports.less = less;\n</code></pre></div><p>控制台输入指令 gulp less 在 build/less 下会生成两个文件 index.min.css 以及 index.min.css.map</p><p><a href="https://github.com/upJiang/gulp-study" target="_blank" rel="noopener noreferrer">项目地址</a></p>',40);a.render=function(n,r,a,c,l,p){return s(),e("div",null,[i])};export default a;export{r as __pageData};
