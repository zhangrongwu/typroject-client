<template lang="html">
  <div class="index">
    <!-- 头部 -->
    <nav-header></nav-header>
    <!-- 内容 -->
    <section class="main container">
      <!-- 左边 -->
      <div class="left">
        <!-- 把登录后的数据传给组件 -->
        <router-view :userCookie="userCookie"></router-view>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div v-show="!userCookie">
          <!-- 登录 -->
          <div class="right-item login" v-show="Login">
            <h1>登录</h1>
            <div class="warnInfo">
              {{loginWarnInfo}}
            </div>
            <div class="input-box">
              <p>用户名:</p>
              <input type="text" v-model="userName">
            </div>
            <div class="input-box">
              <p>密码:</p>
              <input type="password" v-model="password">
            </div>
            <button type="button" @click="login">登录</button>
            <p>还没有账号，<span class="goLogin" @click="toggleRegisterLogin">去注册</span></p>
          </div>
          <!-- 注册 -->
          <div class="right-item register" v-show="Register">
            <h1>注册</h1>
            <div class="warnInfo">
              {{registerWarnInfo}}
            </div>
            <div class="input-box">
              <p>用户名:</p>
              <input type="text" v-model="userName">
            </div>
            <div class="input-box">
              <p>密码:</p>
              <input type="password" v-model="password">
            </div>
            <div class="input-box">
              <p>确认密码:</p>
              <input type="password" v-model="password2">
            </div>
            <button type="button" @click="register">注册</button>
            <p>已有账号，<span class="goLogin" @click="toggleRegisterLogin">去登录</span></p>
          </div>
        </div>

        <!-- 登录后信息状态 -->
        <div class="right-item logined" v-show="userCookie">
          <!-- <div v-show="Logined"> -->
            <h1>你好，{{userCookie.userName}}</h1>
            <p v-if="userCookie.isAdmin === true">
              你是管理员,可以进入 <router-link to="/admin"><span class="goAdmin">后台管理</span></router-link>
            </p>
            <p v-else>欢迎来到我的博客</p>
            <p class="goAdmin" @click="logout">退出</p>
          <!-- </div> -->
        </div>

      </div>
    </section>
    <!-- 底部 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import navHeader from '../../components/navHeader'
import navFooter from '../../components/navFooter'
export default {
  data() {
    return {
      Login: true,
      Register: false,
      userCookie: '',
      userName: '',
      password: '',
      password2: '',
      loginWarnInfo: '',
      registerWarnInfo: ''
    }
  },
  components: {
    navHeader,
    navFooter
  },
  created() {
    if (this.$route.query.code != null) {
      this.githubLogin(this.$route.query.code);
    }
    this.userCookie = this.getCookie("userInfo");

    console.log("userCookie", this.userCookie)
  },
  methods: {
    // 登陆注册显示隐藏
    toggleRegisterLogin() {
      this.Login = !this.Login;
      this.Register = !this.Register;
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
      else
        return null;
    },
    githubLogin(code) {

      this.$http.post('/users/github', {
        code: code,
      }).then((res => {
        console.log("--------", res)
        if (res.data.status == 1) {
          this.userCookie = res.data.userInfo;
          return;
        } else {
          alert(res.message)
        }
      }))
    },
    // 登陆
    login() {
      if (this.userName == '') {
        if (this.loginWarnInfo = '用户名不能为空');
        return;
      }
      if (this.password == '') {
        if (this.loginWarnInfo = '密码不能为空');
        return;
      }
      this.$http.post('/users/login', {
        userName: this.userName,
        password: this.password
      }).then((res => {
        console.log("res--- ", res)
        if (res.data.status != 1) {
          console.log(res.data);
          this.loginWarnInfo = res.data.message;
          console.log(res.data);
          return;
        } else {
          console.log(res.data);
          this.userCookie = res.data.userInfo;
        }
      }))
    },
    // 注册
    register() {
      if (this.userName == '') {
        this.registerWarnInfo = '用户名不能为空';
        return;
      }
      if (this.password == '') {
        this.registerWarnInfo = '密码不能为空';
        return;
      }
      if (this.password !== this.password2) {
        this.registerWarnInfo = '两次密码不一样';
        return;
      }
      this.$http.post('/users/register', {
        userName: this.userName,
        password: this.password,
        password2: this.password2
      }).then((res => {
        debugger
        if (res.data.status == 0) {
          this.registerWarnInfo = res.data.message;
          return;
        } else {
          this.userCookie = res.data.userInfo;
          // this.registerWarnInfo = '注册成功，请登录';
        }
      }))
    },
    // 退出
    logout() {
      this.$http.get('/users/logout').then((respond) => {
        if (respond.data.status == 1) {
          this.userCookie = !this.userCookie;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .main {
    display: flex;
    margin-top: 50px;
    .left {
      flex: 1;
    }
    .right {
      flex: 0 0 300px;
      width: 300px;
      margin-left: 50px;
      margin-bottom: 150px;
      text-align: left;
      .right-item {
        padding: 20px;
        border-radius: 5px;
        background-color: #fff;
        transition: 0.5s;
        &:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
        }
        &.logined {
          p {
            margin-top: 20px;
            cursor: pointer;
          }
          .goAdmin {
            color: #e96900;
          }
        }
        h1 {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #3498fe;
        }
        .warnInfo {
          margin: 20px 0;
          color: #e96900;
        }
        .input-box {
          p {
            height: 35px;
            line-height: 35px;
          }
          input {
            height: 35px;
            width: 250px;
            margin: 10px 0;
            padding-left: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;
            &:focus {
              border: 1px solid #00aaee;
            }
          }
        }
        button {
          display: inline-block;
          height: 35px;
          line-height: 35px;
          width: 260px;
          margin: 20px auto;
          border: 1px solid #ccc;
          border-radius: 5px;
          text-align: center;
          background-color: #3498fe;
          color: #fff;
          outline: none;
        }
        p {
          cursor: pointer;
          .goLogin {
            color: #e96900;
          }
        }
      }
    }
  }
}
</style>
