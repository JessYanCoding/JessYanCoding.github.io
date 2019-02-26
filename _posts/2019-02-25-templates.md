---
layout: post
title: 效率提升百分之四十，AS模板也太好用了吧
tags: [Templates]
modified: 2019-02-25
image:
  feature: abstract-1.jpg
---

CV 工程师你好，以下内容会让你感觉到不适，慎入！


![image](http://upload-images.jianshu.io/upload_images/2974769-1140507e223ed1c4?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在平时的开发工作中，我们经常将一个地方的代码，复制粘贴到另外一个地方，俗称搬砖，搬砖搬多了，作为一个资深的挨踢民工，难免会总结一些提高生产力的搬砖经验


![image](http://upload-images.jianshu.io/upload_images/2974769-3b1afc8d85f75091?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Android Studio 模板是个提高生产力的好东西，使用过 MVPArms 的朋友，都应该使用过我提供的配套模板，使用该套模板，一键即可生成整个页面需要的所有文件，甚至还可以一键生成整个 Module，真正的解放了大家的双手，让大家的双手可以去做更多热爱的事情


![image](http://upload-images.jianshu.io/upload_images/2974769-dadd1cf5da805a4d?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Android Stuidio 模板一共有 4 种类型，分别对应不同的功能，我先来简单介绍下这 4 种模板，最后再着重介绍下一键生成 Module 的模板，因为前面 3 种模板在网上有太多优秀的教程了，而 Module 模板的资料非常少，我再重复写一遍前 3 种模板的教程也不一定有别人写得好，意义并不大，所以我前面只做简单介绍，后面会贴出一些教程链接，没了解过的就当科普了，了解过的就直接跳过


![image](http://upload-images.jianshu.io/upload_images/2974769-e12580d4548ae690?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

现在还差几个 star 就超过 Mozilla 在模板语言 Freemarker 中排名 star 全球第一了，让我得瑟一下😏


![image](http://upload-images.jianshu.io/upload_images/2974769-7bedd83c5eb7c978?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Live Templates

Live Templates 的功能主要是根据关键字快速生成代码块


![image](http://upload-images.jianshu.io/upload_images/2974769-b708734058e28f8b?imageMogr2/auto-orient/strip)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

在设置中找到 Live Templates，点击红框中的按钮 "+"，即可新建 Live Templates


![image](http://upload-images.jianshu.io/upload_images/2974769-06f499d2bc389c16?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## File Templates
File Templates 顾名思义，主要功能就是一键生成单个文件


![image](http://upload-images.jianshu.io/upload_images/2974769-ac257dcc05784a7c?imageMogr2/auto-orient/strip)

在设置中找到 File and Code Templates，点击红框中的按钮 "+"，即可新建 File Templates


![image](http://upload-images.jianshu.io/upload_images/2974769-21da25a356300083?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Activity Templates
Activity Templates 可以一键生成多个文件，但不光可以生成 Activity 文件，还可以根据需求生成任何 Java 文件、XML 文件以及其他类型的文件


![image](http://upload-images.jianshu.io/upload_images/2974769-e0d264a482e88d8e?imageMogr2/auto-orient/strip)

新建 Activity Templates 要比上面的两个模板复杂的多，需要使用到 FreeMarker，感兴趣的朋友，可以看看我开源的 [Activity Templates](https://github.com/JessYanCoding/MVPArmsTemplate)，稍微修改一下就能应用到自己的项目当中

## module Templates
module Templates 可以一键生成 Module 以及 Module 中所需要的所有文件


![image](http://upload-images.jianshu.io/upload_images/2974769-dc02ba6b268e0745?imageMogr2/auto-orient/strip)

module Templates 也是使用 FreeMarker 创建的，如果你能理解 Activity Templates，那你也可以快速的新建一个 module Templates

## 详解 module Templates
不知道大家了解过一键生成 Module 的 Android Stuidio 模板吗，这种类型的模板我在网上没搜到有相关的开源库和文章，所以我就自己研究了一段时间，在去年就开源给了 MVPArms 的使用者

Module Templates 其实要比 Activity Templates 简单很多，因为 Module Templates 的某些限制，导致它的配置面板不能自定义一些新增的功能，所以复杂性降低很多，但是功能性和灵活性就要弱于 Activity Templates，不过即使这样也能满足我们大部分的需求了

Android Studio 中所有的 module Templates 都放在 gradle-projects 这个目录中（Android Studio 安装目录/plugins/android/lib/templates/gradle-projects），如果按照很多教程中对 Activity Templates 学习方法的描述，我们应该按照和 Activity Templates 一样的学习方式，打开 gradle-projects 目录中的 NewAndroidModule 进行学习


![image](http://upload-images.jianshu.io/upload_images/2974769-24df7f987cde4bc6?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


但是我可以告诉大家，在你没有足够经验的情况下，最好不要这样做，因为这个文件夹中包含着 Android Studio 创建 Android Module 所需要的所有文件和代码，里面比较复杂，有很多判断条件，很多东西对你的项目来说都用不到，在学习时会耽误你很多时间


![image](http://upload-images.jianshu.io/upload_images/2974769-97b367d979f63a87?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以为了让大家快速上手，我就用我已经开源的 [module Templates](https://github.com/JessYanCoding/MVPArms-Module-Template) 作为学习案例，里面的所有文件和代码都是经过我筛选过后提取出来的，非常易于大家学习和理解

## module Templates 结构

```
NewArmsComponent
├── root
│   ├── res //Module 中的资源文件都放这里
│   ├── ├── anim
│   ├── ├── layout
│   ├── ├── mipmap-hdpi
│   ├── ├── mipmap-xhdpi
│   ├── ├── mipmap-xxhdpi
│   ├── ├── mipmap-xxxhdpi
│   ├── ├── values
│   ├── src/app_package   //Module 中的源文件模板都放这里
│   ├── ├── ActivityLifecycleCallbacksImpl.java.ftl
│   ├── ├── Api.java.ftl
│   ├── ├── AppLifecyclesImpl.java.ftl
│   ├── ├── ...
│   ├── test/app_package   //Module 中的测试文件模板都放这里
│   ├── ├── ExampleInstrumentedTest.java.ftl
│   ├── ├── ExampleUnitTest.java.ftl
│   ├── AndroidManifest.xml.ftl   //AndroidManifest.xml 模板文件
│   ├── CMakeLists.txt.ftl   //不用 CMake 可以忽略
│   ├── build.gradle.ftl   //App build.gradle 模板文件
│   ├── native-lib.cpp.ftl   //不用 C 可以忽略
│   ├── root-build.gradle.ftl   //根目录 build.gradle 模板文件
│   ├── settings.gradle.ftl   //settings.gradle 模板文件
├── globals.xml.ftl
├── recipe.xml.ftl
├── template.xml
├── template_new_project.png
```
root 文件夹下包含的是生成 Module 所需要的模板文件，template_new_project.png 是模板的封面图，globals.xml.ftl 我们暂时用不到，recipe.xml.ftl、template.xml 这两个文件存放的是模板的配置参数，是整个模板的核心文件，我们来看看这两个文件

## template.xml
template.xml 放置的是配置面板的参数，配置面板是什么东西？看下图


![image](http://upload-images.jianshu.io/upload_images/2974769-b55dcd2c7f345ceb?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

module Templates 和 Activity Templates 的配置面板不一样，Activity Templates 可以任意修改和新增配置面板中的项目，但是 module Templates 不可以，只能固定为图中的这四项

看看 template.xml 里面的内容

```xml
<?xml version="1.0"?>
<template
    format="5"
    revision="2"
    name="MVPArms Module"
    description="Creates a new MVPArms Module.">

    <category value="Application" />

    <formfactor value="Things" />

----------------------- 分割线 -----------------------
    <thumbs>
        <thumb>template_new_project.png</thumb>
    </thumbs>
    
    <parameter
        id="packageName"
        name="Package name"
        type="string"
        constraints="app_package|nonempty"
        default="com.mycompany.myapp" />
        
    ...
    
 <globals file="globals.xml.ftl" />
 <execute file="recipe.xml.ftl" />
</template>        
```

只用看分割线以上的标签即可，下面的标签基本用不上，每个 parameter 标签在配置面板中都对应一个项目，但 parameter 标签只在 Activity Templates 中可以任意修改和新增，在 module Templates 中的任何修改和新增都是无效的，这点大家可以试试

name 标签和 description 标签顾名思义，这就不用多解释了，category 标签固定为 Application 即可

这里要特别要提一下 formfactor 标签，在 NewAndroidModule 中，formfactor 标签的值为 Mobile，最开始我也和它一样，将值赋为 Mobile，结果发现无法生成文件，我想可能是 Android Studio 只允许存在一个 Android 的 Module 模板，我又试着改成了 TV、Glass、Wear ...，发现都不完美，要不是无法生成文件，要不就生成太多不需要的文件，最后改成 Things 后，效果就接近完美了

## recipe.xml.ftl
recipe.xml.ftl 的功能就是告诉模板引擎，你打算怎么处理你的模板文件

```xml
<?xml version="1.0"?>
<!-- TODO: check include Cpp support; add driver module template -->
<recipe>
    <mkdir at="${escapeXmlAttribute(projectOut)}/libs" />
    <mkdir at="${escapeXmlAttribute(resOut)}/anim" />
    <mkdir at="${projectOut}/src/main/java/${slashedPackageName(packageName)}/app/utils" />

    <merge from="root/settings.gradle.ftl"
             to="${escapeXmlAttribute(topOut)}/settings.gradle" />
    <merge from="root/root-build.gradle.ftl"
             to="${escapeXmlAttribute(topOut)}/build.gradle" />
             
    <copy from="root/res/mipmap-hdpi/ic_launcher.png"
        to="${escapeXmlAttribute(resOut)}/mipmap-hdpi/ic_launcher.png" />
    <copy from="root/res/mipmap-xhdpi/ic_launcher.png"
        to="${escapeXmlAttribute(resOut)}/mipmap-xhdpi/ic_launcher.png" />
    <copy from="root/res/mipmap-xxhdpi/ic_launcher.png"
        to="${escapeXmlAttribute(resOut)}/mipmap-xxhdpi/ic_launcher.png" />
    <copy from="root/res/mipmap-xxxhdpi/ic_launcher.png"
        to="${escapeXmlAttribute(resOut)}/mipmap-xxxhdpi/ic_launcher.png" />                  

    <instantiate from="root/build.gradle.ftl"
                   to="${escapeXmlAttribute(projectOut)}/build.gradle" />
    <instantiate from="root/AndroidManifest.xml.ftl"
                   to="${escapeXmlAttribute(manifestOut)}/AndroidManifest.xml" />
    <instantiate from="root/res/values/styles.xml.ftl"
                   to="${escapeXmlAttribute(resOut)}/values/styles.xml" />

    <instantiate from="root/src/app_package/GlobalConfiguration.java.ftl"
                   to="${projectOut}/src/main/java/${slashedPackageName(packageName)}/app/GlobalConfiguration.java" />
    <open file="${projectOut}/src/main/java/${slashedPackageName(packageName)}/app/GlobalConfiguration.java" />
    <instantiate from="root/src/app_package/AppLifecyclesImpl.java.ftl"
                   to="${projectOut}/src/main/java/${slashedPackageName(packageName)}/app/AppLifecyclesImpl.java" />
    <open file="${projectOut}/src/main/java/${slashedPackageName(packageName)}/app/AppLifecyclesImpl.java" />
       
<#if unitTestsSupported>
    <instantiate from="root/test/app_package/ExampleUnitTest.java.ftl"
                   to="${escapeXmlAttribute(unitTestOut)}/ExampleUnitTest.java" />
</#if>          
</recipe>
```

Module 所需要的模板文件都放在 root 文件夹下，而使用 recipe.xml.ftl 中的标签就是为了告诉模版引擎，你打算将哪个模板文件通过什么方式放到 Module 中的什么位置

mkdir 标签，顾名思义，就是生成一个空的文件夹

merge 标签中的 from 填写模板文件的地址，to 填写 Module 中的目标位置，merge 标签会将 from 中填写的模板文件，放到 to 中填写的目标位置上，如果目标位置已经存在一个相同文件名的文件，则将模板文件中的全部内容复制到已经存在的文件中，否则则创建一个新的文件

copy 标签会将 from 中填写的文件，放到 to 中填写的目标位置上，如果目标位置已经存在一个相同文件名的文件，则会覆盖此文件

instantiate 标签会将 from 中填写的模板文件，放到 to 中填写的目标位置上，如果目标位置已经存在一个相同文件名的文件，则会覆盖此文件，看描述和 copy 标签差不多，那它们的区别是什么呢？

copy 标签的目标对象是普通文件，也就是没有 .ftl 后缀的文件，instantiate 标签的目标对象是模板文件，也就是有 .ftl 后缀的文件，那有 .ftl 后缀的文件和没有 .ftl 后缀的文件有什么区别呢？

有 .ftl 后缀的文件中可以使用 FreeMarker 语法，在生成文件时，模版引擎会根据文件中的 FreeMarker 语法对文件内容进行相应的修改，比如根据不同的条件生成不同的内容，而没有 .ftl 后缀的文件，文件中的内容一旦确定在生成时是无法改变的，就如同单纯的复制粘贴

\${escapeXmlAttribute(resOut)} 对应的是 Module 中的 res 文件夹

\${projectOut}/src/main/java/${slashedPackageName(packageName)} 对应的是包名下的根目录

\${escapeXmlAttribute(topOut)} 对应的是整个工程的根目录

\${escapeXmlAttribute(projectOut)} 对应的是 Module 的根目录

\${escapeXmlAttribute(manifestOut)} 对应的是放置 AndroidManifest.xml 的文件夹

\${escapeXmlAttribute(testOut)} 对应的是 Module 中放置测试文件的文件夹

## 模板文件
root 文件夹下模板文件的编写也不难，因为 module Templates 没有用到自定义变量，所以大多数情况下，就是将你写好的 java 文件，后面加上 .ftl 后缀即可，看看下面我贴出的源代码链接，你很快就能上手

你如果还想学到更多的 FreeMarker 语法，可以翻翻下面贴出的 FreeMarker 中文文档

## 开源代码链接
[我给 MVPArms 写的 File Templates](https://github.com/JessYanCoding/MVPArms/blob/master/MVP_generator_solution)

[我给 MVPArms 写的 Activity Templates](https://github.com/JessYanCoding/MVPArmsTemplate)

[我给 MVPArms 写的 module Templates](https://github.com/JessYanCoding/MVPArms-Module-Template)

[我给组件化项目写的 module Templates](https://github.com/JessYanCoding/ArmsComponent-Template)


## 教程链接
[快速写出 Activity Templates 的插件](https://www.jianshu.com/p/e3548f441440)

[Live Templates 教程](https://www.jianshu.com/p/065877f0c33d)

[File Templates 教程](https://www.jianshu.com/p/57e734864b46)

[Activity Templates 教程](https://blog.csdn.net/lmj623565791/article/details/51635533)

[FreeMarker 中文文档](http://freemarker.foofun.cn/toc.html)

## 公众号
扫码关注我的公众号 JessYan，一起学习进步，如果框架有更新，我也会在公众号上第一时间通知大家


![image](http://upload-images.jianshu.io/upload_images/2974769-222576128821ca4a?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
**Hello 我叫 JessYan，如果您喜欢我的文章，可以在以下平台关注我**

* 个人主页: <http://jessyan.me>
* GitHub: <https://github.com/JessYanCoding>
* 掘金: <https://gold.xitu.io/user/57a9dbd9165abd0061714613>
* 简书: <http://www.jianshu.com/u/1d0c0bc634db>
* 微博: <http://weibo.com/u/1786262517>

-- The end