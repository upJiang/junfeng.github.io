import{g as e,f as n,E as t}from"./common-d6bd45c0.js";const a='{"title":"原型系统","frontmatter":{},"headers":[{"level":2,"title":"原型系统","slug":"原型系统"},{"level":2,"title":"new","slug":"new"},{"level":3,"title":"添加属性","slug":"添加属性"},{"level":2,"title":"ES6 中的类","slug":"es6-中的类"},{"level":3,"title":"继承","slug":"继承"},{"level":2,"title":"总结","slug":"总结"}],"relativePath":"docs/reStudy/js_prototype.md","lastUpdated":1635939981452.2434}';var r={};const o=t('<h2 id="原型系统"><a class="header-anchor" href="#原型系统" aria-hidden="true">#</a> 原型系统</h2><ul><li>如果所有对象都有私有字段[[prototype]]，就是对象的原型；</li><li>读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。</li></ul><p>ES6提供的操纵原型方法：</p><ul><li><p>Object.create 根据指定的原型创建新对象，原型可以是 null；</p></li><li><p>Object.getPrototypeOf 获得一个对象的原型；</p></li><li><p>Object.setPrototypeOf 设置一个对象的原型。</p><div class="language-"><pre><code>var cat = {\n    say(){\n        console.log(&quot;meow~&quot;);\n    },\n    jump(){\n        console.log(&quot;jump&quot;);\n    }\n}\n\nvar tiger = Object.create(cat,  {\n    say:{\n        writable:true,\n        configurable:true,\n        enumerable:true,\n        value:function(){\n            console.log(&quot;roar!&quot;);\n        }\n    }\n})\n\nvar anotherCat = Object.create(cat);\nanotherCat.say(); //moew~\n\nvar anotherTiger = Object.create(tiger);\nanotherTiger.say(); //roar!\n</code></pre></div></li></ul><h2 id="new"><a class="header-anchor" href="#new" aria-hidden="true">#</a> new</h2><p>new 运算接受一个构造器和一组调用参数，</p><p>实际上做了几件事：</p><ul><li>以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象；</li><li>将 this 和调用参数传给构造器，执行；</li><li>如果构造器返回的是对象，则返回，否则返回第一步创建的对象</li></ul><p>new 这样的行为，试图让函数对象在语法上跟类变得相似，但是，它客观上提供了两种方式，</p><h3 id="添加属性"><a class="header-anchor" href="#添加属性" aria-hidden="true">#</a> 添加属性</h3><h5 id="一是在构造器中添加属性，二是在构造器的-prototype-属性上添加属性。"><a class="header-anchor" href="#一是在构造器中添加属性，二是在构造器的-prototype-属性上添加属性。" aria-hidden="true">#</a> 一是在构造器中添加属性，二是在构造器的 prototype 属性上添加属性。</h5><div class="language-"><pre><code>//直接在构造器中修改 this，给 this 添加属性\nfunction c1(){\n    this.p1 = 1;\n    this.p2 = function(){\n        console.log(this.p1);\n    }\n} \nvar o1 = new c1;\no1.p2();\n\n//修改构造器的 prototype 属性指向的对象，它是从这个构造器构造出来的所有对象的原型。\nfunction c2(){\n}\nc2.prototype.p1 = 1;\nc2.prototype.p2 = function(){\n    console.log(this.p1);\n}\nvar o2 = new c2;\no2.p2();\n</code></pre></div><h2 id="es6-中的类"><a class="header-anchor" href="#es6-中的类" aria-hidden="true">#</a> ES6 中的类</h2><blockquote><p>推荐使用 ES6 的语法来定义类，而令 function 回归原本的函数语义。ES6 中引入了 class 关键字，并且在标准中删除了所有[[class]]相关的私有属性描述，类的概念正式从属性升级成语言的基础设施，从此，基于类的编程方式成为了 JavaScript 的官方编程范式。</p></blockquote><div class="language-"><pre><code>class Rectangle {\n  constructor(height, width) {\n    this.height = height;\n    this.width = width;\n  }\n  // Getter\n  get area() {\n    return this.calcArea();\n  }\n  // Method\n  calcArea() {\n    return this.height * this.width;\n  }\n}\n</code></pre></div><h3 id="继承"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3><div class="language-"><pre><code>class Animal { \n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    console.log(this.name + &#39; makes a noise.&#39;);\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name) {\n    super(name); //调用父类的构造函数\n  }\n\t//覆盖父类的方法\n  speak() {\n    console.log(this.name + &#39; barks.&#39;);\n  }\n}\n\nlet d = new Dog(&#39;Mitzie&#39;);\nd.speak(); // Mitzie barks.\n</code></pre></div><h2 id="总结"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>在新的 ES 版本中，我们不再需要模拟类了：我们有了光明正大的新语法。而原型体系同时作为一种编程范式和运行时机制存在。</p><p>我们可以自由选择原型或者类作为代码的抽象风格，但是无论我们选择哪种，理解运行时的原型系统都是很有必要的一件事。</p>',20);r.render=function(t,a,r,l,i,s){return n(),e("div",null,[o])};export default r;export{a as __pageData};
