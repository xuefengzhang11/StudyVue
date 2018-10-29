<template>
  <div class="container study-carousel">
    <div class="row">
      <div class="col-md-12 text-center">
        <ul>
          <li ref="lun" v-for="i in 5" :class="lis[i]" @mouseover="enter(i)"
              @mouseout="slidRight" :key="i">
              <img :src="Global.IMG + imgs[i]" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Carousel',
  data () {
    return {
      msg: '轮播图',
      lis: ['', 'li1', 'li2', 'li3', 'li4', 'li5'],
      imgs: [
        '',
        '65316055-fcea-42aa-8d66-ff8aa70cf3d1.png',
        '99e1ba3f-1314-4784-837e-d2f53adb1cb8.png',
        '41780d19-16e6-41fe-9bde-1567a84963c4.jpg',
        '6b57a11a-599a-4992-9408-50901e52afbb.png',
        'bb685e9c-5939-4d27-9dc8-ac2457c5f0cc.png'
      ],
      timer: ''
    }
  },
  created () {
    // 进入界面，执行向左滑动,循环播放
    this.slidLeft()
  },
  methods: {
    // 向左滑动
    slidLeft: function () {
      window.clearInterval(this.timer)
      // 每过一秒钟，变换图片位置
      this.timer = window.setInterval(() => {
        // 将imgs第一个空元素删除
        this.imgs.shift()
        // 将删除第一个元素后的数组中的第一的元素删除，并且将其追加到末尾
        this.imgs.push(this.imgs.shift())
        // 最后在imgs的头部插入一个空元素
        this.imgs.unshift('')
      }, 1500)
    },
    // 向右滑动
    slidRight: function () {
      window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        // 将imgs第一个空元素删除
        this.imgs.shift()
        // 将最后一个元素移到第一个:将最后一个添加到第一个，删除最后一个
        this.imgs.unshift(this.imgs[4])
        this.imgs.pop()
        // 最后在imgs的头部插入一个空元素
        this.imgs.unshift('')
      }, 1500)
    },
    // 鼠标悬停，控制滑动
    enter: function (i) {
      window.clearInterval(this.timer)
      if (i < 3) {
        // 反方向滑动
        this.slidRight()
      } else if (i > 3) {
        this.slidLeft()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul,li {
    list-style: none;
  }
  .study-carousel{
    margin: 30px auto;
    height: 360px;
  }

  li{
    position: absolute;
    width: 800px;
    height: 360px;
    /*transition: all 0.8s ease-out;*/
    cursor: pointer;
    left: 50%;
    top: 50%;
    margin-left: -400px;
  }
  li img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 2px 2px 5px #3c3c3c;
  }
  .li1{
    transform: translate3d(-280px, 0, 0) scale(0.8);
    z-index: 1;
  }
  .li2{
    transform: translate3d(-140px, 0, 0) scale(0.9);
    z-index: 2;
  }
  .li3{
    transform: translate3d(0, 0, 0) scale(1);
    z-index: 3;

  }
  .li4{
      transform: translate3d(140px, 0, 0) scale(0.9);
      z-index: 2;
  }
  .li5{
    transform: translate3d(280px, 0, 0) scale(0.8);
    z-index: 1;
  }

</style>
