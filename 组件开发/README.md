1.subPackages分割加载

  分割加载需要用原声的subPackages属性

  该属性需要  root分包根目录  name别名 pages分包页面路径

2.组件编写

  被引入组件的页面,需要在.json文件下配置 usingComponents:{} 别名和引用的笛之爱
  wxml页面引用别名,

  向被引入页面传值:和被引入页面名字对齐 showBgpack="{{}}"

  接收被引入页面传的值:bind:父级的名字="绑定名"

  引入组件页面需要在.json文件下配置 "component": true组件的属性

  在引入组件的js页面写入
    Component({
      properties:{//接收参数
        showBgpack:{//参数名
          type: Boolean,//类型
          value: false//值
          },
      }
      data:{}//设置默认值
      methods:{//时间绑定
      this.triggerEvent('父级名字', {参数 });//像父级传参
    
      }
    })
