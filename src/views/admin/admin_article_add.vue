<template lang="html">
  <div class="admin_article_add">
    <nav-bread>
      <span>文章增加</span>
    </nav-bread>
    <div class="form-group">
      <p>文章名称</p>
      <input type="text" v-model="articleName" placeholder='请输入文章名称'>
    </div>
    <div class="form-group">
      <p>文章分类</p>
        <select v-model='articleCategory'>
          <option v-for="item in categoryData" >{{ item.title }}</option>
        </select>
    </div>
    <div class="form-group">
      <p>文章内容</p>
      <!-- <textarea v-model="articleContent"></textarea> -->
      <div class="form-group-radio">
      <el-radio v-model="article_type" label="1">富文本编辑器</el-radio>
      <el-radio v-model="article_type" label="2">MarkDown编辑器</el-radio>
      </div>
    </div>
    <div>
    <div class="edit" v-show="article_type == '1'">
      <quill-editor class="articleContent" v-model="articleContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </div>
    <div id="edit-two" v-show="article_type == '2'">
        <mavon-editor style="height: 100%" v-model="markdownMessage"></mavon-editor>
      </div>
    </div>
    <button class="add-finish" type="button" @click='addArticle'>添加</button>
  </div>
</template>

<script>
import navBread from '../../components/navBread'
import showdown from 'showdown'
export default {

  data() {
    return {
      articleName: '',
      articleCategory: '',
      articleContent: '',
      categoryData: '',
      editorOption: {},
      article_type: '1',
      markdownMessage: ""
    }
  },
  components: {
    navBread
  },
  methods: {
    addArticle() {
      var converter = new showdown.Converter();

      var that = this;
      this.$http.post('/index/article_add', {
        title: this.articleName,
        category: this.articleCategory,
        author: "佚名",
        content: this.article_type == "1" ? this.articleContent : this.markdownMessage
      }).then((response) => {
        console.log(response.data);
        this.$message({
          message: '增加成功，1秒后跳转',
          type: 'success'
        });
        setTimeout(function () {
          that.$router.push({ path: '/admin_article' });
        }, 1000)
      })
    },
    onEditorBlur(editor) {
    },
    onEditorFocus(editor) {
    },
    onEditorReady(editor) {
    },
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
  },
  created() {
    this.$http.get('/admin/category').then((response) => {
      this.categoryData = response.data.data;
    })
  }
}
</script>

<style lang="less" scoped>
h1 {
  margin-left: 120px;
}
.add-finish {
  margin-left: 40px;
  margin-top: 120px;
}
.edit {
  margin: 0 40px;
}
.articleContent {
  height: 250px;
}
.form-group-radio {
  margin-top: 8px;
  margin-left: 20px;
}
.edit-two {
  display: flex;
  margin: 0 40px;
  .edit-two-input {
    width: 50%;
  }
  .edit-two-output {
    margin-left: 10px;
    width: 50%;
  }
}
</style>
