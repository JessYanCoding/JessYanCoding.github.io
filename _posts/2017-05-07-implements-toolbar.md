---
layout: post
title:  我一行代码都不写实现Toolbar!你却还在封装BaseActivity?
tags: [ToolBar,Activity]
modified: 2017-05-07
image:
  feature: abstract-3.jpg
---


# 前言
距离 [上篇文章](http://www.jianshu.com/p/ac51c9b88af3) 的发表时间已经过去两个多月了,这两个月时间里我没写文章但一直在更新着我的 [MVPArms](https://github.com/JessYanCoding/MVPArms) 框架,让他逐渐朝着 **可配置化集成框架** 发展

就在前段时间我在 **鸿洋公众号** 上看到了一篇文章,大概是介绍怎么封装 **BaseActivity** ,让 **Activity** 通过几行代码就可以实现 **ToolBar** 

刚好我的 [MVPArms](https://github.com/JessYanCoding/MVPArms) 框架也更新了一个功能: 

> 通过非继承 Activity Fragment 来实现以前需要封装进 BaseActivity  BaseFragment 通过继承来实现的一些公共逻辑,以及监听整个 **App** 所有 **Activity** 以及 **Fragment** 的生命周期(包括三方库),并可向其生命周期内插入代码


*那我就来说说我怎么在不使用继承的情况下让 **Activty** 一行代码都不写就能实现 Toolbar*

# 为什么我提倡少封装 BaseActvity 少用继承

**BaseActivity** 封装多了,除了不好管理外,还有最重要的一点就是, `Java` 只能单继承,当如果你的 **Activity** 需要使用到某个三方库,那个三方库必须让你继承于它的 **Activity** 但是你又需要你自己封装的 **BaseActivity** 的某些特性,这时你怎么办? 你不能改三方库的 **Activity** 所以你只有改你的 **BaseActivity** 让它去继承三方库的 **Activity**,但是当改了 **BaseActivity** 后,发现有很多继承于 **BaseActivity** 的 **Activity** 并不需要这个三方库,却被迫继承了它的 **Activity** ,这时你又要重新封装一个 **BaseActivity** 

当这种情况发生的多了,你的 **BaseActiviy** 也越来越多,这样就恶性循环了,所以我不仅提倡 **App** 开发者少封装 **BaseActivity** 少用继承,也提倡 **三方库** 开发者少封装 **BaseActivity** 少用继承,为什么呢?因为当 **App** 开发者的 **Activity** 需要使用到两个三方库,两个三方库都需要继承它的 **Activity**,这时你让 **App** 开发者怎么办?所以作为一个**可配置化集成框架**作者,我不能让开发者去直接改我的 **BaseActivity** 我必须通过其他扩展的方式去解决这个问题

# 进入正题

好了进入正题,要想解决上面提到的问题,我们就要思考我们为什么一定要封装 **BaseActivity** 通过继承来实现一些 **Activity** 的公共逻辑,而不能将公共逻辑封装到其他类里面?

答案很简单,因为我们必须使用到 **Activity** 的一些生命周期,在对应的生命周期里执行对应的逻辑,这个就是我们不能通过封装其他类来实现的原因,找到了问题关键,那我们就从生命周期上下手来解决问题

# ActivityLifecycleCallbacks

提到 **Activity** 的生命周期,这时我就要介绍一个接口了,它叫 **ActivityLifecycleCallbacks** ,不知道有同学之前了解过它吗?不了解不要紧,我现在来介绍介绍它

**ActivityLifecycleCallbacks** 是 **Application** 中声明的一个内部接口,我们来看看它的结构

```
public interface ActivityLifecycleCallbacks {
        void onActivityCreated(Activity activity, Bundle savedInstanceState);
        void onActivityStarted(Activity activity);
        void onActivityResumed(Activity activity);
        void onActivityPaused(Activity activity);
        void onActivityStopped(Activity activity);
        void onActivitySaveInstanceState(Activity activity, Bundle outState);
        void onActivityDestroyed(Activity activity);
    }


```

## 这个接口有什么用呢?

**Application** 提供有一个 **registerActivityLifecycleCallbacks()** 的方法,需要传入的参数就是这个 **ActivityLifecycleCallbacks** 接口,作用和你猜的没错,就是在你调用这个方法传入这个接口实现类后,系统会在每个 **Activity** 执行完对应的生命周期后都调用这个实现类中对应的方法,请记住是每个!

这个时候我们就会想到一个需求实现,关闭所有 **Activity** !你还在通过继承 **BaseActivity** 在 **BaseActivity** 的 **onCreate** 中将这个 **Activity** 加入集合???

那我现在就告诉你这样的弊端,如果你 **App** 中打开有其他三方库的 **Activity** ,这个三方库肯定不可能继承你的 **BaseActivity** ,这时你怎么办?怎么办？

这时 **ActivityLifecycleCallbacks** 就派上用场了, **App** 中的所有 **Activity** 只要执行完生命周期就一定会调用这个接口实现类的对应方法, 那你就可以在 **onActivityCreated** 中将所有 **Activity** 加入集合,这样不管你是不是三方库的 **Activity** 我都可以遍历集合 **finish** 所有的 **Activity**

# 使用 ActivityLifecycleCallbacks 实现 ToolBar

## 设置 NoActionBar 主题



```
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
</style>

```
```
<application
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/AppTheme">
    ...
</application>

```


## 创建 ToolBar 的布局并引用

大家不要纠结我的 **Toolbar** 布局方式,这里只是实现思想,你可以自己改成自己的布局方式

```
<me.jessyan.art.widget.autolayout.AutoToolbar
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="120px"
    android:background="?attr/colorPrimary"
    app:contentInsetStart="0dp"
    >

	// toolbar 中的返回按钮
    <com.zhy.autolayout.AutoRelativeLayout
        android:id="@+id/toolbar_back"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:gravity="left"
        >

        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="30px"
            android:layout_marginRight="30px"
            android:layout_centerVertical="true"
            android:src="@mipmap/login_return"/>

    </com.zhy.autolayout.AutoRelativeLayout>

	// toolbar 中的标题名
    <TextView
        android:id="@+id/toolbar_title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18dp"
        android:textColor="#fff"
        android:layout_gravity="center"
        tools:text="MVPArt"/>


</me.jessyan.art.widget.autolayout.AutoToolbar>
```

在你需要 **Toolbar** 的 **Activity** 布局中 **include** 上面的布局

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    >

	//将 Toolbar 包裹进来
    <include layout="@layout/include_title"/>

    <android.support.v4.widget.SwipeRefreshLayout
        android:id="@+id/swipeRefreshLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:paddingLeft="15px"
        android:paddingTop="15px"
        >

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recyclerView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:scrollbars="vertical"
            tools:listitem="@layout/recycle_list"
            />

    </android.support.v4.widget.SwipeRefreshLayout>
</LinearLayout>

```  


## 实现 ActivityLifecycleCallbacks 并注册给 Application

下面只是对 **ToolBar** 简单的设置,你可以自己配置更多复杂的功能,你想象力有多丰富,这里就有多强大

```
public class WEApplication extends BaseApplication{

    @Override
    public void onCreate() {
        super.onCreate();
        registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
                //这里全局给Activity设置toolbar和title,你想象力有多丰富,这里就有多强大,以前放到BaseActivity的操作都可以放到这里
                if (activity.findViewById(R.id.toolbar) != null) { //找到 Toolbar 并且替换 Actionbar
                    if (activity instanceof AppCompatActivity) {
                        ((AppCompatActivity) activity).setSupportActionBar((Toolbar) activity.findViewById(R.id.toolbar));
                        ((AppCompatActivity) activity).getSupportActionBar().setDisplayShowTitleEnabled(false);
                    } else {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                            activity.setActionBar((android.widget.Toolbar) activity.findViewById(R.id.toolbar));
                            activity.getActionBar().setDisplayShowTitleEnabled(false);
                        }
                    }
                }
                if (activity.findViewById(R.id.toolbar_title) != null) { //找到 Toolbar 的标题栏并设置标题名
                    ((TextView) activity.findViewById(R.id.toolbar_title)).setText(activity.getTitle());
                }
                if (activity.findViewById(R.id.toolbar_back) != null) { //找到 Toolbar 的返回按钮,并且设置点击事件,点击关闭这个 Activity
                    activity.findViewById(R.id.toolbar_back).setOnClickListener(v -> {
                        activity.onBackPressed();
                    });
                }
            }

            ...
            
        });
    }
}

```

## 在 AndroidManifest.xml 中设置 Label
以后你想让一个 **Activity** 实现 **ToolBar** ,只用做两件事情:

1. 在布局文件中

```
 <include layout="@layout/include_title"/>
```

2. 在 **AndroidManifest.xml** 给这个 **Activity** 设置 **Label** ,这个 **Label** 就是标题名

```
        <activity
            android:name=".mvp.ui.activity.SplashActivity"
            android:label="@string/app_name"
            />

```

再介绍给大家一个全局配置所有 **Activity** 进入退出过度动画的方法,设置 **Theme** 属性

```
 <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:windowAnimationStyle">@style/AnimaActivity</item>
    </style>
    <style name="AnimaActivity">
        <item name="android:activityOpenEnterAnimation">@anim/translate_right_to_center</item>
        <item name="android:activityOpenExitAnimation">@anim/translate_center_to_left</item>
        <item name="android:activityCloseEnterAnimation">@anim/translate_left_to_center</item>
        <item name="android:activityCloseExitAnimation">@anim/translate_center_to_right</item>
    </style>

```

## 在 **Activity** 中你根本不用继承任何 **Activity** ,不用写任何一行代码,就可以实现很多繁琐复杂的功能

很多公共逻辑都可以写到 **ActivityLifecycleCallbacks** 中,只要敢于尝试,你想象力有多丰富,这里就有多强大

# 扩展

因为所有 **Activity** 在执行对应生命周期时, **ActivityLifecycleCallbacks** 对应的方法都会被调用,有些 **Activity** 可能不需要 **Toolbar** ,比如三方库的 **Activity** ,虽然在 **onActivityCreated** 方法中,判断了 **ToolBar** 的 **Id** 找不到就不执行设置 **ToolBar** 的逻辑,但是未免不够优雅

## 自定义接口

其实我们可以让 **Activity** 实现对应的自定义接口, 在 **onActivityCreated** 中 **instanceof** 这个自定义接口,如果不实现这个自定义接口,就说明不需要设置 **ToolBar** ,这样就优雅很多

## 储存数据

在 **ActivityLifecycleCallbacks** 中,所有 **Activity** 执行对应的生命周期后,它对应的方法都会被调用,所以我们必须区分这个 **Activity** 到底是哪个 **Activity** ,所以 **ActivityLifecycleCallbacks** 每个方法都会传入 **Activity** 做为参数,我们就可以用来区分 **Activity**

```
public void onActivityCreated(Activity activity, Bundle savedInstanceState){
	if (activity instanceof xxxActivity){
		....
	}

}
```

但是又有一个问题出现这个 **ActivityLifecycleCallbacks** 是公用的,当一个 **Activity** 在 **onCreate** 方法产生了一个对象 ,我们需要在这个 **Activity**  执行 **onDestroy** 时用到这个对象,怎么办?因为每个 **Activity** 都要产生这个对象,我们不可能把这个对象存储在 **ActivityLifecycleCallbacks** 中啊

现在就可以用到 **Activity.getIntent** 来存储一些数据, **Intent** 中持有一个 **Bundle** 对象可以存储一些数据,

### 举个例子

我们需要使用 **ActivityLifecycleCallbacks** 实现给所有 **Activity** 执行 **ButterKnife.bind(activity)** 

**Bundle** 中可以存储 **Parcelable** 对象

```
public class ActivityBean extends Parcelable {
	private Unbinder unbinder;
	public void setUnbinder(Unbinder unbinder){
		thid.unbinder = unbinder;
	}
	
	public Unbinder getUnbinder(){
		return unbinder;
	}
}

```

在 **ActivityLifecycleCallbacks** 执行对应逻辑

```
public class WEApplication extends BaseApplication{

    @Override
    public void onCreate() {
        super.onCreate();
        registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
                ActivityBean bean = new ActivityBean();
            	Unbinder unbinder = ButterKnife.bind(activity);
            	bean.setUnbinder(unbinder);
                activity.getIntent().putExtra("ActivityBean", bean);
           }

            ...
            
            @Override
            public void onActivityDestroyed(Activity activity) {
				ActivityBean bean = activity.getIntent().getParcelableExtra("ActivityBean");
				bean.getUnbinder().unbind();
            }
        }
            
        });
    }
}

```

## 需要Activity初始化某些事,或者提供某些数据

**BaseActivity** 有些时候需要,子 **Activity** 实现某些方法,或者提供某些数据,如需要子 **Activity**
实现 **initView** 返回 **setContentView()** 中的布局 **ID** ,实现 **initData** 初始化一些数据,这样就可以不需要 **Activity** 再重写 **onCreate** ,达到规范的目的, 这样使用 **ActivityLifecycleCallbacks** 同样能做到,那我该怎么做呢?

只需要 **Activity** 实现某个自定义接口

```
public interface IActivity {

    int initView();

    void initData();

}

```

然后在 **ActivityLifecycleCallbacks** 的 **onActivityCreated** 中调用这些方法,就可以实现

```
public class WEApplication extends BaseApplication{

    @Override
    public void onCreate() {
        super.onCreate();
        registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
            if (activity instanceof IActivity) {
               activity.setContentView(((IActivity)activity).initView());
               ((IActivity)activity).initData();          
            }
              
           }

            ...
       
        }
            
        });
    }
}

```

# 注意事项

由于 **ActivityLifecycleCallbacks** 中所有方法的调用时机都是在 **Activity** 对应生命周期的 **Super** 方法中进行的,所以在 **Activity** 的 **onCreate** 方法中使用 **setContentView** 必须在 **super.onCreate(savedInstanceState);** 之前,不然在 **onActivityCreated** 方法中 **findViewById** 会发现找不到

```
@Override
    protected void onCreate(Bundle savedInstanceState) {
        setContentView(R.layout.activity_home);
        super.onCreate(savedInstanceState);
    }


```

也可以结合上面的方式使用自定义接口,调用 **initView** 后,在 **findViewById()** 找到 **ToolBar**


>  一不小心实现了这么多以前必须写到 BaseActivity 中通过继承才能达到的功能,发现没有 BaseActivity ,也并没有什么不舒服的地方,突然感觉自己好牛逼 🤒,赶快关注我吧,虽然我并不会经常更新博客,但是我更新的文章在质量上绝对有保证!


# 总结

值得注意的是 **ActivityLifecycleCallbacks** 可以注册多个,可以针对不同情况添加各种 **ActivityLifecycleCallbacks** 按照需要进行组合从而达到不同的需求 ,和 `Okhttp` 的 **Interceptor** 类似
 
现在整个 **App** 的所有 **Activity** 和 **Fragment** 只要生命周期调用都会被拦截,应用到我框架上就可以动态的向所有 **Activity** 和 **Fragment** 的对应生命周期插入任意代码,比如说 **LeakCanary** 的 **RefWatcher.watch(fragment)** 也可以直接插入到三方库的 **Fragment** 中,并且如果代码有任何改动也不用再去改基类,有点Aop的意思

以上提到的思想以及解决方案已经使用到了我的 [MVPArms](https://github.com/JessYanCoding/MVPArms) 框架中,想知道更详细的用法可以去看看我的框架实现,我上面提到的所有的实现,其实都是最简单的一些需求,相信已经颠覆了以前的实现方式了,而且更加优雅(**因为我是站在三方库设计者的角度提出这个功能的,我必须将惟一继承的机会留给其他 Activity ,你如果相较于之前的方式觉得不够优雅,那就当我没说**),更不用担心 **Java** 单继承的束缚

但是千万不要以为, **ActivityLifecycleCallbacks** 就只能实现这些简单的需求,它还可以用到更多更复杂的功能之上,还是我之前的话, **只要敢于尝试,你想象力有多丰富,这里就有多强大** ,思想以及解决方案已经介绍的很清楚了,至于更多需求的实现就靠大家去尝试咯,虽然我不敢保证以前封装 **BaseActivity** 通过继承实现的所有功能都能被 **ActivityLifecycleCallbacks** 所替代,但是我想大多数功能还是能实现的

以前大家都是分享自己封装的 **BaseActivity** ,说不定有一天大家就开发分享自己写的 **ActivityLifecycleCallbacks** 呢! 当以前的方式已经不能满足我们的需求,敢于跳出传统的方式,尝试不同的解决方案,才能扩宽自己的视野,增长自己的技术, [MVPArms](https://github.com/JessYanCoding/MVPArms) 正在不断的努力着!

---

*这里还要说一句,每个人的思路不一样,考虑的角度也不一样,你认同我也好, 不认同我也好,都不会影响我的脚步,至少我是在用我的思路创新,解决一些我认为有必要解决的问题,和上一篇的文章一样,我就是喜欢使用不一样的思路解决同样的问题,不管你是否觉得可行,我至少用这个你觉得不可行的思路实现了我想达到的效果,仁者见仁智者见智,如果我们思维没有碰撞,那也请珍惜我的劳动成果*

*对于一些评论我再说一句, **registerActivityLifecycleCallbacks()** 内部是把 **ActivityLifecycleCallbacks** 加到一个集合中,所以 **ActivityLifecycleCallbacks** 可以添加多个,并且 **ActivityLifecycleCallbacks** 只是在项目初始化的时候被装到集合中,并不会初始化任何东西,和添加监听器一个道理,使用的是观察者模式,所以不要说 **Application** 代码这么多会怎么怎么样, `Okhttp` 的 **Interceptor** 的代码更多,也是在 `Okhttp` 初始化时被添加,你觉得会有什么影响吗?*

---
**Hello 我叫Jessyan,如果您喜欢我的文章,可以在以下平台关注我**

* GitHub:  <https://github.com/JessYanCoding>
* 掘金: <https://gold.xitu.io/user/57a9dbd9165abd0061714613>
* 简书: <http://www.jianshu.com/u/1d0c0bc634db>
* 微博: <http://weibo.com/u/1786262517>

-- The end