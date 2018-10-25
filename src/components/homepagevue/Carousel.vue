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
        '96e35f0f-2702-4721-944c-584748e13f2b.jpg',
        '7a2e9e3c-2b33-494d-a458-e86d0d15c6dd.jpg',
        'cb699b30-dcf6-4f5e-8bc2-0ae9b7fdd1b8.jpg',
        '38ea4103-d4e1-46ad-8627-11ea43c21dde.jpg',
        'aa84e7cf-a0a5-4e54-9397-42b9e2997a27.jpg'
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
    margin: 60px 0 30px 230px;
    /*position: absolute;*/
    height: 400px;
  }

  li{
    position: absolute;
    width: 800px;
    height: 360px;
    /*transition: all 0.8s ease-out;*/
    cursor: pointer;
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
