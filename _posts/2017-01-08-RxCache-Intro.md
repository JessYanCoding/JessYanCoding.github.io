---
layout: post
title:  你不知道的Retrofit缓存库RxCache
tags: [RxCache,框架,github]
modified: 2017-01-08
image:
  feature: abstract-8.jpg
---

**推荐**：看到如此多的**MVP**+**Dagger2**+**Retrofit**+**Rxjava**项目,轻松拿**star**,心动了吗？[`MVPArms`](https://github.com/JessYanCoding/MVPArms/wiki)是一个 **MVP**+**Dagger2**+**Retrofit**+**Rxjava**快速集成框架(目前Dagger应用最复杂的框架),自带上万字[文档](https://github.com/JessYanCoding/MVPArms/wiki)以及自动生成**MVP**和**Dagger2**文件等功能,你只用专注于逻辑,其他都交给[`MVPArms`](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md),快来构建自己的**MVP**+**Dagger2**+**Retrofit**+**Rxjava**项目吧!|
:----------:|



# 前言
`Retrifit`无疑是当下最火的网络请求库,与同门师兄`Okhttp`配合使用,简直是每个项目的标配,因为`Okhttp`自带缓存,所以很多人并不关心其他缓存库,但是使用过`Okhttp`缓存的小伙伴,肯定知道`Okhttp`的缓存必须配合**Header**使用,比较麻烦,也不够灵活,所以现在为大家推荐一款专门为`Retrifit`打造的缓存库`RxCache`

> 项目地址: [RxCache](https://github.com/VictorAlbertos/RxCache) Demo地址: [RxCacheSample](https://github.com/VictorAlbertos/RxCacheSamples)


# 简介
`RxCache`使用注解来为`Retrofit`配置缓存信息,内部使用动态代理和`Dagger`来实现,这个库的资料相对较少,官方的**Demo**又全是英文的,这无疑给开发者增加了使用难度,其实我英文也不好,但是源码是通用的啊,所以我为大家从源码的角度来讲解此库,此库源码的难点其实都在`Dagger`注入上,我先为大家讲解用法,后面会再写篇文章讲解源码,先给张**RxCache**的架构图,让大家尝尝鲜,请期待我后面的源码分析😏

![](http://jessyan.me/images/RxCache.png)



# 使用

1.定义接口,和`Retrofit`类似,接口中每个方法和**Retrofit**接口中的方法一一对应,每个方法的参数中必须传入对应**Retrofit**接口方法的返回值(返回值必须为**Observable**,否则报错),另外几个参数**DynamicKey**,**DynamicKeyGroup**和**EvictProvider**不是必须的,但是如果要传入,每个都只能传入一个对象,否则报错,这几个参数的意义是初学者最困惑的,后面会分析

```
/**
 * 此为RxCache官方Demo
 */
public interface CacheProviders {

    @LifeCache(duration = 2, timeUnit = TimeUnit.MINUTES)
    Observable<Reply<List<Repo>>> getRepos(Observable<List<Repo>> oRepos, DynamicKey userName, EvictDynamicKey evictDynamicKey);

    @LifeCache(duration = 2, timeUnit = TimeUnit.MINUTES)
    Observable<Reply<List<User>>> getUsers(Observable<List<User>> oUsers, DynamicKey idLastUserQueried, EvictProvider evictProvider);

    Observable<Reply<User>> getCurrentUser(Observable<User> oUser, EvictProvider evictProvider);
}

```

2.将接口实例化,和`Retrofit`构建方式类似,将接口通过**using**方法传入,返回一个接口的动态代理对象,调用此对象的方法传入对应参数就可以实现缓存了,通过注解和传入不同的参数可以实现一些自定义的配置, so easy～

```
CacheProviders cacheProviders = new RxCache.Builder()
                .persistence(cacheDir, new GsonSpeaker())
                .using(CacheProviders.class);
```

# 详解
其实`RxCache`的使用比较简单,上面的两步就可以轻松的实现缓存,此库的的特色主要集中在对缓存的自定义配置,所以我来主要讲讲那些参数和注解是怎么回事?

## 参数

> Observable
-----

此**Observable**的意义为需要将你想缓存的`Retrofit`接口作为参数传入(返回值必须为Observable),`RxCache`会在没有缓存,或者缓存已经过期,或者**EvictProvider**为**true**时,通过这个`Retrofit`接口重新请求最新的数据,并且将服务器返回的结果包装成**Reply**返回,返回之前会向内存缓存和磁盘缓存中各保存一份

值得一提的是,如果需要知道返回的结果是来自哪里(本地,内存还是网络),是否加密,则可以使用`Observable<Reply<List<Repo>>>`作为方法的返回值,这样`RxCache`则会使用**Reply**包装结果,如果没这个需求则直接在范型中声明结果的数据类型`Observable<List<Repo>>`

#### 例外

如果构建`RxCache`的时候将**useExpiredDataIfLoaderNotAvailable**设置成**true**,会在数据为空或者发生错误时,忽视**EvictProvider**为**true**或者缓存过期的情况,继续使用缓存(前提是之前请求过有缓存)

> DynamicKey & DynamicKeyGroup
----

有很多开发者最困惑的就是这两个参数的意义,两个一起传以及不传会有影响吗?说到这里就要提下,`RxCache`是怎么存储缓存的,`RxCache`并不是通过使用**URL**充当标识符来储存和获取缓存的

#### 那是什么呢？

没错`RxCache`就是通过这两个对象加上上面**CacheProviders**接口中声明的方法名,组合起来一个标识符,通过这个标识符来存储和获取缓存

```
标识符规则为:

方法名 + $d$d$d$" + dynamicKey.dynamicKey + "$g$g$g$" + DynamicKeyGroup.group

dynamicKey或DynamicKeyGroup为空时则返回空字符串,即什么都不传的标识符为:

"方法名$d$d$d$$g$g$g$"
```

#### 什么意思呢?

比如`RxCache`,的内存缓存用的是**Map**,它就用这个标识符put和get
数据,如果标识符不一致那就取不到想取的缓存

#### 和我们有什么关系呢?

举个例子,我们一个接口具有分页功能,我们使用`RxCache`给他设置了3分钟的缓存,如果这两个对象都不传入参数中,它会默认使用这个接口的方法名去存储和获取缓存,意思是我们之前使用这个接口获取到了第一页的数据,三分钟以内多次调用这个接口,请求其他分页的数据,它返回的缓存还是第一页的数据,直到缓存过期,所以我们现在想具备分页功能,必须传入**DynamicKey**,**DynamicKey**内部存储有一个**key**,我们在构建的时候传入页数,`RxCache`将会根据不同的页数分别保存一份缓存,它内部做的事就是将方法名+DynamicKey变成一个**String**类型的标识符去获取和存储缓存

#### DynamicKey和DynamicKeyGroup有什么关系呢

**DynamicKey**存储有一个**Key**,**DynamicKey**的应用场景: 请求同一个接口,需要参照一个变量的不同返回不同的数据,比如分页,构造时传入页数就可以了

**DynamicKeyGroup**存储有两个**key**,**DynamicKeyGroup**是在**DynamicKey**基础上的加强版,应用场景:请求同一个接口不仅需要分页,每页又需要根据不同的登录人返回不同的数据,这时候构造**DynamicKeyGroup**时,在构造函数中第一个参数传页数,第二个参数传用户标识符就可以了

理论上**DynamicKey**和**DynamicKeyGroup**根据不同的需求只用传入其中一个即可,但是也可以两个参数都传,以上面的需求为例,两个参数都传的话,它会先取**DynamicKey**的**Key**(页数)然后再取**DynamicKeyGroup**的第二个**Key**(用户标识符),加上接口名组成标识符,来获取和存储数据,这样就会忽略**DynamicKeyGroup**的第一个**Key**(页数)

> EvictProvider & EvictDynamicKey & EvictDynamicKeyGroup
----

这三个对象内部都保存有一个**boolean**类型的字段,其意思为是否驱逐(使用或删除)缓存,`RxCache`在取到未过期的缓存时,会根据这个**boolean**字段,考虑是否使用这个缓存,如果为**true**,就会重新通过`Retrofit`获取新的数据,如果为**false**就会使用这个缓存

#### 这三个对象有什么关系呢?

这三个对象是相互继承关系,继承关系为**EvictProvider** < **EvictDynamicKey** < **EvictDynamicKeyGroup**,这三个对象你只能传其中的一个,多传一个都会报错,按理说你不管传那个对象都一样,因为里面都保存有一个**boolean**字段,根据这个字段判断是否使用缓存

#### 不同在哪呢?

如果有未过期的缓存,并且里面的**boolean**为**false**时,你传这三个中的哪一个都是一样的,但是在**boolean**为**true**时,这时就有区别了,`RxCache`会在`Retrofit`请求到新数据后,在**boolean**为**true**时删除对应的缓存

#### 删除规则是什么呢?
还是以请求一个接口,该接口的数据会根据不同的分页返回不同的数据,并且同一个分页还要根据不同用户显示不同的数据为例

三个都不传,`RxCache`会自己`new EvictProvider(false);`,这样默认为**false**就不会删除任何缓存

**EvictDynamicKeyGroup** 只会删除对应分页下,对应用户的缓存

**EvictDynamicKey** 会删除那个分页下的所有缓存,比如你请求的是第一页下user1的数据,它不仅会删除user1的数据还会删除当前分页下其他user2,user3...的数据

**EvictProvider** 会删除当前接口下的所有缓存,比如你请求的是第一页的数据,它不仅会删除第一页的数据,还会把这个接口下其他分页的数据全删除

所以你可以根据自己的逻辑选择传那个对象,如果请求的这个接口没有分页功能,这时你不想使用缓存,按理说你应该传**EvictProvider**,并且在构造时传入**true**,但是你如果传**EvictDynamicKey**和**EvictDynamicKeyGroup**达到的效果也是一样

## 注解

> @LifeCache
-----

**@LifeCache**顾名思义,则是用来定义缓存的生命周期,当`Retrofit`获取到最新的数据时,会将数据及数据的配置信息封装成**Record**,在本地和内存中各保存一份,**Record**中则保存了**@LifeCache**的值(毫秒)和当前数据请求成功的时间(毫秒)**timeAtWhichWasPersisted**

以后每次取缓存时,都会判断**timeAtWhichWasPersisted**+**@LifeCache**的值是否小于当前时间(毫秒),小于则过期,则会立即清理当前缓存,并使用**Retrofit**重新请求最新的数据,如果**EvictProvider**为**true**不管缓存是否过期都不会使用缓存


未完待续...


