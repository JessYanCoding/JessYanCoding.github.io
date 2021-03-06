---
layout: post
title: Android布局性能优化
tags: [性能优化]
modified: 2016-08-23
image:
  feature: abstract-8.jpg
---

# 前言

* 我们每天都在写各种各样的布局，对于一些简单的布局我们不会考虑`性能`的问题，但是对于一些复杂且层级嵌套较深的布局有没有想过可能存在的`性能`问题呢？接下来介绍几个`Layout标签`轻松优化布局性能

# 1.Include标签

### 介绍:

* `include`标签的作用就是把一些复杂或者可重用的的页面抽取出来单独放到一个`xml`文件中，然后使用此标签导入到需要使用的布局中

### 用法:

```xml
<include
android:id="@+id/include"
layout="@layout/引用的布局文件" />

```

### 注意:

* `include`标签若指定了ID属性，而你的layout也定义了ID，则你的layout的ID会被覆盖
* 在`include`标签中所有的Android:layout_*都是有效的，前提是必须要写layout_width和layout_height两个属性。


# 2.Merge标签

### 介绍:

* `merge`标签的作用是合并UI布局，减少视图层级，多用于替换`FrameLayout`(`Activity｀的根布局为｀FrameLayout`)或者当一个布局包含另一个布局时（布局的根元素必须一致）

### 用法:
* 因为`Activity`的根元素是`FrameLayout`，如果你以前这样写`Activity`的布局文件:

```xml
< FrameLayout   xmlns:android = "http://schemas.android.com/apk/res/android"
     android:layout_width = "fill_parent"
     android:layout_height = "fill_parent" >
     < ImageView
         android:layout_width = "fill_parent"
         android:layout_height = "fill_parent"  
         android:scaleType = "center"
         android:src = "@drawable/sample"   />
     < TextView
         android:layout_width = "wrap_content"
         android:layout_height = "wrap_content"
         android:text = "sample"   />
</ FrameLayout >
```
* 现在你可以把根元素`FrameLayout`换成`merge`，像这样:

```xml
< merge   xmlns:android = "http://schemas.android.com/apk/res/android" >
     < ImageView
         android:layout_width = "fill_parent"
         android:layout_height = "fill_parent"  
         android:scaleType = "center"
         android:src = "@drawable/sample"   />
     < TextView
         android:layout_width = "wrap_content"
         android:layout_height = "wrap_content"
         android:text = "sample"   />
</ merge >
```
* 这时通过`HierarchyViewer`工具，你可以看到`FrameLayout`已经不见了

### 注意:
* 被`include`进来的布局文件可以使用`merge`标签

* 使用`merge`作为布局的根元素的时候，我们原来被`merge`替代的顶节点是不能有多余的属性的，否则`merge`实现不了.
*  `merge`只能用于`xml layout`文件的根元素
*  在代码中`inflate`一个以`merge`为根元素的
布局文件时候，你需要指定一个`ViewGroup`作为其容器，并且要设置**attachToRoot**为**true**

# 3.ViewStub

### 介绍:
  
* `ViewStub`是一个用于在运行时加载布局资源、不可见、宽高为0的`View`(未`inflate`时，隐藏、不绘制、宽高为0，不会消耗程序资源)
* 多用于在程序运行时根据条件来决定显示/隐藏哪个视图

### 用法:
* 在`xml`使用`ViewStub`占位

```xml
<ViewStub 
	android:layout="@layout/text" 
	android:layout_width="match_parent"
	android:layout_height="wrap_content"
	android:id="@+id/viewStub" />
```
* 在需要时`inflate`

```java
//方法1
ViewStub stub = (ViewStub)findViewById(R.id.viewStub);
stub.inflate(); //显示布局
//方法2
ViewStub stub = (ViewStub)findViewById(R.id.viewStub);
stub.setVisibility(View.VISIBLE);

```

### 注意:
* 当调用`inflate()`函数的时候，`ViewStub`被引用的资源替代，并且返回引用的`view`，这样程序可以直接得到引用的view而不用再次调用函数findViewById()来查找了。

* `ViewStub`只能够被`inflate`一次，一旦加载后`ViewStub`对象就会被置为空；
* `ViewStub`目前不支持`merge`

# 4.Space

### 介绍:
* `Space`用于在布局文件中占位(如分割线)，不绘制(未实现`onDraw`方法)，但是有宽高，用于解决过渡绘制

### 用法:

```java
 <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"/>
```

### 注意:
* `Space`只能设置宽高，因为他没有重写`onDraw`方法，所有就算设置了`android:background`也是无效的
