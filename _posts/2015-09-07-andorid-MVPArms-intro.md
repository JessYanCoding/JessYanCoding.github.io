---
layout: post
title: MVPArms MVP快速集成框架
tags: [MVP,Rxjava,Dagger]
modified: 2016-09-07
image:
  feature: abstract-5.jpg
---

# 前言

* 今年的Android技术圈中`MVP`,`Dagger2`,`Rxjava`,`Retrofit`这些词汇非常火,随便打开一个技术论坛都充斥着大量的关于这些技术的文章,`Github`也充斥着各种以`基于MVP+Retrofit+RxJava＋Dagger2+MaterialDesign开发的xxxx`为标题的开源项目或**Demo**.

* 但是大家这么热心的开源此类项目,一直重复的做着同样的事`教授大家使用的方式和技巧`有没有想过依赖一个第三方库,就可以快速的搭建此类框架？


# What is MVPArms?

* `MVPArms`是一个集成了大量**Android**主流框架,并且全部使用**Dagger2**管理,以及提供API将所有库连接起来方便使用,还提供详细的[**Wiki文档**](https://github.com/JessYanCoding/MVPArms/wiki).

* 它可以使开发后面的所有项目都不用重复的复制粘贴(用过此类框架的朋友应该知道,这些库都依赖其它的库,就算一个build.gradle都会浪费很多时间),一个依赖省去很多烦恼,而且对于新手来说这些框架难的不仅仅是API的使用,更难的是怎么把它们结合到一起,应对各种场景的使用.

* 对于一个新的**Android**项目,特别是熟练使用**Dagger2**和**Rxjava**的开发者,你们只需要将此项目**Clone**下来,**Demo**只实现了一个页面,将此页面删除掉,添加所需要的**Retrofit** **API**,你的框架就搭建好了,你就可以直接使用**Demo**进行后续的开发,包结构也适合后面的扩展.

# Feature

* 支持大型项目的开发方便扩展,Demo的包结构直接可以拿来用
* 全部使用`Dagger2`管理
* 大量使用`Rxjava`
* 提供`Mvp`基类,快速接入
* 全部`UI`自适应
* 图片加载类**ImageLoader**使用策略模式和建造者模式,轻松切换图片加载框架和扩展
* Model层提供Retrofit API和缓存,是否使用缓存自行选择
* 全局`http` **Request**(**Params**,**headers**) **Response**(**Params**,**耗时**)信息监听,可解析json后根据状态码做相应操作
* 全局`Rxjava`错误处理,错误后自动重试

# Where?

>[MVPArms欢迎**Star**和**Fork**](https://github.com/JessYanCoding/MVPArms)

# Structure

<img src="https://github.com/JessYanCoding/MVPArms/raw/master/image/package.png" width="50%" height="50%">

# How?

## Wiki

> [详细用法请参照Wiki](https://github.com/JessYanCoding/MVPArms/wiki)



