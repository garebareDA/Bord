<template>
  <div>
    <div class="center">
      <h1 class="pageTitle">Bord ._.</h1>
      <input v-model="message" placeholder="スレッド名">
          <span>
            <button v-on:click="post();">作成</button>
          </span>

        <div v-show="input" class="warning">100文字以内で入力してください</div>

      <div v-for="(item, index) in reversItem" v-bind:key="index">

        <router-link :to="'/' + item.id">
          <div class="url">{{item.title}}</div>
        </router-link>
      </div>

      <div>
        <button class="loadButton" v-on:click="count = count + 50; getPage();" v-show="count == showCount">もっと読み込む</button>
      </div>

    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {

    created: function() {
      this.getPage()
    },

  computed:{
    reversItem:function(){
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
        const message = this.message.length;
        if(message <= 100 && message > 0){
          firebase.database().ref("channel").push({title: this.message});
          this.message = "";
        }else{
          return
        };
      },
      getPage: function() {
        const _this = this;
        firebase.database().ref("channel").limitToLast(_this.count).on("value", function(snapshot){
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

    data () {
      return{
        message: "",
        channels: {},
        list: [],
        count: 50,
        showCount: Number,
      }
    }
  }
</script>
