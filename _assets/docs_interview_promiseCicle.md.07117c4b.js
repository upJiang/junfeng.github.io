import{g as e,f as r,j as n}from"./common-d6bd45c0.js";const o='{"title":"","frontmatter":{},"relativePath":"docs/interview/promiseCicle.md","lastUpdated":1627916256253.6855}';var t={};const c=n("p",null,"后面的输出其实都是看前面then返回的什么状态，如果没返回任何东西则默认走then， 如果抛出异常或者reject，看后面是否有处理reject的err，如果有则先执行，然后继续看返回的状态继续操作，当然reject的err只能处理上一个promise的返回，如果没有则往下找catch，catch是可以处理它上面所有未被处理的异常。",-1),l=n("p",null,"总结：处理完上一个状态后，看当前返回的状态继续执行，没有返回默认then，然后继续回调回调，chath处理上面所有未被处理，reject的err仅处理上一个promise的返回",-1),s=n("div",{class:"language-"},[n("pre",null,[n("code",null,'return new Promise((resolve,reject)=>{\n    reject("reject")\n  }).then((res)=>{\n     console.log("resolve",res)\n  },err=>{\n     console.log("reject",err)\n     //resolve("resolve")  输出resolve1然后下一个then\n    //  return Promise.reject("reject") 输出reject1然后下一个then\n    // throw new Error(\'nono\')  输出reject1然后下一个then\n    //  return 100 输出resolve1 100然后下一个then\n  }).then((res)=>{\n     console.log("resolve1",res)\n  },err=>{\n     console.log("reject1",err)\n  }).catch(err=>{\n    console.log("catch1",err)\n  })\n  .then((res)=>{\n     console.log("resolve2",res)\n  },err=>{\n     console.log("reject2",err)\n  }).catch(err=>{\n    console.log("catch2",err)\n  })\n')])],-1);t.render=function(n,o,t,a,h,j){return r(),e("div",null,[c,l,s])};export default t;export{o as __pageData};
