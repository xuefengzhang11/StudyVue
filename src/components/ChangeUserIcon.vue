<template>
  <!--遮罩层-->
  <div class="zzc">
    <div class="icon">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 title">更换头像</div>
          <div class="col-md-6 text-right cancel">
            <img src="../assets/icons/X.svg" @click="cancelChange" alt="">
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="userIcon">
              <img class="userIcon_img" :src="imgurl" alt="">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-5 text-right">
            <span class="change" @click="randomIcon">换一换</span>
          </div>
          <div class="col-md-5">
              <input id="file" type="file">
            <span class="up" @click="upIcon">
              上传图片
            </span>
          </div>
          <div class="col-md-1"></div>
        </div>
        <div class="row"  style="margin-top: 15px">
          <div class="col-md-3"></div>
          <div class="col-md-3 text-center">
            <button @click="filesubmitx">确定</button>
          </div>
          <div class="col-md-3 text-center">
              <button @click.prevent.stop="cancelChange">取消</button>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../../static/qiniu.min.js"></script>
<script>
import $ from 'jquery'
import {upload} from 'qiniu'
import axios from 'axios'

export default {
  name: 'ChangeUserIcon',
  data () {
    return {
      url: 'http://127.0.0.1:8000/',
      msg: '更换头像',
      usertel: '',
      imgurl: '',
      nowfile: {}
    }
  },
  created () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  mounted () {
    this.getUser()
  },
  methods: {
    // 通过用户电话号码获取用户信息
    getUser: function () {
      let vm = this
      axios.get(this.url + 'user/getUser/' + this.usertel + '/')
        .then(function (response) {
          vm.imgurl = 'http://pgu05jbff.bkt.clouddn.com/' + response.data.user[0].icon__iconurl
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 取消修改头像框
    cancelChange: function () {
      this.$emit('cancelclick')
    },
    // 用户随机更换头像
    randomIcon: function () {
      let vm = this
      axios.get(this.url + 'user/randomIcon/')
        .then(function (response) {
          vm.imgurl = 'http://pgu05jbff.bkt.clouddn.com/' + response.data.userIcon
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 展示图片
    preview: function (f) {
      let img = new Image()
      img.src = URL.createObjectURL(f)
      let url = img.src
      let $img = $(img)
      img.onload = function () {
        URL.revokeObjectURL(url)
        $img.css('width', '100%').css('height', '100%').css('object-fit', 'cover').css('border-radius', '50%')
        $('.userIcon').empty().append($img)
      }
    },
    // 打开上传文件
    upIcon: function () {
      let ipt = document.querySelector('#file')
      let ie = false
      if (navigator.appName === 'Microsoft Internet Explorer') {
        ie = true
      }
      if (ie) {
        ipt.click()
      } else {
        let a = document.createEvent('MouseEvents')
        a.initEvent('click', true, true)
        ipt.dispatchEvent(a)
        let that = this
        ipt.onchange = function (e) {
          // 将图片存到data当中的file对象中
          that.file = e.target.files[0]
          // 展示图片
          that.preview(that.file)
        }
      }
    },
    // 上传到服务器
    filesubmit: function () {
      // 需要上传的图片
      let file = this.file
      if (file) {
        // 上传头像点击确定时执行
        let that = this
        $.ajax({
          url: that.url + 'user/qiniutoken/?key=' + file.name,
          success: function (res) {
            let token = res.token
            let newname = res.filename
            let newfile = new File([file], newname)
            // 使得ESLint不检查以下代码
            /* eslint-disable */
            let observable
            let config = {
              useCdnDomain: false,
              disableStatisticsReport: true,
              retryCount: 6,
              region: region.z0
            }
            let putExtra = {
              fname: '',
              params: {},
              mimeType: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
            }

            let key = newfile.name
            // 添加上传dom面板
            putExtra.params['x:name'] = key.split('.')[0]
            let subscription
            // 调用sdk上传接口获得相应的observable，控制上传和暂停
            observable = upload(file, key, token, putExtra)
            subscription = observable.subscribe({
              next( res ) {
              },
              error(err){
                alert('error！')
              },
              complete (res) {
                // res.key 是文件名称，发送ajax将文件名称保存到数据库中
                axios.get(that.url + 'user/upIcon/' + res.key + '/' + that.usertel + '/')
                  .then(function (response) {
                    let res = response.data.res
                    if (res === '修改成功') {
                      that.$emit('sureclick')
                    } else {
                      alert(res)
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              }
            });
          }
        })
      } else {
        // 随机头像是更换点击执行
        let imgurl =  this.imgurl.split('/')[3]
        let that = this
        axios.get(that.url + 'user/upIcon/' + imgurl + '/' + that.usertel + '/')
          .then(function (response) {
            let res = response.data.res
            if (res === '修改成功') {
              that.$emit('sureclick')
            } else {
              alert(res)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*遮罩层*/
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
  }
  .icon{
    width:400px;
    background: white;
    border-radius: 20px;
    margin: 100px auto 0;
    padding: 30px 20px;
  }
  /*更换头像标题*/
  .title {
    font-size: 1.5em;
    font-weight: 700;
  }
  /*用户头像*/
  .userIcon {
    margin: 20px auto 20px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
  .userIcon_img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  span{
    font-size: 1.2em;
  }
  button{
    outline: none;
    border: none;
    width: 60px;
    height: 40px;
    border-radius: 20px;
  }
  button:hover{
    border: 1px gray solid;
  }
  .cancel img:hover, .change:hover, .up:hover{
    cursor: pointer;
    font-weight: 600;
  }
  #file{
    opacity: 0;
  }
  .up{
    position: absolute;
    top: 0;
  }

</style>
