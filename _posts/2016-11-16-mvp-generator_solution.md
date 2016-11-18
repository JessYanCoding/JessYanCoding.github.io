---
layout: post
title:  项目里使用MVP和Dagger的有福了!!!绝对提升效率
tags: [MVP,Dagger]
modified: 2016-11-18
image:
  feature: abstract-11.jpg
---


* 在之前的[文章里](http://gold.xitu.io/entry/5826c2f40ce4630056f8a18f/detail)提到了我们为什么要在项目中使用`MVP`,`Dagger`,`Rxjava`,为很多才接触这些技术的朋友解答了疑惑


* 随着项目迭代,代码量的增大,它们带给我们的好处会越来越明显,但是在前期的开发中绝对有一点让不少朋友烦恼,那就是每写一个页面,都会多写很多**MVP**和**Dagger**的类和接口,虽然可以重用,但是还是有很多地方免不了复制粘贴,其实这些文件都是一些模版代码,大多都只是改一下文件名而已,所以有没有方法自动生成这些模版代码呢?

## 使用Template生成模版代码

> 如果之前已经用过`Template`那你可以直接跳到最后,后面附送[`MVPArms`](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md)框架的**MVP**及**Dagger**相关类的模版,现在可以非常轻松使用[`MVPArms`](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md)框架,构建属于自己的**MVP**+**Dagger2**+**Retrofit**+**Rxjava**项目,你只用专注于逻辑,其他都交给[`MVPArms`](https://github.com/JessYanCoding/MVPArms/blob/master/MVPArms.md)

1.添加模版

![](https://github.com/JessYanCoding/MVPArms/raw/master/image/step_1.png)

2.使用模版生成相关类

![](https://github.com/JessYanCoding/MVPArms/raw/master/image/step_2.png)


## 注意事项

* 至于本框架一个页面要生存那些文件,	请以**Demo**中**mvp**包下的UserActivity为例子,在参照一下注意事项

* 通过Template生成对应页面的MVP和Dagger代码,请注意输入框中输入的名字必须相同

* 由于每个项目包结构都不一定相同,所以每生成一个文件需要自己导入import包名,可以在设置中设置自动导入包名

* 请在对应包下按以下顺序生成对应代码,Contract->Model->Presenter->Activity->Module->Component,如我要为一个名字为User的Activity生成对应文件,那我要先在Contract包下使用Contract模版生成UserContract,按此顺序直到生成完UserComponent

* 因为在按此顺序生成Activity时,Module和Component还没生成,但是Activity中有它们的引用,所以会报错,但是不用理会

* 继续将Module和Component生成完后,编译一下项目再回到Activity,按提示在setupActivityComponent()方法中修改一个方法名即可

* 如果想生成Fragment的相关文件,则将上面构建顺序中的Activity换为Fragment,并将通过模版生成的Component接口中inject方法的参数改为此Fragment

* 如果你不使用本框架也可以根据自己的需求调整或者新建自己的模版,自动生成自己想要的**mvp**和**dagger**文件

## Where

> [模版规则在项目根目录的`MVP_generator_solution`文件中](https://github.com/JessYanCoding/MVPArms/blob/master/MVP_generator_solution)
