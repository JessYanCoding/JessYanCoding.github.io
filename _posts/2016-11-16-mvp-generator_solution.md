# 项目里使用MVP和Dagger的有福了!!!绝对提升效率

* 在之前的[文章里](http://gold.xitu.io/entry/5826c2f40ce4630056f8a18f/detail)提到了我们为什么要在项目中使用`MVP`,`Dagger`,`Rxjava`,为很多才接触这些技术的朋友解答了疑惑


* 随着项目迭代,代码量的增大,它们带给我们的好处会越来越明显,但是在前期的开发中绝对有一点让不少朋友烦恼,那就是每写一个页面,都会多写很多**MVP**和**Dagger**类和接口,虽然可以重用,但是还是有很多地方免不了复制粘贴,其实这些文件都是一些模版代码,大多都只是改一下文件名而已,所以有没有方法自动生成这些模版代码呢?

## 使用Template生成模版代码

* 如果之前已经用过`Template`那你可以直接跳到最后,后面附送[MVPArms](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md)框架的**MVP**及**Dagger**相关类的模版,现在可以非常轻松使用`MVPArms `框架,构建自己的**MVP**+**Dagger2**+**Retrofit**+**Rxjava**项目,你只用专注于逻辑,其他都交给`MVPArms `