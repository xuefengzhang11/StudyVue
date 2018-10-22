<template>
  <div class="zzc">
    <div class="container-fluid">
      <div class="tab-content bg-update">
        <form action="">
          <div class="row edit-text">
            <div class="col-md-1"></div>
            <div class="col-md-9">编辑个人信息</div>
            <div class="col-md-2" @click="userupdate">
              <img src="../../assets/icons/X.svg">
            </div>
          </div>
          <div class="information-name">
            <span class="information-text">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
            <input type="text" class="btn_tel" v-model="uname">
          </div>
          <div class="information-name">
            <span class="information-text">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
            <label class="information-sex"><input type="radio" hidefocus="true" value="3" checked="checked" name="sex" v-model="ugender">&nbsp;&nbsp;保密</label>
            <label class="information-sex"><input type="radio" hidefocus="true" value="1" checked="checked" name="sex" v-model="ugender">&nbsp;&nbsp;男</label>
            <label class="information-sex"><input type="radio" hidefocus="true" value="2" checked="checked" name="sex" v-model="ugender">&nbsp;&nbsp;女</label>
          </div>
          <div class="information-name">
            <span class="information-text">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</span>
            <input type="text" class="btn_tel" v-model="ubirthday">
          </div>
          <div class="information-name">
            <span class="information-text">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span>
            <!--<select v-model="ugender" class="information-dropdown" >-->
              <!--<option v-for="j in job" :key="j.id" class="information-menu">{{j.name}}</option>-->
            <!--</select>-->
            <input :id="ujob_id" type="text" list="sexlist" class="information-dropdown" v-model="ujob">
            <datalist id="sexlist">
              <option v-for="j in job" :id="j.id" :key="j.id" :value="j.name" class="information-menu">{{j.name}}</option>
            </datalist>
          </div>
          <div class="information-name">
            <span class="information-text">城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：</span>
            <input type="text" class="btn_tel" v-model="ucity">
          </div>
          <div class="information-name">
            <span class="information-signature">个性签名：</span>
            <textarea class="signature" v-model="uintroduce"></textarea>
            <p class="signature-text">还可以输入<span class="word">128</span>个字符</p>
          </div>
          <div class="container-fluid bg-input">
            <div class="row">
              <div class="col-md-6 bg-confirm">
                <input type="button" value="确认" class="confirm" @click="updateUser">
              </div>
              <div class="col-md-6">
                <input type="button" value="取消" class="cancel" @click="userupdate">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  uname: 'UpdateUserInfo',
  data () {
    return {
      msg: '修改个人信息',
      url: 'http://localhost:8000/',
      user: {},
      uname: '',
      ugender: '',
      ucity: '',
      ubirthday: '',
      uintroduce: '',
      ujob: '',
      ujob_id: '',
      job: []
    }
  },
  created () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  mounted: function () {
    this.getDate()
    this.getjob()
  },
  watch: {
    // ujob: function () {
    //   this.ujob_id =
    // }
  },
  methods: {
    // 关闭模态框
    userupdate: function () {
      this.$emit('updateuserclick')
    },
    // 得到用户信息
    getDate: function () {
      let vm = this
      axios.get(this.url + 'user/getUser/' + this.usertel + '/')
        .then(function (response) {
          vm.user = response.data.user[0]
          vm.uname = vm.user['name']
          vm.ucity = vm.user['city']
          vm.ubirthday = vm.user['birthday']
          vm.uintroduce = vm.user['introduce']
          vm.ugender = vm.user['gender_id']
          vm.ujob = vm.user['job__name']
          vm.ujob_id = vm.user['job_id']
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 得到工作的信息
    getjob: function () {
      let vm = this
      axios.get(this.url + 'user/getjob/')
        .then(function (response) {
          vm.job = response.data.job
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 修改用户信息
    updateUser: function () {
      let user = {
        'usertel': this.usertel,
        'name': this.uname,
        'city': this.ucity,
        'birthday': this.ubirthday,
        'introduce': this.uintroduce,
        'gender': this.ugender,
        'job': this.ujob
      }
      let vm = this
      $.ajax({
        url: this.url + 'user/update/',
        type: 'POST',
        data: JSON.stringify(user),
        success: function (response, textStatus, request) {
          let res = response.res
          if (res === '修改成功') {
            vm.closeMyself()
            vm.$emit('updateclick')
          }
        }
      })
    },
    closeMyself: function () {
      this.status = ''
      this.$emit('on-close')
    }
  }
}
</script>

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
  .bg-update {
    background: white;
  }
  .tab-content {
    width: 490px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 20%);
    border-radius: 20px;
    border: solid 1px black;

  }

  .edit-text {
    margin-top: 20px;
    font-size: 1.4em;
    font-weight: bold;

  }

  .information-name {
    margin-top: 20px;
    text-align: right;
    margin-right: 60px;
  }

  .information-text {
    font-size: 1.3em;
    margin-right: 30px;
  }

  .btn_tel {
    width: 250px;
    height: 40px;
    outline: none;
    border: solid 1px black;
    padding-left: 10px;
    border-radius: 3px;
  }

  .information-dropdown {
    width: 250px;
    height: 40px;
    background: white;
    border: solid 1px black;
    padding-left: 10px;
  }

  .information-menu {
    width: 240px;
    margin-top: 13px;
    border-right: solid 1px black;

  }

  .information-sex {
    margin-left: 37px;
    font-size: 1.2em;
  }

  .information-signature {
    font-size: 1.3em;
    vertical-align: top;
    margin-right: 30px;
  }

  .signature-text {
    font-size: 0.9em;
  }

  .signature {
    width: 250px;
    height: 80px;
    outline: none;
    border: solid 1px black;
    padding-left: 10px;
    border-radius: 3px;
    padding-top: 10px;
  }
  .bg-input {
    margin-bottom: 20px;
  }
  .bg-confirm {
    text-align: right;
  }
  .confirm {
    width: 60px;
    height: 35px;
    border-radius: 40px;
    text-align: center;
    line-height: 35px;
    background: #126693;
    color: white;
    opacity: 0.8;
    outline: none;
    border: none;
  }

  .cancel {
    width: 60px;
    height: 35px;
    border-radius: 40px;
    border: solid 1px black;
    text-align: center;
    line-height: 35px;
    outline: none;
    background: white;
  }

  .confirm:hover {
    opacity: 1;

  }

</style>
