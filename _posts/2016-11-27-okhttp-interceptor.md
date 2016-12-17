# 你在用Retrofit或OkHttp开发时,是否忽略了一个强大的功能?
 **推荐**：看到如此多的**MVP**+**Dagger2**+**Retrofit**+**Rxjava**项目,轻松拿**star**,心动了吗？[`MVPArms`](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md)是一个 **MVP**+**Dagger2**+**Retrofit**+**Rxjava**快速集成框架,自带上万字[文档](https://github.com/JessYanCoding/MVPArms/wiki)以及自动生成**MVP**和**Dagger2**文件等功能,你只用专注于逻辑,其他都交给[`MVPArms`](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md),快来构建自己的**MVP**+**Dagger2**+**Retrofit**+**Rxjava**项目,轻轻松松拿**star**!|
:----------:|
## WHAT？
* 有这样一个需求,我们需要对所有接口的请求内容进行加密并且在每个请求接口的**Header**中加入**Token**,我们如果在每个接口请求时都重复做加入**Token**和加密这两个动作这无疑是最**low**的,不仅工作量大,一旦有需求变动,我们每个地方还要继续重复无意义的工作

* 这时有点经验的肯定要自己封装一个统一的请求入口,这样所有请求都是使用同一个入口,不用做重复的工作,有变动也只用更改一处地方

* 但是我告诉你如果你使用`OKHttp`或者`Retrofit`做网络请求的话,这种做法同样**low**

## WHY?

* 像在[**MVPArms**]()里就是使用`Retrofit`加`Dagger2`的方式提供网络请求,我每个需要网络请求的地方,拿到的只是用`Dagger2`管理的`Retrofit`提供的动态代理类,我们并没有在统一的入口里拿到请求的参数,那我是怎么实现上面的需求呢？

## 进入正题

* `Retrofit`默认使用的是`OKHttp`做网络请求,`OKHttp`内部其实已经有一个叫**Interceptor**的类,可以实现上面的需求,并且远远比自己封装的强大

* 强大到哪里呢?在这里不仅可以拿到请求参数,还可以拿到请求头,连接状态等所有请求的信息,并且还可以控制,是否拦截请求和服务器的响应信息,接下来我就通过源码来简单分析下**Interceptor**
