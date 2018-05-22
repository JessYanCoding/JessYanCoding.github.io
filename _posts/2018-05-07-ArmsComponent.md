---
layout: post
title: MVPArms官方快速组件化方案开源,来自5K star的信赖
tags: [Architecture]
modified: 2018-05-07
image:
  feature: abstract-1.jpg
---

![Logo](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent/master/arts/arms_component_banner_v1.0.jpg)

- 0 [前言](#0)
   - 0.1 [起源](#0.1)
   - 0.2 [组件化方案分析](#0.2)
     - 0.2.1 [业务组件的划分和代码隔离](#0.2.1)
     - 0.2.2 [路由框架](#0.2.2)
     - 0.2.3 [基础库](#0.2.3)
   - 0.3 [ArmsComponent 的优势](#0.3)

- 1 [简介](#1)
   - 1.1 [什么是组件化?](#1.1)
   - 1.2 [为什么要组件化?](#1.2)
   - 1.3 [分析现有的组件化方案](#1.3)
   - 1.4 [如何选择组件化方案?](#1.4)
- 2 [组件化方案描述](#2)
   - 2.1 [架构图一览](#2.1)
   - 2.2 [架构图详解](#2.2)
     - 2.2.1 [宿主层](#2.2.1)
     - 2.2.2 [业务层](#2.2.2)   
         - 2.2.2.1 [业务模块的拆分](#2.2.2.1)
     - 2.2.3 [基础层](#2.2.3)
         - 2.2.3.1 [核心基础业务](#2.2.3.1)
         - 2.2.3.2 [公共服务](#2.2.3.2)
         - 2.2.3.3 [基础 SDK](#2.2.3.3)
             - 2.2.3.3.1 [MVPArms](#2.2.3.3.1)
             - 2.2.3.3.2 [UI 组件](#2.2.3.3.2)
             - 2.2.3.3.3 [其他 SDK](#2.2.3.3.3)
   - 2.3 [跨组件通信](#2.3)
     - 2.3.1 [为什么需要跨组件化通信?](#2.3.1)
     - 2.3.2 [跨组件通信场景](#2.3.2)
     - 2.3.3 [跨组件通信方案](#2.3.3)
     - 2.3.4 [跨组件通信方案分析](#2.3.4)
     - 2.3.5 [跨组件传递复杂数据格式](#2.3.5)
   - 2.4 [组件的生命周期](#2.4)
     - 2.4.1 [问题分析](#2.4.1)
     - 2.4.2 [可行方案分析](#2.4.2) 
     - 2.4.3 [最终执行方案](#2.4.3)
- 3 [项目讲解](#3)
   - 3.1 [如何让组件独立运行?](#3.1)
   - 3.2 [配置 AndroidManifest](#3.2)
   - 3.3 [配置 ConfigModule](#3.3)
   - 3.4 [RouterHub](#3.4)
   - 3.5 [EventBusHub](#3.5)
   - 3.6 [在项目中使用多个不同的域名](#3.6)



<a name="0"></a>
# 0 前言
[**MVPArms**](https://github.com/JessYanCoding/MVPArms) 从两年前开源至今, 已经累积了 **5k star**, 获得了上千个商业项目的信赖和认可

回顾两年前, 那时 **MVPArms** 还没诞生, **MVP**、**Dagger2**、**Rxjava**、**Retrofit** 这些技术在国内才刚刚开始流行, 在网上能搜索到的中文学习资料远没有现在这么丰富, 特别是 **Dagger**, 在网上能搜索到的文章甚至有很多讲的是 **Square** 的 **Dagger1**, 学习资料的匮乏加上 **Dagger2** 本身就是块硬骨头, 让本人在学习的道路上不知道多走了多少弯路

从那时开始, 让初学者都能够快速搭建一个 **MVP** + **Dagger2** + **Retrofit** + **Rxjava** 项目的种子就已经深埋在心中, 后面经过不懈的努力, **MVPArms** 终于诞生并开源了, 开源以后只是一直坚持将 **代码**, **注释** 和 **文档** 做到极致, 没想到的是, **MVPArms** 能发展到如今的体量, 感谢开源!

<a name="0.1"></a>
## 0.1 起源
这是 **MVPArms** 的起源, **ArmsComponent** 的起源同样相似, 从去年开始, 组件化逐渐火热起来, 本人也在去年年初开始在公司项目中进行组件化, 一切还算顺利

那时同样的种子继续埋在了心中, 我想让刚刚接触组件化的初学者也能快速搭建一个中小型的组件化项目, 经过一年的不断优化, 终于决定将其开源(**MVPArms** 官方组件化方案 **ArmsComponent**)

> Github : [您的 Star 是我坚持的动力 ✊](https://github.com/JessYanCoding/ArmsComponent)

<a name="0.2"></a>
## 0.2 组件化方案分析
看了很多组件化方案, 所以总结了在组件化中很重要的三个大点:

1. 基础库(网络请求、图片加载等)的封装
2. 路由框架(页面跳转, 服务提供)
3. 业务组件的划分和代码隔离

<a name="0.2.1"></a>
### 0.2.1 业务组件的划分和代码隔离
先说第三点 **业务组件的划分和代码隔离**, 现在大部分的文章都围绕着这点, 我这里发表下个人的观点, 第三点确实是很重要的一点, 不管是大厂的方案还是小厂的方案都有借鉴之处, 但是这点也是最不可能讨论出最终结果和统一解决方案的一点

每个公司、每个项目的情况都不一样, 大厂的方案真的适合您吗? 不一定, 大厂几十个业务群, 几百号开发人员, 他们的组织结构和项目规模都不是普通公司能比拟的, 如果伸拉硬套他们的方案, 进行更严格更细粒度的代码隔离, 可能产出的价值还不及您先前付出的代价, 带来效率的降低, 所以根据项目的实际情况做出灵活的调整才是项目负责人最应该干的事, 这点我在后面会有详细的介绍

<a name="0.2.2"></a>
### 0.2.2 路由框架
陆续也有很多组件化方案开源自己的 **路由框架**, 是个很不错的开始, 我觉得大家写的都不错, 各有各的优势, 本方案也决定用别人的 **路由框架**, 自己写的原理也差不多, 还不一定比别人考虑的完善, 还要自己维护, 为什么不选择一个成熟稳定的呢？

<a name="0.2.3"></a>
### 0.2.3 基础库
很多组件化文章只是在讲如何拆分以及封装基础库, 但是至今没看到有哪个组件化方案开源过完整的基础库的, 我猜测原因可能是, 组件化方案都是从商业项目不断的业务迭代中逐渐完善的, 基础库也属于公司的核心机密, 所以不可能开源

但是基础库尤其重要, 特别是兼容组件化的基础库, 这关乎到组件化方案的根基, 根基都没有, 何谈其他更高级的功能? 但是从封装到完善一个兼容组件化的基础库是需要很长时间的, 大多数中小公司是不愿意投入这个成本的

<a name="0.3"></a>
## 0.3 ArmsComponent 的优势
**ArmsComponent** 拥有一键自动生成组件功能, [可以一键搭建整体组件架构, 让您体验纯傻瓜式的组件化开发](https://github.com/JessYanCoding/ArmsComponent-Template), 虽然一键搭建功能让新手也可以一秒开始组件化项目, 但本方案还是提供有上万字的详细文档让您可以更深入的了解本方案, 并且 **JessYan** 郑重承诺, **ArmsComponent** 将和 **MVPArms** 一起持续维护下去, **ArmsComponent** 绝对是一个真正用心对待的组件化方案

**MVPArms** 是一个开源两年, 成熟稳定, 涵盖大量主流技术且兼容组件化的基础库,  **MVPArms** 使得 **ArmsComponent** 成为了唯一提供完整基础库的组件化方案, 这就是 **ArmsComponent** 相对于其他组件化方案最大的优势

因为有了 **基础库** 的存在, 再加上已有的 **路由框架**, 组件化中的三个大点就已经占有两个(**业务组件的划分和代码隔离** 在后面会有介绍), 因此使用 **ArmsComponent** 启动一个新项目, 即可快速进行组件化, 将 **Demo** (组件化项目雏形) 克隆下来后, 稍作修改, 马上就可以投入到业务的开发之中

**ArmsComponent** 对于新项目以及已经开始使用 **MVPArms** 的项目将会更加便捷, 有着优于其他组件化方案的体验, 对于那些网络请求, 图片加载等基础功能乱七八糟散落到项目各处, 没有统一抽离出来的旧项目, 建议直接使用 **MVPArms**, 开始组件化

如果您不想使用 **MVPArms**, 觉得接入成本太大, 没关系, 借鉴下 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 和 [**ArmsComponent**](https://github.com/JessYanCoding/ArmsComponent) 的代码, 尝试改造自己的项目, 也是个不错的选择

<a name="1"></a>
# 1 简介
好了, 进入正题!

<a name="1.1"></a>
## 1.1 什么是组件化?
组件化简单概括就是把一个功能完整的 **App** 或模块拆分成多个子模块, 每个子模块可以独立编译和运行, 也可以任意组合成另一个新的 **App** 或模块, 每个模块即不相互依赖但又可以相互交互, 遇到某些特殊情况甚至可以升级或者降级

<a name="1.2"></a>
## 1.2 为什么要组件化?
现在的项目随着需求的增加规模变得越来越大, 规模的增大带来了很多烦恼, 各种业务错中复杂的交织在一起, 每个业务模块之间, 代码没有约束, 带来了代码边界的模糊, 代码冲突时有发生, 更改一个小问题可能引起一些新的问题, 牵一发而动全身, 增加一个新需求, 瞻前顾后的熟悉了大量前辈们写的代码后才敢动手, 编译时间也不在断增加, 开发效率极度的下降, 在这种情况下组件化的出现就是为了解决以上的烦恼

<a name="1.3"></a>
## 1.3 分析现有的组件化方案
很多大厂的组件化方案是以 **多工程** + **多 Module** 的结构(微信, 美团等超级 **App** 更是以 **多工程** + **多 Module** + **多 P 工程(以页面为单元的代码隔离方式)** 的三级工程结构), 使用 **Git Submodule** 创建多个子仓库管理各个模块的代码, 并将各个模块的代码打包成 **AAR** 上传至私有 **Maven** 仓库使用远程版本号依赖的方式进行模块间代码的隔离

<a name="1.4"></a>
## 1.4 如何选择组件化方案?
按照康威定律, 系统架构的设计需要根据组织间的沟通结构, 因为现在大部分项目的规模和开发人员的数量以及结构还不足以需要某些大厂发布的组件化方案支撑(大厂的组织结构和项目规模都非常庞大, 他们的方案不一定完全适合所有公司的项目), 进行更严格更细粒度的代码间以及模块间的隔离, 盲目的使用某些组件化方案, 可能会带来开发效率降低, 开发成本远大于收益等情况, 性价比变低, 作为项目负责人, 应该根据项目目前的规模以及开发人员的组织结构去选择目前最适合的组件化方案, 做到以项目实际情况去制定技术方案, 而不是盲目跟随某些大厂的技术方案让项目和开发人员花费大量时间去调整和适应


<a name="2"></a>
# 2 组件化方案描述
**ArmsComponent** 目前采用的是 **单工程** + **多 Module** 的结构, 由于 **Demo** 较小仅仅为了展示基本规范, 所以也只是采用源码依赖并没有做到远程版本号依赖组件, 代码管理也只是采用 **单仓库** + **多分支** 的方式, 这样也是对于开发初期, 项目规模还较小, 开发人员也较少时, 开发效率较高的方案, 如果您的项目规模较大, 开发人员众多, 就可以采用上面提到的 **多工程** + **多 Module**, 并使用私有 **Maven** 仓库管理组件版本

**世界上没有一个方案可以完美到兼顾所有情况, 并且还满足所有人, 所有项目的需求, 所以项目负责人必须按照项目实际情况做出灵活的调整, 才能做出最适合自家项目的方案**

<a name="2.1"></a>
## 2.1 架构图一览

![ArmsComponentArchitecture](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent/master/arts/ArmsComponentArchitecture.jpeg)
<p align="center"><font color=gray>ArmsComponent 组件化架构图</font></p>

<a name="2.2"></a>
## 2.2 架构图详解
目前架构一共分为三层, 从低到高依次是基础层, 业务层和宿主层, 由于目前项目较小人员较少所以三层都集中在一个工程中, 但您可以根据项目的规模和开发人员的数量拆分成多个工程协同开发

<a name="2.2.1"></a>
### 2.2.1 宿主层
宿主层位于最上层, 主要作用是作为一个 **App** 壳, 将需要的模块组装成一个完整的 **App**, 这一层可以管理整个 **App** 的生命周期(比如 **Application** 的初始化和各种组件以及三方库的初始化)

<a name="2.2.2"></a>
### 2.2.2 业务层
业务层位于中层, 里面主要是根据业务需求和应用场景拆分过后的业务模块, 每个模块之间互不依赖, 但又可以相互交互, 比如一个商城 **App** 由 **搜索**, **订单**, **购物车**, **支付** 等业务模块组成

> **Tips: 每个业务模块都可以拥有自己独有的 SDK 依赖和自己独有的 UI 资源 (如果是其他业务模块都可以通用的 SDK 依赖 和 UI 资源 就可以将它们抽离到 [基础 SDK(CommonSDK 2.2.3.3)](#2.2.3.3) 和 [UI 组件(CommonRes 2.2.3.3.2)](#2.2.3.3.2) 中)**

<a name="2.2.2.1"></a>
#### 2.2.2.1 业务模块的拆分
写业务之前先不要急着动手敲码, 应该先根据初期的产品需求到后期的运营规划结合起来清晰的梳理一下业务在未来可能会发生的发展, 确定业务之间的边界, 以及可能会发生的变化, 最后再确定下来真正需要拆分出来的业务模块再进行拆分

<a name="2.2.3"></a>
### 2.2.3 基础层
基础层位于最底层, 里面又包括 **核心基础业务模块**、**公共服务模块**、 **基础 SDK 模块**, **核心基础业务模块** 和 **公共服务模块** 主要为业务层的每个模块服务, **基础 SDK 模块** 含有各种功能强大的团队自行封装的 **SDK** 以及第三方 **SDK**, 为整个平台的基础设施建设提供动力

<a name="2.2.3.1"></a>
#### 2.2.3.1 核心基础业务
**核心基础业务** 为 **业务层** 的每个业务模块提供一些与业务有关的基础服务, 比如在项目中以用户角色分为 2 个端口, 用户可以扮演多个角色, 但是在线上只能同时操作一个端口的业务, 这时每个端口都必须提供一个角色切换的功能, 以供用户随时在多个角色中切换,
这时在项目中就需要提供一个用于用户自由切换角色的管理类作为 **核心基础业务** 被这 2 个端口所依赖(类似 拉勾, Boss 直聘等 **App** 可以在招聘者和应聘者之间切换)

**核心基础业务** 的划分应该遵循是否为业务层大部分模块都需要的基础业务, 以及一些需要在各个业务模块之间交互的业务, 都可以划分为 **核心基础业务**

<a name="2.2.3.2"></a>
#### 2.2.3.2 公共服务
**公共服务** 是一个名为 **CommonService** 的 **Module**, 主要的作用是用于 **业务层** 各个模块之间的交互(自定义方法和类的调用), 包含自定义 **Service** 接口, 和可用于跨模块传递的自定义类

主要流程是: 

提供服务的业务模块:
> 在公共服务(**CommonService**) 中声明 **Service** 接口 (含有需要被调用的自定义方法), 然后在自己的模块中实现这个 **Service** 接口, 再通过 **ARouter API** 暴露实现类

使用服务的业务模块:
> 通过 **ARouter** 的 **API** 拿到这个 **Service** 接口(多态持有, 实际持有实现类), 即可调用 **Service** 接口中声明的自定义方法, 这样就可以达到模块之间的交互


跨模块传递的自定义类:

在 **公共服务** 中定义需要跨模块传递的自定义类后 (**Service** 中的自定义方法和 **EventBus** 中的事件实体类都可能需要用到自定义类), 就可以通过 **ARouter API**, 在各个模块的页面之间跨模块传递这个自定义对象 (**ARouter** 要求在 **URL** 中使用 **Json** 参数传递自定义对象必须实现 **SerializationService** 接口)

> **Tips: 建议在 CommonService 中给每个需要提供服务的业务模块都建立一个单独的包, 然后在这个包下放 Service 接口 和 需要跨模块传递的自定义类, 这样更好管理**

**掌握公共服务层的用法最好要了解 ARouter 的 API**

> [**点击查阅 ARouter 文档**](https://github.com/alibaba/ARouter)

<a name="2.2.3.3"></a>
#### 2.2.3.3 基础 SDK
**基础 SDK** 是一个名为 **CommonSDK** 的 **Module**, 其中包含了大量功能强大的 **SDK**, 提供给整个架构中的所有模块

<a name="2.2.3.3.1"></a>
**2.2.3.3.1 MVPArms**

**MVPArms** 是整个基础层中最重要的模块, 可谓是整个组件化架构中的心脏, 里面提供了开发一个完整项目所必须的一整套 **API** 和 **SDK**, 是整个项目的脚手架, 我用它来统一整个组件化方案的基础设施, 使每一个模块更加健壮, 因为有了 **MVPArms**, 使得 **ArmsComponent** 成为了唯一提供完整基础框架的组件化方案, 所以学习 **ArmsComponent** 之前必须先学会 **MVPArms**

> 学习 **MVPArms** 时请按以下排列顺序依次学习:

1.[**点击学习 Demo**](https://github.com/JessYanCoding/MVPArms)  

2.[**点击查阅 详细文档**](https://github.com/JessYanCoding/MVPArms/wiki)

3.[**点击下载 一键生成代码插件**](https://github.com/JessYanCoding/MVPArmsTemplate)

<a name="2.2.3.3.2"></a>
**2.2.3.3.2 UI 组件**

**基础 SDK** 中的 **UI 组件** 是一个名为 **CommonRes** 的 **Module**, 主要放置一些业务层可以通用的与 **UI** 有关的资源供所有业务层模块使用, 便于重用、管理和规范已有的资源

> **Tips: 值得注意的是, 业务层的某些模块如果出现有资源名命名相同的情况 (如两个图片命名相同), 当在宿主层集成所有模块时就会出现资源冲突的问题, 这时注意在每个模块的 build.gradle 中使用 resourcePrefix 标签给每个模块下的资源名统一加上不同的前缀即可解决此类问题**

```gradle
android {
    defaultConfig {
        minSdkVersion rootProject.ext.android["minSdkVersion"]
        ...
    }
    resourcePrefix "public_"
}
```

可以放置的资源类型有:

* 通用的 **Style**, **Theme**
* 通用的 **Layout**
* 通用的 **Color**, **Dimen**, **String**
* 通用的 **Shape**, **Selector**, **Interpolator**
* 通用的 **图片资源**
* 通用的 **动画资源**
* 通用的 **自定义 View**
* 通用的第三方 **自定义 View**

<a name="2.2.3.3.3"></a>
**2.2.3.3.3 其他 SDK**

**其他 SDK** 主要是 **基础 SDK** 依赖的一些业务层可以通用的 **第三方库** 和 **第三方 SDK** (比如 **ARouter**, **腾讯 X5 内核**), 便于重用、管理和规范已有的 **SDK** 依赖

<a name="2.3"></a>
## 2.3 跨组件通信

<a name="2.3.1"></a>
### 2.3.1 为什么需要跨组件通信?
因为各个业务模块之间是各自独立的, 并不会存在相互依赖的关系, 所以一个业务模块是访问不了其他业务模块的代码的, 如果想从 **A** 业务模块的 **A** 页面跳转到 **B** 业务模块的 **B** 页面, 光靠模块自身是不能实现的, 所以这时必须依靠外界的其他媒介提供这个跨组件通信的服务

<a name="2.3.2"></a>
### 2.3.2 跨组件通信场景
跨组件通信主要有以下两种场景:

* 第一种是组件之间的页面跳转 (**Activity** 到 **Activity**,  **Fragment** 到 **Fragment**, **Activity** 到 **Fragment**, **Fragment** 到 **Activity**) 以及跳转时的数据传递 (基础数据类型和可序列化的自定义类类型)

* 第二种是组件之间的自定义类和自定义方法的调用(组件向外提供服务)

<a name="2.3.3"></a>
### 2.3.3 跨组件通信方案
其实以上两种通信场景甚至其他更高阶的功能在 **ARouter** 中都已经被实现, **ARouter** 是 **Alibaba** 开源的一个 **Android** 路由中间件, 可以满足很多组件化的需求, 也是作为本方案中比较重要的一环, 需要认真看下文档, 了解下基本使用

关于跨组件通信框架, 本方案不做封装, 专业的事交给专业的人做, 此类优秀框架为数众多, 各有特点, 可以根据您的需求选择您喜欢的框架, 不一定非得是 **ARouter**, 选择 **ARouter** 也是因为 **Alibaba** 出品, 开源时间较长, 使用者众多, 相对稳定, 出现问题比较好沟通

<a name="2.3.4"></a>
### 2.3.4 跨组件通信方案分析
第一种组件之间的页面跳转不需要过多描述了, 算是 **ARouter** 中最基础的功能, **API** 也比较简单, 跳转时想传递不同类型的数据也提供有相应的 **API** (如果想通过在 **URL** 中使用 **Json** 参数传递自定义对象, 需要实现  **SerializationService**, 详情请查阅 [ARouter 文档](https://github.com/alibaba/ARouter));

第二种组件之间的自定义类和自定义方法的调用要稍微复杂点, 需要 **ARouter** 配合架构中的 公共服务(**CommonService**) 实现, 主要流程在 [公共服务(**2.2.3.2**)](#2.2.3.2) 中已有介绍, 这里我画了个示意图, 以便大家更好理解

![Router](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent/master/arts/Router.jpeg)
<p align="center"><font color=gray>跨组件通信示意图</font></p>

此种服务提供方式叫作 **接口下沉**, 看图的同时请配合阅读 [公共服务(**2.2.3.2**)](#2.2.3.2) 中的主要流程便于理解

本方案中还提供有 **EventBus** 来作为服务提供的另一种方式, 大家知道 **EventBus** 因为其解耦的特性, 如果被滥用的话会使项目调用层次结构混乱, 不便于维护和调试, 所以本方案使用 [**AndroidEventBus**](https://github.com/hehonghui/AndroidEventBus) 其独有的 **Tag**, 可以在开发时更容易定位发送事件和接受事件的代码, 如果以组件名来作为 **Tag** 的前缀进行分组, 也可以更好的统一管理和查看每个组件的事件, 当然也不建议大家过多使用 **EventBus**

> **Tips: 每个跨组件通信框架提供服务的方式都不同, 您也可以选择其他框架的服务提供方式**

<a name="2.3.5"></a>
### 2.3.5 跨组件传递复杂数据格式
在一般情况下基本数据类型就可以满足大多数跨组件传递数据的需求, 但是在某些情况下也会需要传递复杂的自定义数据类型, 传递自定义类型在方案中也提供有两种方式:

第一种在 [公共服务(**2.2.3.2**)](#2.2.3.2) 中已提及, 就是在 **公共服务 (CommonService)** 中定义这个自定义类

第二种方式也比较简单, 直接通过解析 **Json** 字符串就可以传递

<a name="2.4"></a>
## 2.4 组件的生命周期
每个组件 (模块) 在测试阶段都可以独立运行, 在独立运行时每个组件都可以指定自己的 **Application**, 这时组件自己管理生命周期就轻而易举, 比如想在 **onCreate** 中初始化一些代码都可以轻松做到, 但是当进入集成调试阶段, 组件自己的 **Application** 已不可用, 每个组件都只能依赖于宿主的生命周期, 这时每个组件如果需要初始化自己独有的代码, 该怎么办? 

<a name="2.4.1"></a>
### 2.4.1 问题分析
在集成调试阶段, 宿主依赖所有组件, 但是每个组件却不能依赖宿主, 意思是每个组件根本不知道自己的宿主是谁, 当然也就不能通过访问代码的方式直接调用宿主的方法, 从而在宿主的生命周期里加入自己的逻辑代码

如果直接将每个模块的初始化代码直接复制进宿主的生命周期里, 这样未免过于暴力, 不仅代码耦合不易扩展, 而且代码还极易冲突, 所以修改宿主源码的方式也不可行

所以有没有什么方法可以让每个组件在集成调试阶段都可以独自管理自己的生命周期呢?

其实解决思路很简单, 无非就是在开发时让每个组件可以独立管理自己的生命周期, 在运行时又可以让每个组件的生命周期与宿主的生命周期进行合并 (在不修改或增加宿主代码的情况下完成)

<a name="2.4.2"></a>
### 2.4.2 可行方案分析
想在不更改宿主代码的情况下在宿主的生命周期中动态插入每个组件的代码, 这倒有点像 **AOP** 的意思

现有的解决方案大概有三种: 

1. 在基础层中提供一个用于管理组件生命周期的管理类, 每个组件都手动将自己的生命周期实现类注册进这个管理类, 在集成调试时, 宿主在自己的 **Application** 对应生命周期方法中通过管理类去遍历调用注册的所有生命周期实现类即可

2. 使用 **AnnotationProcessor** 解析注解在编译期间生成源代码自动注册所有组件的生命周期实现类, 然后宿主再在对应的生命周期方法中去调用
3. 使用 **Javassist** 在编译时动态修改 **class** 文件, 直接在宿主的对应生命周期方法中插入每个组件的生命周期逻辑

我最后还是选择了第一种方法, 因为后面两种方法虽然使用简单, 还可以自动化的完成所有操作, 非常炫酷, 但是这两种方法技术实现复杂, 在不同的 **Gradle** 版本中还会出现兼容性问题影响整个项目的开发进度, 较难维护, 还会增加编译时间

选择第一种方法虽然增加了几步操作, 但是简单明了, 便与理解和维护, 后续人员加入也可以很快上手, 不受 **Gradle** 版本的影响, 也不会增加编译时间

<a name="2.4.3"></a>
### 2.4.3 最终执行方案
第一种方案具体原理也没什么好说的, 比较简单, 大概就是在基础层中定义有生命周期方法 (**attachBaseContext(), onCreate()** ...) 的接口, 每个组件实现这个接口, 然后将实现类注册进基础层的管理器, 宿主通过管理器在对应的生命周期方法中调用所有的接口实现类, 典型的观察者模式, 类似注册点击事件

在 **MVPArms** 中这种方案的实现类叫作 **ConfigModule**, 每个组件都可以声明一个或多个 **ConfigModule** 实现类, 内部实现较为复杂, 实现原理是 **反射** + **代理** + **观察者**, 这个类也是整个 **MVPArms** 框架提供给开发者最重要的类

它可以给 **MVPArms** 框架配置大量的自定义参数, 包括项目中所有生命周期的管理 (**Application**, **Activity**, **Fragment**), 项目中所有网络请求的管理 (**Retrofit**, **Okhttp**, **Glide**),为框架提供了极大的扩展性, 使框架更加灵活

<a name="3"></a>
# 3 项目讲解

![ArmsComponent](https://raw.githubusercontent.com/JessYanCoding/ArmsComponent/master/arts/ArmsComponent.gif)

> 项目地址 : [ArmsComponent](https://github.com/JessYanCoding/ArmsComponent)

<a name="3.1"></a>
## 3.1 如何让组件独立运行?
在项目根目录的 **gradle.properties** 中, 改变 **isBuildModule** 的值即可

```gradle
#isBuildModule 为 true 时可以使每个组件独立运行, false 则可以将所有组件集成到宿主 App 中
isBuildModule=true
```

<a name="3.2"></a>
## 3.2 配置 AndroidManifest
由于组件在独立运行时和集成到宿主时可能需要 **AndroidManifest** 配置不一样的参数, 比如组件在独立运行时需要其中的一个 **Activity** 配置了 `<action android:name="android.intent.action.MAIN"/>` 作为入口, 而当组件集成到宿主中时, 则依赖于宿主的入口, 所以不需要配置 `<action android:name="android.intent.action.MAIN"/>`, 这时我们就需要两个不同的 **AndroidManifest** 应对不同的情况

在组件的 **build.gradle** 中加入以下代码, 即可指定不同的 **AndroidManifest**, 具体请看项目代码

```gradle
android {
	sourceSets {
        main {
            jniLibs.srcDirs = ['libs']
            if (isBuildModule.toBoolean()) {
                manifest.srcFile 'src/main/debug/AndroidManifest.xml'
            } else {
                manifest.srcFile 'src/main/release/AndroidManifest.xml'
            }
        }
    }
}
```

<a name="3.3"></a>
## 3.3 配置 ConfigModule(GlobalConfiguration)
**ConfigModule** 在 [最终执行方案(2.4.3)](#2.4.3) 中提到过, **GlobalConfiguration** 是实现类, 他可以给框架配置大量的自定义参数

项目 **CommonSDK** 中提供有一个 **GlobalConfiguration** 用于配置每个组件都会用到的公用配置信息, 但是每个组件可能都需要有一些私有配置, 比如初始化一些特有属性, 所以在每个组件中也需要实现 **ConfigModule**, 具体请看项目代码

需要注意的是, 在 [配置 AndroidManifest(3.2)](#3.2) 中提到过组件在独立运行时和集成到宿主时所需要的配置是不一样的, 当组件在独立运行时需要在 **AndroidManifest** 中声明自己私有的 **GlobalConfiguration** 和 **CommonSDK** 公有的  **GlobalConfiguration**, 但在集成到宿主时, 由于宿主已经声明了 **CommonSDK** 的公有 **GlobalConfiguration**, 所以在 **AndroidManifest** 只需要声明自己私有的 **GlobalConfiguration**, 这里也说明了 **AndroidManifest** 在不同的情况需要做出不同的配置

<a name="3.4"></a>
## 3.4 RouterHub
**RouterHub** 用来定义路由器的路由地址, 以组件名作为前缀, 对每个组件的路由地址进行分组, 可以统一查看和管理所有分组的路由地址

路由地址的命名规则为 **组件名 + 页面名**, 如订单组件的订单详情页的路由地址可以命名为 **"/order/OrderDetailActivity"**

**ARouter** 将路由地址中第一个 **'/'** 后面的字符叫作 **Group**, 比如上面的示例路由地址中 **order** 就是 **Group**, 以 **order** 开头的地址都被分配该  **Group** 下

> **Tips: 切记不同的组件中不能出现名称一样的 Group, 否则会发生该 Group 下的部分路由地址找不到的情况!!!**

所以每个组件使用自己的组件名作为 **Group** 是比较好的选择, 毕竟组件不会重名



<a name="3.5"></a>
## 3.5 EventBusHub
**AndroidEventBus** 作为本方案提供的另一种跨组件通信方式 (第一种跨组件通信方式是 [公共服务(**2.2.3.2**)](#2.2.3.2)), **AndroidEventBus** 比 **greenrobot** 的 **EventBus** 多了一个 **Tag**, 在组件化中更容定位和管理事件

**EventBusHub** 用来定义 **AndroidEventBus** 的 **Tag** 字符串, 以组件名作为 **Tag** 前缀, 对每个组件的事件进行分组

**Tag** 的命名规则为 **组件名** + **页面名** + **动作**, 
比如需要使用 **AndroidEventBus** 通知订单组件的订单详情页进行刷新, 可以将这个刷新方法的 **Tag** 命名为 **"order/OrderDetailActivity/refresh"**

<a name="3.6"></a>
## 3.6 在项目中使用多个不同的域名
在项目中, 有 **知乎** 、**干货集中营**、**稀土掘金** 三个模块, 这三个模块网络接口的域名都不一样, 但是在项目中却可以统一使用框架提供的同一个 **Retrofit** 进行网络请求, 这是怎么做到的呢? 这是采用本人的另一个库 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager), 它可以使 **Retrofit** 同时支持多个 **BaseUrl** 以及动态改变 **BaseUrl**
