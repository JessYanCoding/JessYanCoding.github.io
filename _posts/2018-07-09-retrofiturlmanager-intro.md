---
layout: post
title: 解决Retrofit多BaseUrl及运行时动态改变BaseUrl(二)
tags: [Retrofit]
modified: 2018-07-09
image:
  feature: abstract-1.jpg
---

# 前言
我在之前的文章 [《解决Retrofit多BaseUrl及运行时动态改变BaseUrl》](https://www.jianshu.com/p/2919bdb8d09a) 中，介绍了市面上能够解决此类问题的 4 个常见的解决方案，并开源了自己经过优化后的解决方案 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager)，现在再为大家带来此系列的第二篇文章，这篇文章主要介绍 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 针对 **BaseUrl** 替换逻辑的重大升级，因为这个升级对于 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 足够重要，将使 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 能够从容应对更多复杂的需求，所以单独写一篇文章让更多的人能够知道

> Github : [您的 Star 是我坚持的动力 ✊](https://github.com/JessYanCoding/RetrofitUrlManager)

# 为什么不使用多 Retrofit 实例的方案?
在上篇文章 [《解决Retrofit多BaseUrl及运行时动态改变BaseUrl》](https://www.jianshu.com/p/2919bdb8d09a) 中，4 种方案的特点和不足我都描述的很清楚，建议没看过这篇文章的可以去看看这篇文章，扩宽知识面，在后面的时间里经常有人问我为什么不使用多 **Retrofit** 实例的方案，多个 **Retrofit** 实例看起来并不会占用多少资源啊?

在回答之前为了让看这篇文章的人能了解我在说什么，所以我再粘贴下 [上篇文章](https://www.jianshu.com/p/2919bdb8d09a) 中关于这个方案的部分描述

`民间常用解决方案:`   
`之前也看过很多开源的聚合类 App 源码, 像一些整合 知乎、 豆瓣、 Gank 等多个平台数据的 App, 因为各自平台的域名不同, 所以大多数这类 App 会给每个平台都各自创建一个 Retrofit 对象, 即不同的 BaseUrl 使用不同的 Retrofit 对象来创建 ApiService 进行请求, 这样只要新增一个不同的 BaseUrl, 那就需要重新创建一个新的 Retrofit 对象
`

我在这篇文章中重新回答下这个问题，为每个不同的 **BaseUrl** 都创建一个其他配置属性都一模一样的 **Retrofit** 实例不止会造成资源的浪费，还会造成接口管理成本的增加，这个才是最重要的一点, 举个例

我们平时项目中所有的 **ApiService** 都是使用同一个 **Retrofit** 实例的 **Retrofit#create(ApiService)** 方法进行实例化后开始接口的请求

但是当项目中出现多个 **Retrofit** 实例后，我们在开发中不光要区分哪些接口使用哪个 **ApiService**，还要区分哪些 **ApiService** 需要使用哪个 **Retrofit** 实例进行实例化，如果 **ApiService** 使用错误的 **Retrofit** 实例进行实例化，那这个 **ApiService** 的所有接口请求都注定完全失败

越复杂的项目，开发人数越多的项目，出错的风险就越大，并且扩展性也在大打折扣，后面一有变更将会十分痛苦，随着项目中接口的增加，以及 **Retrofit** 实例的增加 (**BaseUrl** 的增加)，这个管理成本会成几何倍的增加

使用多 **Retrofit** 实例的方案前期投入成本过高，可能会影响之前项目管理接口的方式，某些封装过 **Retrofit** 的项目，也可能需要大改，对于老项目的接入不利，而使用 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 不仅可以满足多 **BaseUrl** 及运行时动态改变 **BaseUrl** 的需求，还具有热插拔以及低侵入性的特点，在使用过程中将不会影响到之前的接口管理方式和使用方式，还具有极强的扩展性，可应对后面陆续增加的极其复杂的 **BaseUrl** 替换需求

# 升级之前的 RetrofitUrlManager 的问题
此次升级之前的 **RetrofitUrlManager** 版本，只是将 [上篇文章](https://www.jianshu.com/p/2919bdb8d09a) 的思想完全实现，有了整个框架的基础，但是在动态替换 **BaseUrl** 方面还不够强大，最被大家吐槽的就是只能替换 **BaseUrl** 的域名

比如一个需要替换 **BaseUrl** 的 **Url** 地址为 `"https:www.google.com/api/v2"`，其中 `"https:www.google.com/api"` 是我们传给 **Retrofit** 的 **BaseUrl**，这时我们使用 **RetrofitUrlManager** 框架，想把 **BaseUrl** 替换成 `"https:www.github.com"`，我们期望的替换后的 **URL** 地址是 `"https:www.github.com/v2"`，但使用框架替换后的实际 **URL** 地址是 `"https:www.github.com/api/v2"`, `"/api"` 作为 **BaseUrl** 的一部分并没有被新的 **BaseUrl** 替换掉，只是替换了 **BaseUrl** 中的域名

# RetrofitUrlManager 是如何改善的
改善之前先要先分析为什么会这样？因为 **RetrofitUrlManager** 框架在拦截器中拦截到的 **URL** 地址是 **Retrofit** 已经把 **BaseUrl** 和接口注解中的相对路径合并后得到的最终路径地址，所以框架并不知道您传给 **Retrofit** 的 **BaseUrl** 除了域名外还包含后面的 `"/api"`，框架不知道 **BaseUrl** 的具体值，所以框架只会默认所有的 **BaseUrl** 都只含有域名，所以也就只能替换域名

# 高级模式
想要解决此类问题也很简单，告诉 **RetrofitUrlManager** 框架您传给 **Retrofit** 的 **BaseUrl** 具体值即可，所以框架升级后增加了 **RetrofitUrlManager#startAdvancedModel(String)** 方法，在 **App** 初始化时将您传给 **Retrofit** 的 **BaseUrl** 同样传给此方法，即可开启高级模式，高级模式即可替换拥有多个 **pathSegments** 的 **BaseUrl**，不再局限于只能替换域名

## 什么是 pathSegment? 
在 `"https://www.github.com/wiki/part?name=jess"` 中，其中的 `"/wiki"` 和 `"/part"` 就是 **pathSegment**, **PathSize** 就是 **pathSegment** 的个数

这个 **URL** 地址的 **PathSize** 就是 2, 第一个 **pathSegment** 是 `"/wiki"`，第二个 **pathSegment** 是 `"/part"`，可以粗略的理解为域名后面跟了几个 `"/"` **PathSize** 就是几

## 高级模式的替换规则
1. 旧 **URL** 地址为 `"https://www.github.com/wiki/part"`，您在 **App** 初始化时传入 **RetrofitUrlManager#startAdvancedModel(String)** 的 **BaseUrl** 为 `"https://www.github.com/wiki"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com/api"`，经过框架替换后生成的最终 **URL** 地址为  `"http://www.google.com/api/part"`

2. 旧 **URL** 地址为 `"https://www.github.com/wiki/part"`，您在 **App**  初始化时传入 **RetrofitUrlManager#startAdvancedModel(String)** 的 **BaseUrl** 为 `"https://www.github.com/wiki"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com"`，经过框架替换后生成的最终 **URL** 地址为 `"http://www.google.com/part"`
 
3. 旧 **URL** 地址为 `"https://www.github.com/wiki/part"`, 您在 **App** 初始化时传入 **RetrofitUrlManager#startAdvancedModel(String)** 的 **BaseUrl** 为 `"https://www.github.com"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com/api"`，经过框架替换后生成的最终 **URL** 地址为 `"http://www.google.com/api/wiki/part"`

# 超级模式
超级模式是高级模式的加强版，优先级高于高级模式，按理说高级模式就能满足开发中的大部分需求，那什么又是超级模式呢？那就要先来说说高级模式了

## 高级模式的原理
在高级模式中您需要在 **App** 初始化时将您传给 **Retrofit** 的 **BaseUrl** 同样传给 **RetrofitUrlManager#startAdvancedModel(String)** 一份，用以开启高级模式，成功开启高级模式后，这个传给 **RetrofitUrlManager#startAdvancedModel(String)** 的 **BaseUrl** 就会作为框架替换 **BaseUrl** 的基准

什么叫作基准呢? 用此 **BaseUrl** 开启高级模式，并不意味着框架就只能替换 **域名** 为 `"www.github.com"` 前两个 **pathSegments** 为 `"/wiki/part"` 的 **URL**，只要拥有域名以及大于或等于两个 **pathSegments** 的 **URL** 都可以被框架替换，因此高级模式只会保存传入 **RetrofitUrlManager#startAdvancedModel(String)** 的 **BaseUrl** 的格式 (保存 **pathSegments** 的个数)，并不是保存具体的值

## 高级模式的局限
如果传给 **RetrofitUrlManager#startAdvancedModel(String)** 的 **BaseUrl** 为 `"https://www.github.com/wiki/part"` (**PathSize** = 2)，框架就会将项目中所有 **URL** 中的 **域名** 以及 **域名** 后面的前两个 **pathSegments** 作为可被替换的 **BaseUrl** 整体，意味着框架只会将 **URL** 中的 **域名** 以及前两个 **pathSegments** 剪切并替换为您期望的 **BaseUrl**

这时服务器突然作出调整，项目中的一部分 **URL** 只需要将 `"https://www.github.com/wiki"` (**PathSize** = 1) 替换掉, 第二个 **pathSegment** `"/part"` 不再作为 **BaseUrl** 的一部分，不能被替换掉，必须要保留下来

这时项目中就出现了多个需要被替换的 **BaseUrl** 格式 (**PathSize** 不同)，有些 **URL** 只需要替换 **域名** 以及前两个 **pathSegments**，有些又只需要替换 **域名** 以及前一个 **pathSegments**，但是在开启高级模式时，只保存了一个 **BaseUrl** 的格式，这时使用高级模式实现此需求就比较棘手

这个需求是一个比较变态的需求，可能很多人遇不上，但是我想让您知道当您遇上了也不要怕，因为 **RetrofitUrlManager** 的超级模式已经帮您考虑周全

## 超级模式的用法
超级模式与高级模式不同的是，开启超级模式并不需要调用 **API**，只须要在需要开启超级模式的 **Url** 尾部加上 **RetrofitUrlManager#IDENTIFICATION_PATH_SIZE (#baseurl_path_size=) + PathSize**，这样就明确的告诉了框架，在这个 **URL** 中需要被替换的 **BaseUrl** 含有几个 **pathSegments**，相当于每个 **URL** 都可以指定自己需要被替换的 **BaseUrl** 的格式，这样就比高级模式只能在 **App** 初始化时，指定一个全局的 **BaseUrl** 格式灵活得多，如果当您开启高级模式的同时也开启了超级模式，由于超级模式的优先级高于高级模式，所以只会执行超级模式

## 超级模式的替换规则
1. 旧 **URL** 地址为 `"https://www.github.com/wiki/part#baseurl_path_size=1"`，`"#baseurl_path_size=1"` 表示其中 **BaseUrl** 为 `"https://www.github.com/wiki"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com/api"`，经过框架替换后生成的最终 **URL** 地址为 `"http://www.google.com/api/part"`

2. 旧 **URL** 地址为 `"https://www.github.com/wiki/part#baseurl_path_size=1"`，`"#baseurl_path_size=1"` 表示其中 **BaseUrl** 为 `"https://www.github.com/wiki"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com"`，经过框架替换后生成的最终 **URL** 地址为 `"http://www.google.com/part"`

3. 旧 **URL** 地址为 `"https://www.github.com/wiki/part#baseurl_path_size=0"`，`"#baseurl_path_size=0"` 表示其中 **BaseUrl** 为 `"https://www.github.com"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com/api"`，经过框架替换后生成的最终 **URL** 地址为 `"http://www.google.com/api/wiki/part"`

4. 旧 **URL** 地址为 `"https://www.github.com/wiki/part/issues/1#baseurl_path_size=3"`，`"#baseurl_path_size=3"` 表示其中 **BaseUrl** 为 `"https://www.github.com/wiki/part/issues"`，您想替换成的 **BaseUrl** 地址是 `"https://www.google.com/api"`，经过框架替换后生成的最终 **URL** 地址为 `"http://www.google.com/api/1"`


# 三种模式比较
在升级之前，框架就只有一个默认的普通模式 (只能替换域名)，在升级之后新增了 **高级模式** 和 **超级模式**，这两个模式让框架变得更加强大，在上面的内容中也详细的介绍了这两个模式，现在就来总结下这三个模式，让大家能够按照自己的需求选择出最适合的模式


## 替换 BaseUrl 的自由程度 (可扩展性)
### 普通模式 < 高级模式 < 超级模式

* 普通模式: 只能替换域名

* 高级模式: 只能替换在 **RetrofitUrlManager#startAdvancedModel(String)** 中传入的固定 **BaseUrl** 格式

* 超级模式: 每个 **URL** 都可以随意指定可被替换的 **BaseUrl** 格式


## 使用上的复杂程度
### 普通模式 < 高级模式 < 超级模式

* 普通模式: 无需做过多配置

* 高级模式: 在 **App** 初始化时调用一次 **RetrofitUrlManager#startAdvancedModel(String)** 即可

* 超级模式: 每个需要开启超级模式的 **URL** 尾部都需要加入  **RetrofitUrlManager#IDENTIFICATION_PATH_SIZE (#baseurl_path_size=) + PathSize**


# 总结
由此可见，自由度越强，使用上也越复杂，所以可以根据自己的需求选择对应的模式，并且也可以根据需求的变化随意升级或降级这三种模式

这次更新让 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 的能力提升了一个档次，足以应对各种复杂的 **BaseUrl** 替换需求，正因为 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 极强的扩展性，现在甚至可以做到，让服务器可以通过远程动态控制项目中的多个 **BaseUrl**

如果还有什么问题或者需求可以给我提 **Issues**，如果 [RetrofitUrlManager](https://github.com/JessYanCoding/RetrofitUrlManager) 能够给您带来实质的帮助，也请不要吝啬您的 **Star**

---
**Hello 我叫Jessyan,如果您喜欢我的文章,可以在以下平台关注我**

* GitHub:  <https://github.com/JessYanCoding>
* 掘金: <https://gold.xitu.io/user/57a9dbd9165abd0061714613>
* 简书: <http://www.jianshu.com/u/1d0c0bc634db>
* 微博: <http://weibo.com/u/1786262517>

-- The end