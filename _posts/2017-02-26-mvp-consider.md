---
layout: post
title:  传统MVP用在项目中是真的方便还是累赘?
tags: [MVP]
modified: 2017-02-26
image:
  feature: abstract-12.jpg
---

# 前言(最后奉上福利)

自从`Google`在去年放出**MVP**的[官方**Sample**](https://github.com/googlesamples/android-architecture/tree/todo-mvp)后,越来越多的人开始加入**MVP**大军,**MVP**可谓在16年大放异彩,我也乘势推出了我的[**MVP**框架](https://github.com/JessYanCoding/MVPArms/wiki)狂刷了一波存在感

# 问题

但在使用当中我也发现了诸多弊端,导致很多初学者,在写过**Sample**后,就再也没在自己的项目中使用过**MVP**

> MVP需要创建太多的类和接口,并且每次通信都需要繁琐的通过接口传递信息

这是大多数使用过**MVP**的朋友,最能感受到的,最近在帮公司技术面,我也时常问应聘者,能否尝试着解决这些问题?

# 解决方案

其实我之前已经有一套解决方案,其实也不能叫解决,只能说是缓解😅

## 硬解决

所谓**硬解决**,便是使用比较暴力的方式😂,通过[Template](http://www.jianshu.com/p/56cf17ab896d)自动生成需要的类和接口,这样少去了频繁的复制粘贴

## 软解决

所谓**软解决**,那就要动动脑子,稍微优雅的解决了😀

1. 对于逻辑简单的页面可以不使用**Presenter**,直接在**Activity**或**Fragment**中处理逻辑,在**Presenter**中如果不需要处理数据,也可以不实用**Model**

2. **Presenter**和**Model**都可以无限制的重用,所以MVP的划分不需要太细粒度,稍微粗粒度一点,即不需要每个**Activity**或**Fragment**都给他划分一套**MVP**,可以几个**Activity**或**Fragment**使用同一个**Presenter**(使用同一个类不是同一个对象,这个**Presenter**含有可以共用的逻辑),也可一个**Activity**或**Fragment**根据不同的需求持有多个不同类型的**Presenter**对象,**Model**层同理,这样灵活使用,可以在一定程度上缓解**MVP**类和接口较多的缺点

# 并没有完全解决问题

通过上面的解决方案,是可以一定的缓解**MVP**的缺点,但是并不能完全解决上述缺点

比如想重用**Presenter**,**Presenter**就必须只含有公用的逻辑,而实际项目中公用的逻辑并不是那么多,所以能减少的类和接口也是很有限的,如果强制将不同页面的逻辑放在同一个**Prsenter**中,来达到重用的目的,那么每个**Activity**会被迫实现许多并不需要的方法,得不偿失

# 寻求解决方法

因此我看了大多数**MVP**框架,寻求如何彻底改善这个问题,像支付宝团队使用的**TheMVP**框架,是通过将**Activity**或**Fragment**作为**Presenter**,将**UI**操作抽到**Delegate**中,作为**View**层

## TheMVP优点

这样做的好处是,不仅可以少写很多类,而且**Presenter**直接就可以和**Activity**或**Fragment**的生命周期做绑定,且可以随便重用**View**(但大多数场景都是重用**Presenter**,因为**View**层变化总是比其它层频繁)

## TheMVP缺点

缺点就是不能重用**Presenter**,并且对于**Presenter**的实现有限制,必须是**Activity**或**Fragment**,如果要在其他地方实现**Presenter**,如**Adapter**,**Dialog**就必须根据它的特性重新写对应的**Presenter**基类

因为**Presenter**基类继承了**Activity**或**Fragment**,如果我们需要通过继承使用其他**Activity**或**Fragment**,那就又需要修改**Presenter**基类,一旦某个**Activity**需要继承其他不同的**Activity**,那又需要重新创建一个基于此**Activity**的**Presenter**基类,导致一个**Activity**或**Fragment**有多个不同的**Presenter**基类

# 分析问题,解决问题

总结一下**MVP**的缺点

```
1.粒度不好控制,控制不好就需要写过多的类和接口
2.如要重用presenter可能会实现过多不需要的接口
3.Presenter和View通过接口通信太繁琐,一旦View层需要的数据变化,那么对应的接口就需要更改

```

想要在根本上解决以上问题,我想必须换个思路,能不能通过改变传统**MVP**架构来解决这些问题?

**实现**MVP**现阶段有两种方式,各有优缺点:**

> 一个是将**Activity**或**Fragment**作为**Presenter**,抽象一个**View**层出来

> 一个是将**Activity**或**Fragment**作为**View**,抽象一个**Presenter**层出来

我想达到重用**Presenter**的目的,自然选择了后者

在某一天我突然想到了**Handler**,他只通过一个**handleMessage**方法,根据**Message**的*what*字段处理不同的操作,这样向上层提供一个统一的入口,下层不管如何改变并不会影响上层,并且同样可以实现多种的操作

于是根据这个思想,我重新改造了**MVP**架构,让**Presenter**通过**Message**和**View**层通信

# 如何实现

先上张图

<img src="https://github.com/JessYanCoding/MVPArt/raw/master/image/Architecture.png" width="80%" height="80%">

具体做法是,**VIEW**层持有**Presenter**对象,当用户请求一个事件,则调用**Presenter**中的方法,并把持有**View**引用**Message**传给此方法,此方法处理完请求逻辑后将数据封装到**Message**中,并通过**Message**持有的**View**引用回调**View**的**handleMessage**方法,让**View**做不同的操作,最后释放掉**Message**的所有引用,放入消息池

**Presenter**并不直接持有**View**,方法执行完即表示和**View**的关系解除

和**Handler**的原理很像,**Handler**是将消息放入**MessageQueue**,**Looper**去轮循处理消息,我这里是将消息放入,**Presenter**的方法,并立即处理消息

# 总结

这样就能解决上述的缺点:

1. 少写了很多类和接口

2. 并且**Presenter**只需要通过**handleMessage**一个方法与**View**通信,也就不用繁琐的一直添加接口方法,只需要一个**Message**参数,通过**Message**封装数据,即使**View**需要的数据类型发生改变,也不需要更改任何方法,所以也不会影响上层调用

3. 随便重用**Presenter**,即使你一个**Activity**,重用10个不同的**Presenter**,那也只用实现一个**handleMessage**方法,不需要实现**View**中其他用不到的方法,通过一个方法同样能做到不同的操作(传统**MVP**一个页面对应一个**Presenter**,其实大多数**Presenter**只有一两个方法,这样导致存在大量代码寥寥无几的**Presenter**,你有想过将相近的逻辑都写到一个**Presenter**中,一直重用**Presenter**有多爽吗😁)

4. 当**Presenter**中的方法需要**Activity**传递一些数据时,也可以将数据封装到**Message**中传给**Presenter**,这样即使需要的数据类型发生改变,也不需要更改方法,所以也不会影响上层调用

只有能不断的灵活重用,才能感受到**MVP**的强大之处

**当然很多不同的逻辑都写在一个Presenter中,虽然可以少写很多类,但是后面的扩展性肯定不好,所以这个粒度需要自己控制,但是对于外包项目简直是福音**

说了这么多还是要看看**Demo**,具体该怎么做吧？

> [Go!觉得好一定要右上角Star哦!](https://github.com/JessYanCoding/MVPArt)

# Tips

现在的框架是一个比较轻量级的框架,没有网络层,后面会开一个分支提交比较完整的框架和文档,像[**MVPArms**](https://github.com/JessYanCoding/MVPArms/wiki)一样

-- The end 

