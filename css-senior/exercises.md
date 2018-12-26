# 3D技术在前端应用和发展

课程大纲
* HTML5陀螺仪
* CSS3 3D模型
* 结合Touch事件
* CSS 3D库
* JS类库

## 陀螺仪

陀螺仪又叫角速度传感器，是不同于加速度计（G-sensor）的，他的测量物理量是偏转、倾斜时的转动角速度。在手机上，仅用加速度计没办法测量或重构出完整的3D动作，测不到转动的动作的，G-sensor只能检测轴向的线性动作。但陀螺仪则可以对转动、偏转的动作做很好的测量，这样就可以精确分析判断出使用者的实际动作。而后根据动作，可以对手机做相应的操作！

设备方向定义了三种旋转：

Alpha：以Z轴为轴的旋转为alpha。其范围为0到360度，当前指向表示为z。
Beta：以X轴为轴的旋转为beta。其范围为-180到180度，当前指向表示为x。
Gamma：以Y轴为轴的旋转为gamma。其范围为-90到90度，当前指向表示为y。

![alt text](./article/img/timg-xyz.jpg "Title")
![alt text](./article/img/timg-alpha.jpg "Title")
![alt text](./article/img/timg-beta.jpg "Title")
![alt text](./article/img/timg-gamma.jpg "Title")

### 获取罗盘校准

```js
window.addEventListener("compassneedscalibration", function (event) {
  showMessage('您的罗盘需要校准，请将设备沿数字8方向移动。');
  event.preventDefault();
}, true);
```

### 获取重力加速度

```js

```

### 重力加速度

### 摇一摇

## CSS 3D模型

### 球面投影

### 比较

### 效果

### 公式

### 效果11

美滋滋

### 淘宝造物节

## 集合Touch事件
