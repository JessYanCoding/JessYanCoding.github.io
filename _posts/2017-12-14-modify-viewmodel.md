---
layout: post
title: 改造 Android 官方架构组件 ViewModel
tags: [Activity,Fragment]
modified: 2017-12-14
image:
  feature: abstract-1.jpg
---

# 前言

Android 官方架构组件在今年 5 月份 Google I/O 大会上被公布, 直到 11 月份一直都是测试版, 由于工作比较繁忙, 期间我只是看过类似的文章, 但没有在实际项目中使用过, 更没有看过源码, 所以对这几个组件的使用很是生疏, 同时也觉得这几个组件非常高大上, 非常神秘!

直到 11 月份 Android 官方架构组件正式版发布, 并且 Google 也在 **Support Library v26.1.0** 以后的版本中内嵌了 Android 官方架构组件中的生命周期组件, 我想, 这是趋势, 既然 Google 这么推崇, 那我也是时候学习一波并将它们引入 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 框架了

> Github : [你的 Star 是我坚持的动力 ✊](https://github.com/JessYanCoding/LifecycleModel)

# 简单介绍

因为想将 Android 官方架构组件引入 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 框架之中, 所以我认真学习了 Android 官方架构组件中除了 **Room** 之外的所有源码, 以考察是否整个组件都适合引入 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 框架

在学习完源码过后, 发现 Android 官方架构组件其实并没有想象的那么高深, 原理反而是我们在日常开发中都会用到的知识点, 那我就在文章的开头先简单的介绍下 Android 官方架构组件中的这几个组件

## Lifecycles

生命周期组件是 Android 官方架构组件中的核心组件, 它可以使各种实例作为观察者与 **Activity** 和 **Fragment** 等具有生命周期特性的组件绑定在一起, **LiveData** 和 **ViewModel** 都是基于此组件, 简而言之就是, 你将需要绑定生命周期的实例注册给该组件, 该组件就会在你指定的某个生命周期方法执行时通知这个实例

应用场景很多, 比如之前在 **MVP** 架构中, 你需要在 **Activity** 执行 **onCreate** 时, 让 **Presenter** 初始化一些操作, 这时就不用在 **Activity** 的 **onCreate** 中再调用 **Presenter** 的某个初始化方法了, 直接使用官方的生命周期组件即可完成, 在 **Activity** 执行 **onDestroy** 时需要释放一些对象的资源, 也可以使用到生命周期组件

## LiveData

**LiveData** 具有两个功能, 第一个功能是观察者模式, 在 **Value** 发生变化时通知之前注册的所有观察者, 第二功能是基于生命周期组件与 **Activity** 和 **Fragment** 等具有生命周期特性的组件绑定在一起, 在生命周期发生改变时停止或恢复之前的事件

简而言之就是, 当某个页面请求网络数据成功后需要同步 **UI**, 但这个页面已经不可见, 这时就会停止同步 **UI** 的操作

## ViewModel

**ViewModel** 有两个功能, 第一个功能可以使 **ViewModel** 以及 **ViewModel** 中的数据在屏幕旋转或配置更改引起的 **Activity** 重建时存活下来, 重建后数据可继续使用, 第二个功能可以帮助开发者轻易实现 **Fragment** 与 **Fragment** 之间, **Activity** 与 **Fragment** 之间的通讯以及共享数据

# 浅析官方架构组件

用法就不多说了, 此类文章和 **Demo** 太多了, 明白了它们的功能和应用场景后, 我们才知道它们是否真的适合自己的需求, 而不是盲目跟风, 下面我就来分析下我是如何考察新技术, 以及如何判断这些新技术是否有必要应用到自己的项目中

## Lifecycles

上面介绍了生命周期组件的功能, 这里就来分析一下生命周期组件是否有必要引入我的框架 [**MVPArms**](https://github.com/JessYanCoding/MVPArms)

说到生命周期我就想到了我之前在 [传统MVP用在项目中是真的方便还是累赘?](http://www.jianshu.com/p/ac51c9b88af3) 中讨论的一个内容

现在市面上流行的 **MVP** 架构有两种, **第一种是将 Activity 或 Fragment 作为 View, 抽象一个 Presenter 层出来**, **第二种是将 Activity 或 Fragment 作为 Presenter, 抽象一个 View 层出来**

第一种类型代表的框架有 [**MVPArms**](https://github.com/JessYanCoding/MVPArms), 第二种类型代表的框架有 [**TheMVP**](https://github.com/kymjs/TheMVP), 当然第一种类型的 **MVP** 架构在市面上用的是最多的, 那么第二种类型的优点是什么呢? 

我在上面这篇文章也说过, 主要优势有两个, **方便重用View**, 以及 **可直接与 Activity 或 Fragment 的生命周期做绑定**, 这样就可以直接使用 Activity 或 Fragment 的生命周期, 不用再去做多余的回调, 当然也有缺点, 我在文章中也有介绍, 有兴趣的可以去看看

第一种类型的 **MVP** 架构是不具有可以和 **Activity** 或 **Fragment** 的生命周期直接做绑定的优势的, 所以很是嫉妒第二种类型的 **MVP** 架构, 这也是两种类型的 **MVP** 架构最大的区别, 但你想的没错, 现在使用生命周期组件就可以使第一种类型的 **MVP** 架构很轻易的具有绑定生命周期的优势, 现在第一种类型的 **MVP** 架构将如虎添翼

经过以上的分析, 我认为生命周期组件对于我的框架来说是很有必要的, 这将使日常开发更加便捷

## LiveData

**LiveData** 与 **RxJava** 都是基于观察者模式, 功能上也有重合, Google 在官方文档上也明确表示, 如果你正在使用 **RxJava**, **Agera** 等类似功能的库, 只要你能正确的处理数据流的生命周期, 就完全可以继续使用它们来替代 **LiveData**

> Note: If you are already using a library like RxJava or Agera, you can continue using them instead of LiveData. But when you use them or other approaches, make sure you are handling the lifecycle properly such that your data streams pause when the related LifecycleOwner is stopped and the streams are destroyed when the LifecycleOwner is destroyed. You can also add the android.arch.lifecycle:reactivestreams artifact to use LiveData with another reactive streams library (for example, RxJava2).

从官方文档可以看出 Google 对此的建议就是 **RxJava**, **Agera**, **LiveData** 等类似功能的库, 你只使用一个即可



### 选择 RxJava 还是 LiveData ?

**LiveData** 和 **RxJava** 的功能的确过于重合, 我也十分赞同 Google 官方的建议, 两者之中选择其一就可以了, 没必要两者都引入项目, 而 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 框架, 也正好引入了 **RxJava**, 所以我也来分析分析在 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 框架中该选择 **LiveData** 还是 **RxJava**?

于是我认真的研究了其源码, **LiveData** 具有两个功能, 通知观察者更新数据和根据生命周期停止和恢复之前的事件, 而 **Rxjava** 加上 **RxLifecycle**, **RxJava** 加上 **AutoDispose**, 或 **Rxjava** 加上生命周期组件, 也可以轻易做到根据生命周期停止和恢复之前的事件, 在配上 **Rxjava** 强大的操作符, **LiveData** 能做的事 **RxJava** 都能做, **LiveData** 不能做的事 **RxJava** 也能做

并且 **RxJava** 不仅仅只是 **RxJava**, 他还是一个庞大的生态链, 他还有 **RxCache**, **RxLifecycle**, **RxAndroid**, **RxPermission**, **Retrofit-Adapter** 等大量并且强大的衍生库, 我们离开它做很多事都非常不便, 刚刚出生, 羽翼未丰的 **LiveData** 相比于 **RxJava** 将没有任何优势, 甚至显得非常简陋

因此 **LiveData** 和 **RxJava** 之间如果只能选择一个的话, 我没有任何理由选择 **LiveData**

## ViewModel

**ViewModel** 中有一个功能让我十分惊艳, 也十分好奇, 它可以使 **ViewModel** 以及 **ViewModel** 中的数据在屏幕旋转或配置更改引起的 **Activity** 重建时存活下来, 重建后数据可继续使用, 这个功能十分实用且十分重要, 因为之前也没有一个官方解决方案, 所以我觉得很有必要将这个功能引入 [**MVPArms**](https://github.com/JessYanCoding/MVPArms) 框架

同样另外一个功能, 它还可以帮助开发者轻易实现 **Fragment** 与 **Fragment** 之间, **Activity** 与 **Fragment** 之间的通讯以及共享数据, 同样也正是我所需要的官方解决方案

但在我继续深入研究, 准备将它引入到项目中时, 却发现 Google 将这个功能做了高度封装并限制了它的使用范围, 只能用于 **ViewModel**

但我想 Google 既然能让 **MVVM** 框架中的 **ViewModel** 具有这些功能, 那我为什么不能将这个功能扩展出来提供给 **MVP** 框架中的 **Presenter**, 乃至其他更多的模块?
 
于是我认真的研究了其源码, 准备通过修改源码并封装成库的方式, 让更多的开发者在更多的场景下能够使用到这些功能


# 改造 ViewModel 组件

要想改造 **ViewModel 组件** 自然要对它的整个源码分析一遍, 知道其原理, 才知道如何下手

## 分析源码

篇幅有限, 就来简单的分析下源码把, 源码其实也就几个类, 经过了层层封装, 核心代码就在一个叫做 **HolderFragment** 的 **Fragment** 中, 

在我看来 **ViewModel 组件** 的核心原理也就是 **HolderFragment** 中的一行代码实现的:

```java
setRetainInstance(true);
```
**setRetainInstance(boolean)** 是 **Fragment** 中的一个方法, 我想很多人应该都知道这个方法的意义

简单来说将这个方法设置为 true 就可以使当前 **Fragment** 在 **Activity** 重建时存活下来, 如果不设置或者设置为 false, 当前 **Fragment** 会在 **Activity** 重建时同样发生重建, 以至于被新建的对象所替代 

意思是只要将这个方法设置为 true, **Fragment** 以及 **Fragment** 之中的所有数据都会在 **Activity** 重建时存活下来

这时我们在 **setRetainInstance(boolean)** 为 true 的 **Fragment** 中放一个专门用于存储 **ViewModel** 的 **Map**, 自然 **Map** 中所有的 **ViewModel** 都会幸免于 **Activity** 重建

于是我们让 **Activity**, **Fragment** 都绑定一个这样的 **Fragment**, 将 **ViewModel** 存放到这个 **Fragment** 的 **Map** 中, **ViewModel 组件** 就这样实现了

## 如何改造

想要知道如何改造, 那我们就要明确这次改造的最终目的是什么, 我们的目的就是要让 **ViewModel 组件** 能用于 **Presenter**, 乃至其他更多的模块, 不止是用于 **ViewModel**

那为什么 Google 官方的 **ViewModel 组件** 不能用于其他模块呢, 通过阅读源码可以知道, 是因为 **Google** 把上文提到的 **Map**, 封装了起来, 并没有提供出去, 并且限制了 **ViewModel** 的构建方式
  
**ViewModel 组件** 让一个新的 **ViewModel** 必须继承于它的基类, 并且让开发者必须提供一个 **Factory** 指明当前 **ViewModel** 的构建方式, **ViewModel 组件** 会在合适的时机, 主动去根据 **Factory** 构建 **ViewModel** 实例, 并放入 **Map** 中

这时整个构建过程都被 **ViewModel 组件** 掌控并被限制于 **ViewModel**, 所以我需要做的就是将 **Map** 和 **ViewModel** 的构建方式扩展出来, 将更多的控制权交给外部的开发者

## 实践

经过上面的分析, 思路和方案都有了, 接下来就剩下如何把思路和方案实现了

于是我结合上文分析的思路和方案对官方源码进行了改造并做了适当的优化, **LifecycleModel** 就这样诞生了

这篇文章主要还是讲在完成一个目标前, 在从 0 到 1 期间进行的思路和分析的过程, 至于细节你如果感兴趣的话还是去看我的源码把, 哈哈, 注释很详细哦!

> Github : [你的 Star 是我坚持的动力 ✊](https://github.com/JessYanCoding/LifecycleModel)

# 总结

一个新技术是否真的适合自己还是需要自己去考察, 不应该盲目跟风, 如果你只知道这个技术很火然后去用它, 不知道为什么用它, 用它的好处, 那你就会一直陷入被动学习的窘境, 一直在学习, 但是总觉得自己跟不上时代的进步, 担惊受怕, 这是现代技术人大部分都存在的处境

至于最近闹的沸沸扬扬的简书 **饱醉豚** 事件, 自从简书 **CEO** 站台后, 已经不再是当事人一个人的事, 而是关乎到简书整个平台, 既然这个 **CEO** 这么傲气, 这个平台都不在乎我们这个群体, 我们也不再去关注这个平台就是了, 流量是跟着原创作者走还是跟着平台, 自己心里没点逼数吗?
 
简书以及简书 **CEO** 最好做出深刻的道歉, 否则我也会离开简书 (好像我更文频率也不是很高把? 咳咳... 我主打的是质量! 质量! 不是数量, 逃～)

# 踩坑

在实际项目中使用 **ViewModel 组件** 时我也遇到了一些问题, 浪费了我很多时间, 所以有必要分享出来让大家少走弯路

### 通过 Activity 获取 ViewModel 时遇到的坑:
* 在 Application.ActivityLifecycleCallbacks 中的 onActivityCreated 方法中获取 ViewModel 时, Activity 每重建一次, 获取的 ViewModel 都是重新构建后的新实例, 并不能让 ViewModel 以及 ViewModel 中的数据幸免于 Activity 重建, 所以不要此方法中获取 ViewModel  

* 在 Activity 的 onDestroy 方法中不能获取 ViewModel, 会报错

### 通过 Fragment 获取 ViewModel 时遇到的坑:
* 在 FragmentManager.FragmentLifecycleCallbacks 中的 onFragmentAttached 方法中获取 ViewModel 时也会出现和 Activity 一样的情况, 获取的 ViewModel 是重新构建后的新实例, ViewModel 以及 ViewModel 中的数据不能幸免于 Activity 重建, 所以也不要此方法中获取 ViewModel  

* 在 FragmentManager.FragmentLifecycleCallbacks 中的 onFragmentDestroyed 方法中也不能获取 ViewModel, 会报错  

* 在 Fragment 的 onDestroy 方法中不能获取 ViewModel, 会报错

---
**Hello 我叫Jessyan,如果您喜欢我的文章,可以在以下平台关注我**

* GitHub:  <https://github.com/JessYanCoding>
* 掘金: <https://gold.xitu.io/user/57a9dbd9165abd0061714613>
* 简书: <http://www.jianshu.com/u/1d0c0bc634db>
* 微博: <http://weibo.com/u/1786262517>

-- The end






