<template>
  <div>

    <div class="center">
      <router-link :to="'/'">
      <button class="backButton">戻る</button>
      </router-link>
      <h1 class="url">{{title}}</h1>

        <input v-model="message" placeholder="edit me">

        <span>
          <button v-on:click="post()">投稿</button>
        </span>

        <div v-show="input" class="warning">100文字以内で入力してください</div>

        <div v-for="(item, index) in reversItem" v-bind:key="index">
          <p class="url">{{item.text}}</p>
        </div>

        <div>
          <button class="loadButton" v-on:click="count = count + 50; getPage();" v-show="count == showCount">もっと読み込む</button>
        </div>

    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  created: function() {

    const _this = this;
    const params = this.$route.params.page

    const db = firebase.database();
    db.ref(`channel/${params}`)
      .once("value")
      .then(snapshot => {
        _this.title = snapshot.val().title;
      });

    this.getPage();
  },
    computed:{
    reversItem:function() {
      return this.list.slice().reverse();
    },

    input:function() {
      let messageIs;
      const message = this.message.length;

      if(message <= 100) {
        messageIs = false;
      }else{
        messageIs = true;
      }

      return messageIs;
    }
  },
  methods: {
    post: function() {
      const message = this.message.length
      if(message <= 100 && message > 0) {
        firebase
        .database()
        .ref(this.$route.params.page)
        .push({ text: this.message });
        this.message = "";
      }else{
        return;
      }
    },
    getPage: function() {
      const db = firebase.database();
      const params = this.$route.params.page;
      const _this = this
      db.ref(params).limitToLast(_this.count).on("value", function(snapshot) {
        let list = [];

        const rootList = snapshot.val();

        Object.keys(rootList).forEach((val, key) => {
          rootList[val].id = val;
          list.push(rootList[val]);
        });

        _this.showCount = Object.keys(rootList).length;
        _this.list = list;

      });
    }
  },

  data() {
    return {
      message: "",
      channels: {},
      list: [],
      title: "",
      count: 50,
      showCount: Number
    };
  }
};
</script>