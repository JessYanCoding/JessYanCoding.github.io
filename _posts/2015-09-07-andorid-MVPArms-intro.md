---
layout: post
title: MVPArms MVP快速集成框架
tags: [MVP,Rxjava,Dagger]
modified: 2016-09-07
image:
  feature: abstract-5.jpg
---
![Logo](https://raw.githubusercontent.com/JessYanCoding/MVPArms/master/image/arms_banner_v1.0.jpg)

# 前言

* 今年的Android技术圈中`MVP`,`Dagger2`,`Rxjava`,`Retrofit`这些词汇非常火,随便打开一个技术论坛都充斥着大量的关于这些技术的文章,`Github`也充斥着各种以`基于MVP+Retrofit+RxJava＋Dagger2+MaterialDesign开发的xxxx`为标题的开源项目或**Demo**.

* 但是大家这么热心的开源此类项目,一直重复的做着同样的事`教授大家使用的方式和技巧`有没有想过依赖一个第三方库,就可以快速的搭建此类框架？


# What is MVPArms?

* `MVPArms`是一个集成了大量**Android**主流框架,并且全部使用**Dagger2**管理,以及提供API将所有库连接起来方便使用,还提供详细的[**Wiki文档**](https://github.com/JessYanCoding/MVPArms/wiki).

* 它可以使开发后面的所有项目都不用重复的复制粘贴(用过此类框架的朋友应该知道,这些库都依赖其它的库,就算一个build.gradle都会浪费很多时间),一个依赖省去很多烦恼,而且对于新手来说这些框架难的不仅仅是API的使用,更难的是怎么把它们结合到一起,应对各种场景的使用.

* 对于一个新的**Android**项目,特别是熟练使用**Dagger2**和**Rxjava**的开发者,你们只需要将此项目**Clone**下来,**Demo**只实现了一个页面,将此页面删除掉,添加所需要的**Retrofit** **API**,你的框架就搭建好了,你就可以直接使用**Demo**进行后续的开发,包结构也适合后面的扩展.

## Notice
* 沟通交流群: [ ![QQGroup](https://img.shields.io/badge/QQ群-301733278-ff69b4.svg) ](https://shang.qq.com/wpa/qunwpa?idkey=1a5dc5e9b2e40a780522f46877ba243eeb64405d42398643d544d3eec6624917)

* 一键生成模板, 开发神器, 不看后悔! (MVPArms 的所有规范现已整合到以下两种模板中, 让您无需理解 Wiki 文档便可快速开启 MVPArms 的世界)
  * [一键生成 app Module (使用此 **Module 级** 模板可直接生成 **Wiki** 文档第一章 **开发准备** 的所有内容, 快速并且零错误)](https://github.com/JessYanCoding/MVPArms-Module-Template)
  * [一键生成 MVP, Dagger2 相关类 (使用此 **页面级** 模板可直接生成 **Wiki** 文档第二章 **快速开始** 的所有内容, 快速并且零错误)](https://github.com/JessYanCoding/MVPArmsTemplate)
* [MVPArms 学习项目](https://github.com/JessYanCoding/MVPArms/blob/master/CONTRIBUTING_APP.md)
* [更新日志](https://github.com/JessYanCoding/MVPArms/wiki/UpdateLog)
* [常见 Issues (**开发必看, 节约您的时间!**)](https://github.com/JessYanCoding/MVPArms/wiki/Issues)
* [意见收集](https://github.com/JessYanCoding/MVPArms/issues/40)

> 扩展项目, 了解一下:
* [**MVPArms 官方组件化方案 ArmsComponent**](https://github.com/JessYanCoding/ArmsComponent/wiki)

* [改造 Android 官方架构组件 ViewModel](https://github.com/JessYanCoding/LifecycleModel)
* [一行代码监听 App 中所有网络链接的上传以及下载进度, 以及 Glide 加载进度](https://github.com/JessYanCoding/ProgressManager)
* [以最简洁的 Api 让 Retrofit 同时支持多个 BaseUrl 以及动态改变 BaseUrl](https://github.com/JessYanCoding/RetrofitUrlManager)

## Feature
* 通用框架, 适合所有类型的项目, 支持大型项目的开发, 兼容组件化开发, 可作为组件化的 **Base** 库

* **Base** 基类(**BaseActivity**, **BaseFragment**, **BaseApplication** ...)
* **MVP** 基类(**IModel**, **IVIew**, **IPresenter** ...)
* 框架高度可自定义化 (**ConfigModule**), 可在不修改框架源码的情况下对 **Retoift**, **Okhttp**, **RxCache**, **Gson** 等框架的特有属性进行自定义化配置, 可在不修改框架源码的情况下向 **BaseApplication**, **BaseActivity**, **BaseFragment** 的对应生命周期中插入任意代码, 并且框架独有的 **ConfigModule** 配置类, 可在不修改框架源码的情况下为框架轻松扩展任何新增功能
* 独创的 **RxLifeCycle** 应用方式, 可在不继承 **RxLifeCycle** 提供的 **Activity** 和 **Fragment** 的情况下, 正常使用 **RxLifeCycle** 的所有功能, 且使用方式不变
* 独创的建造者模式 **Module** (**GlobalConfigModule**), 可实现使用 **Dagger2** 向框架任意位置注入自定义参数, 可轻松扩展任意自定义参数
* 全局使用 **Dagger2** 管理 (将所有模块使用 **Dagger2** 连接起来, 绝不是简单的使用)
* 全局监听整个 **App** 所有 **Activity** 以及 **Fragment** 的生命周期 (包括三方库), 并可向其生命周期内插入任意代码
* 全局监听 **Http Request**(请求参数, **Headers** ...), **Response** (服务器返回的结果, **Headers**, 耗时 ...)等信息(包括 **Glide** 的请求), 可解析 json 后根据状态码做相应的全局操作以及数据加密, **Cookie** 管理等操作
* 全局管理所有 **Activity** (包括三方库的 **Activity**), 可实现在整个 **App** 任意位置, 退出所有 **Activity**, 以及拿到前台 **Activity** 做相应的操作(如您可以在 **App** 任何位置做弹出 **Dialog** 的操作)
* 全局 **Rxjava** 错误处理, 错误后自动重试, 捕捉整个应用的所有错误
* 全局 **UI** 自适应
* 图片加载类 **ImageLoader** 使用策略模式和建造者模式, 轻松切换图片加载框架, 方便功能扩展
* 网络请求日志打印封装(提供解析后的服务器的请求信息和服务器的响应信息, 按可自定义的任意格式输出打印日志, 内置一个漂亮的打印格式模板)
* 框架内自有组件的缓存机制封装(框架内可缓存内容的组件都提供有接口供外部开发者自定义缓存机制)
* 代码生成插件(**MVPArms** 全家桶一键生成所需要的所有类文件)
* **Demo** 修改包名后就可以直接使用, 快速接入(老项目接入请按下面的步骤)

# Where?

>[MVPArms欢迎**Star**和**Fork**](https://github.com/JessYanCoding/MVPArms)

# Architectural

![](https://github.com/JessYanCoding/MVPArms/raw/master/image/Architecture.png)

# Package Structure

![](https://github.com/JessYanCoding/MVPArms/raw/master/image/package.png)

# How?

## Wiki

> [详细用法请参照Wiki,下面只是简单的介绍下MVP](https://github.com/JessYanCoding/MVPArms/wiki)

## Contract

> 根据`Google`[官方的**MVP**项目](https://github.com/googlesamples/android-architecture/tree/todo-mvp-dagger/),可以在**Contract**中定义**MVP**的接口,便于管理,此框架使用[`Dagger`](https://github.com/google/dagger)注入**Presenter**无需定义**Presenter**接口,所以**Contract**只定义**Model**和**View**的接口

```java
public interface UserContract {
	//对于经常使用的关于UI的方法可以定义到BaseView中,如显示隐藏进度条,和显示文字消息
    interface View extends BaseView {
        void setAdapter(DefaultAdapter adapter);
        void startLoadMore();
        void endLoadMore();
    }
	//Model层定义接口,外部只需关心model返回的数据,无需关心内部细节,及是否使用缓存
    interface Model {
        Observable<List<User>> getUsers(int lastIdQueried, boolean update);
    }
}

```


## View

> 一般让**Activity**或**Fragment**实现**Contract**中定义的**View**接口,供**Presenter**调用对应方法操作**UI**,**BaseActivity**默认注入**Presenter**,如想使用**Presenter**,必须指定**Presenter的范型**,和实现**setupActivityComponent**来提供**Presenter**需要的[**Component**](https://github.com/JessYanCoding/MVPArms/wiki#2.4.6)和[**Module**](https://github.com/JessYanCoding/MVPArms/wiki#2.4.5)

```java
public class UserActivity extends WEActivity<UserPresenter> implements UserContract.View {

    @Override
    protected void setupActivityComponent(AppComponent appComponent) {
        DaggerUserComponent
                .builder()
                .appComponent(appComponent)
                .userModule(new UserModule(this))
                .build()
                .inject(this);

    }

    @Override
    protected View initView() {
        return LayoutInflater.from(this).inflate(R.layout.activity_user, null, false);
    }

    @Override
    protected void initData() {
       }
}
```

## Model

> **Model**实现**Contract**的**Model**接口,并且继承**BaseModel**,指定范型为[**ServiceManager**](https://github.com/JessYanCoding/MVPArms/wiki#2.1.2)和[**CacheManager**](https://github.com/JessYanCoding/MVPArms/wiki#2.1.3),然后通过两个**Manager**拿到需要的**Service**和**Cache**为**Presenter**提供需要的数据(是否使用缓存请自行选择,**Presenter**无需关心细节)

```java
public class UserModel extends BaseModel<ServiceManager,CacheManager> implements UserContract.Model{
    private CommonService mCommonService;
    private CommonCache mCommonCache;

    public UserModel(ServiceManager serviceManager, CacheManager cacheManager) {
        super(serviceManager, cacheManager);
        this.mCommonService = mServiceManager.getCommonService();
        this.mCommonCache = mCacheManager.getCommonCache();
    }
    
    @Override
    public Observable<List<User>> getUsers(int lastIdQueried, boolean update) {
    
    }
  
}

```

## Presenter

> **Presenter**在**MVP**中的大部分的作用为通过从**Model**层接口获取数据,在调用**View**层接口显示数据,首先实现**BasePresenter**,指定**Model**和**View**的范型,注意一定要指定**Contract**中定义的接口,**Presenter**需要的**Model**和**View**,都使用**Dagger2**注入,这样即解藕又方便测试,[怎么注入?](https://github.com/JessYanCoding/MVPArms/wiki#2.4.2)

```java
@ActivityScope
public class UserPresenter extends BasePresenter<UserContract.Model, UserContract.View> {

    @Inject
    public UserPresenter(UserContract.Model model, UserContract.View rootView) {
        super(model, rootView);
    }
    //这里定义业务方法,相应用户的交互
    public void requestUsers(final boolean pullToRefresh) {
    ｝
}
```

## Acknowledgement

> 感谢本框架所使用到的所有三方库的**Author**,以及所有为`Open Sourece`做无私贡献的**Developer**和**Organizations**,使我们能更好的工作和学习,本人也会将业余时间回报给开源社区


1. [`Mvp`Google官方出品的`Mvp`架构项目，含有多个不同的架构分支(此为Dagger分支).](https://github.com/googlesamples/android-architecture/tree/todo-mvp-dagger/)
2. [`Dagger2`Google根据Square的Dagger1出品的依赖注入框架，通过Apt编译时生成代码，性能优于使用运行时反射技术的依赖注入框架.](https://github.com/google/dagger)
3. [`Rxjava`提供优雅的响应式Api解决异步请求以及事件处理.](https://github.com/ReactiveX/RxJava)
4. [`RxAndroid`为Android提供响应式Api.](https://github.com/ReactiveX/RxAndroid)
5. [`Rxlifecycle`在Android上使用rxjava都知道的一个坑，就是生命周期的解除订阅，这个框架通过绑定activity和fragment的生命周期完美解决.](https://github.com/trello/RxLifecycle)
6. [`RxCache`是使用注解为Retrofit加入二级缓存(内存,磁盘)的缓存库.](https://github.com/VictorAlbertos/RxCache)
7. [`RxErroHandler` 是 `Rxjava` 的错误处理库,可在出现错误后重试.](https://github.com/JessYanCoding/RxErrorHandler)
8. [`RxPermissions`用于处理Android运行时权限的响应式库.](https://github.com/tbruyelle/RxPermissions)
9. [`Retrofit`Square出品的网络请求库，极大的减少了http请求的代码和步骤.](https://github.com/square/retrofit)
10. [`Okhttp`同样Square出品，不多介绍，做Android都应该知道.](https://github.com/square/okhttp)
11. [`Autolayout`鸿洋大神的Android全尺寸适配框架.](https://github.com/hongyangAndroid/AndroidAutoLayout)
12. [`Gson`Google官方的Json Convert框架.](https://github.com/google/gson)
13. [`Butterknife`JakeWharton大神出品的view注入框架.](https://github.com/JakeWharton/butterknife)
14. [`Androideventbus`一个轻量级使用注解的Eventbus.](https://github.com/hehonghui/AndroidEventBus)
15. [`Timber`JakeWharton大神出品Log框架容器，内部代码极少，但是思想非常不错.](https://github.com/JakeWharton/timber)
16. [`Glide`此库为本框架默认封装图片加载库，可参照着例子更改为其他的库，Api和`Picasso`差不多,缓存机制比`Picasso`复杂,速度快，适合处理大型图片流，支持gfit，`Fresco`太大了！，在5.0以下优势很大，5.0以上系统默认使用的内存管理和`Fresco`类似.](https://github.com/bumptech/glide)
17. [`LeakCanary`Square出品的专门用来检测`Android`和`Java`的内存泄漏,通过通知栏提示内存泄漏信息.](https://github.com/square/leakcanary)

---
**Hello 我叫Jessyan,如果您喜欢我的文章,可以在以下平台关注我😘**
* GitHub:  <https://github.com/JessYanCoding>
* 掘金: <https://gold.xitu.io/user/57a9dbd9165abd0061714613>
* 简书: <http://www.jianshu.com/u/1d0c0bc634db>