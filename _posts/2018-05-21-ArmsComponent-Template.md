---
layout: post
title: MVPArms官方首发一键生成组件化,体验纯傻瓜式组件化开发
tags: [Architecture]
modified: 2018-05-07
image:
  feature: abstract-1.jpg
---

# 前言
我在 [上篇文章](https://www.jianshu.com/p/f671dd76868f) 中介绍了 [MVPArms](https://github.com/JessYanCoding/MVPArms/wiki) 的官方快速组件化方案 [ArmsComponent](https://github.com/JessYanCoding/ArmsComponent/wiki)

当时一直强调 **ArmsComponent** 是 **快速** 的组件化方案, 但是在文章中只提供了一个近万字的官方文档, 却没展现出这个组件化方案的快速之处

看到近万字的文档后, 新手已经开始瑟瑟发抖了? 觉得入门成本太高想放弃?

写这篇文章的意义就是为了展现 **快速** 这两个字, 到底有多快? 飞快! 

现在我可以不开玩笑的告诉大家, 官方文档上介绍的大部分内容和规范, 现在只需要一键就可以生成, 快速并且零差错, 让新手也可以很愉快的玩耍组件化, 极大的提升开发体验和效率, 你还有什么理由不选择 [ArmsComponent](https://github.com/JessYanCoding/ArmsComponent/wiki) 开启组件化的大门呢？

好了, 进入正题, 大家直接看下图

![gif](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent-Template/master/art/ArmsComponent-Template.gif)

看了这个 **GIF** 图过后, 是不是已经跃跃欲试了? 点几下就可以生成组件? **Are you kidding me?** 那好, 您如果不信的话立马去安装然后试一试!

> Github : [您的 Star 是我坚持的动力 ✊](https://github.com/JessYanCoding/ArmsComponent-Template)


# 使用须知
1. 先使用 **ArmsComponent-Template** (**Module** 级一键模板) 一键搭建整体组件架构, 再使用 [MVPArmsTemplate](https://github.com/JessYanCoding/MVPArmsTemplate) (**页面** 级一键模板) 一键生成每个业务页面所需要的 **MVP** 及 **Dagger2** 相关类, 即可让什么都不懂的新手也可以一秒开始组件化项目!  

2. 若您基于本模板修改并且开源于网络, 请注明出处, 尊重开源, 才有人愿意开源, 谢谢!

# 如何安装？
请将 **NewArmsComponent** 这个文件夹复制到 **AndroidStudio Module** 模版的存放路径, 请注意是复制整个文件夹, 不是里面的内容!

**AndroidStudio Module** 模版存放路径 (**请注意 Module 级模板和页面级模板的存放路径不一样, 不要放错了!**):

* Windows : AS安装目录/plugins/android/lib/templates/gradle-projects

* Mac : /Applications/Android Studio.app/Contents/plugins/android/lib/templates/gradle-projects

**最后记得重启 AndroidStudio !**

# 如何使用?
使用时按下图步骤即可, 也可以使用快捷键, **Mac** 的快捷键是在项目名上按 **Command + n**, 选择  **Module**, **Windows** 快捷键自己百度

![step](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent-Template/master/art/step.jpeg)

# 注意事项
* 本模板是基于 [ArmsComponent](https://github.com/JessYanCoding/ArmsComponent) 开发的, 所以使用的是 **ArmsComponent** 的整体架构, 最优的方式是直接 **clone** 或下载 **ArmsComponent** 工程后, 在工程上面直接使用本模板, 开始业务的开发, 让您体验纯傻瓜式的组件化开发

* 使用本模板生成的组件马上就可以独立运行, 但是如果您想要集成调试, 还需要在宿主 **App** 中 [依赖此组件](https://github.com/JessYanCoding/ArmsComponent/blob/master/app/build.gradle#L55)
```gradle
  dependencies {
    if (!isBuildModule.toBoolean()) {
        implementation project(":ModuleZhihu")
        implementation project(":ModuleGank")
        implementation project(":ModuleGold")
        implementation project(":组件名(Module name)")
    }
  }
```


* 此模板会持续保持更新, 但只保证能够兼容最新的 **AndroidStudio 稳定版**, 暂不提供其他版本

  ![attention-1](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent-Template/master/art/attention-1.jpeg)

  ![attention-2](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent-Template/master/art/attention-2.jpeg)
  

---
**Hello 我叫Jessyan,如果您喜欢我的文章,可以在以下平台关注我**

* GitHub:  <https://github.com/JessYanCoding>
* 掘金: <https://gold.xitu.io/user/57a9dbd9165abd0061714613>
* 简书: <http://www.jianshu.com/u/1d0c0bc634db>
* 微博: <http://weibo.com/u/1786262517>

-- The end