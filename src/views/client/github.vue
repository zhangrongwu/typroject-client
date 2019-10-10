<template>
  <div>

    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as
    sdfjs;dfj;sadjf;sdajf;lasjdfkl;as

  </div>
</template>

<script>
export default {
  beforeCreate() {

  },
  created() {
    this.githubLogin();
  },
  methods: {
    githubLogin() {
      debugger
      console.log("---", this.$route.query.code)
      this.$http.post('/users/github', {
        code: this.$route.query.code,
      }).then((res => {
        if (res.data.code == 1) {
          this.userCookie = res.data.userInfo;
          return;
        }
      }))
    }
  },
}
</script>

<style lang="less">
</style>
