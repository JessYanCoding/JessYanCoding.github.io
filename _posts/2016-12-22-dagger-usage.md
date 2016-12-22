---
layout: post
title:  在项目中怎么灵活使用Dagger?
tags: [MVP,Dagger]
modified: 2016-12-22
image:
  feature: abstract-10.jpg
---


# 前言
最近介绍Dagger的文章挺多的,大多介绍的都是用法和注解的意义,在附带一个小Demo,把刚学习的开发者看的云里雾里的,看完还是不知道怎么结合在项目中使用?什么时候在项目中用?在项目中的使用场景是什么?

# 架构图
![](https://github.com/JessYanCoding/MVPArms/raw/master/image/Architecture.png)


这是本人写的**MVP+Dagger**框架[MVPArms](https://github.com/JessYanCoding/MVPArms/wiki)的架构图,通过`Dagger`来为`MVP`提供所需要的一切类和接口,本框架的初衷是让开发者更好的学习及使用此类开发模式,如果不理解为什么要使用**MVP+Dagger**来开发项目,可以先看这篇[文章](https://gold.xitu.io/entry/5826c2f40ce4630056f8a18f/detail)


# 对比
之前我看了几个使用**MVP+Dagger+Retrofit**开发,并且有一定**star**量的开源项目,所以对比了下我的框架,有以下几点:

1. 使用Dagger的场景太少了,大部分只是使用Dagger注入MVP类,并且有些Retrofit都是自己new,并没有使用Dagger管理,甚至有些使用一次接口就**retrofit.create(ApiService.class)**一次,这个本可以使用Dagger将它作为单例来调用的

2. 有一些设计的**Component**和**Module**完全只是用来注入Activity和一些单例
```
@ActivityScope
@Component(modules = {ActivityModule.class},dependencies = {AppComponent.class})
public interface ActivityComponent {
    void inject(AActivity activity);
    void inject(BActivity activity);
    void inject(CActivity activity);
    ...
}
```
只要多一个Activity,他就可以一直重载inject方法,于是就可以用一组**component**,**module**来为所有Activity注入,但是如果遇到**Activity**需要临时注入一些其他的组件,并且每个Activity要注入的组件都不一样,就没办法了,缺少灵活性

3. 还是和第2条有关,如果只有一个**Module**,`Dagger`就无法根据每个**Presenter**的需要,提供多个不同的**Model**,比如这个**Presenter**使用过这个接口,并且缓存已经在**Model**中写好,其他**Presenter**如果也要用到这个接口,就可以直接重用这个**Model**,**MVP**最大的好处之一就是可以重用**M**和**P**层

4. 有些没有**Model**层,直接给**Presenter**注入**Retrofit Api**,所有网络请求逻辑在**Presenter**中,如果现在需求变了,需要加入缓存,就需要更改**Presenter**的逻辑,这样就可能影响一些和这个功能无关的逻辑,如果有**Model**层,里面持有请求网络和缓存的功能类,这样**Presenter**就不需要管,数据是从网络还是数据库获取的,**Model**层只用保证返回给**Presenter**的数据无误,而**Presenter**只用专注于逻辑,这样各自只用保证各自的职责,屏蔽细节,易扩展,出错也好定位

# 如何用?
在项目中用到最多的就是向**Presenter**提供**View**和**Model**的同时,在向每一层提供所需要的单例类,并且使用Dagger不断的重用**Presenter**和**Model**,其实`Dagger`本来就抽象,说再多不如直接看代码是怎么实现的,然后照着模版直接在自己项目中使用,本文的主题不是在项目中怎么灵活使用`Dagger`吗?那就直接在项目中找答案不是更快?

# [Launch?](https://github.com/JessYanCoding/MVPArms/wiki)