<template>
  <div class="home">
    <div class="route-right">
      <transition enter-active-class="animated bounceInDown">
        <section class="add-tag">
          <div class="li" v-for="(li,i) of lot" :key="i">
            <span>{{li.name}}</span>
            <div class="tag">
              <div v-for="(item,j) of li.list"
                   :key="j"
                   :class="{active: item.name===tagTitle}"
                   @click="entry(item.name, li.len)">{{item.name}}
              </div>
            </div>
          </div>

          <div class="tag-title">{{tagTitle}}</div>

          <div class="input">
            <span>开奖期号</span>
            <input type="text" v-model="issue" />
          </div>

          <div class="input">
            <span>开奖时间</span>
            <input type="datetime-local" v-model="nowTime" />
          </div>

          <div class="input">
            <span>开奖号码</span>
            <input
              type="text"
              maxlength="2"
              v-for="(n,k) in len"
              :key="k"
              v-model="ball[n-1]">
          </div>
          <div class="btn" @click="add">添加</div>
        </section>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'HelloWorld',
    data(){
      return {
        tagTitle: '黑龙江11选5',    //默认彩种
        len: 5,                    //默认长度
        nowTime: '',
        issue: null,
        ball: [],
        lot: [
          {
            name: '11选5',
            len: 5,
            list: [
              {name: '黑龙江11选5'},
              {name: '吉林11选5'},
              {name: '辽宁11选5'},
              {name: '广东11选5'},
              {name: '山东11选5'},
              {name: '江西11选5'},
              {name: '河北11选5'},
              {name: '天津11选5'},
              {name: '北京11选5'},
              {name: '四川11选5'},
              {name: '陕西11选5'},
              {name: '河南11选5'},
              {name: '青海11选5'},
            ]
          },
          {
            name: '快乐十分',
            len: 8,
            list: [
              {name: '黑龙江快乐十分'},
              {name: '广东快乐十分'},
              {name: '重庆快乐十分'},
              {name: '天津快乐十分'},
              {name: '陕西快乐十分'},
              {name: '云南快乐十分'},
              {name: '广西快乐十分'},
            ]
          },
          {
            name: '快三',
            len: 3,
            list: [
              {name: '吉林快3'},
              {name: '江苏快3'},
              {name: '河北快3'},
              {name: '内蒙快3'},
              {name: '安徽快3'},
              {name: '北京快3'},
              {name: '河南快3'},
              {name: '宁夏快3'},
            ]
          }
        ],
        tagInput: '',
      }
    },
    methods: {
      entry(name: string, len: number): void {
        this.tagTitle = name;
        this.len = len;
      },
      getNow(){
        const formatNumber: any = (n: string)=> {
          n = n.toString();
          return n[1] ? n : '0' + n
        };
        var date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        this.nowTime = [year, month, day].map(formatNumber).join('-') + 'T' + [hour, minute, second].map(formatNumber).join(':');
      },
      add(){
        var bool = this.ball.some(function(val){
          return isNaN(val);
        });
        if(!this.issue || this.ball.length !== this.len || bool){
          this.$message({
            message: '请输入正确的期号及开奖号码',
            type: 'warning',
            duration: 1500,
          });
        }else{
          this.$message({
            message: '开奖号码录入成功',
            type: 'success',
            duration: 1500,
          });
          this.issue = null;
          this.ball = [];
          this.getNow();
        }
      },
    },
    mounted: function(){
      this.$nextTick(function(){
        this.getNow();
      })
    }
  });
</script>
<style scoped>
  .li{
    margin-bottom: 10px;
    font-size: 15px;
  }

  .add-tag .tag{
    margin-top: 5px;
    padding-left: 20px;
  }

  .add-tag .tag div{
    width: auto;
    margin: 0 7px 7px 0;
    padding: 5px;
    border-radius: 3px;
    background-color: #EBEBEB;
    font-size: 0.9em;
    color: #333;
    border: 1px solid #DDD;
    box-shadow: 0 0 2px 0 #CCC;
  }
  .add-tag .tag div:active{
    border: 1px solid #2D8EDD;
  }
  .add-tag .input{
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .add-tag .input>span{
    width: 100px;
    flex-shrink: 0;
  }
  .add-tag .input input{
    width: 200px;
    height: inherit;
    font-size: 14px;
    margin-right: 10px;
  }
  .add-tag .input input:focus{
    outline: 1px solid #4DB3FF;
  }
  .add-tag .input+.input+.input input{
    width: 100px;
    flex-shrink: 1;
  }
  .btn {
    background-image: url('data:image/gif;base64,R0lGODlhUAAcAPcAAP///7Le+6/U8Syk9Sij9Cmj9Sai9COh9COh8yOg8yGg9COg9CCe8R+e8iCe8iCd8SCd8h+e8R+d8h+d8Ryb7xyb8Byb7hya8Bya7xya7hua7xua7hua8Bub8Bub7xub7hyZ8ByZ7xyZ7huZ8RuZ8Bqa7xmX7hmX7RiX7BiX7RiX7xiX7hmW7RiW7hiW7RmW7BeV6gyX8xaV6haV6xWU6hWU6xeU6haU6xaU6hWV6heU6xeT6xeT6gqW8xaT6haT6wqV8hKR6BOR6BOR6RKR6ROR5wmT8QmT8BKQ6RKQ6BGQ6RGQ6BOQ5xOQ6BOQ6QmR7wiQ7QiQ7AiN6g6M5Q+M5Q6M5A+M5A+L5R+H1yCH1waN6Q6L5R2G1gaL6AuJ4guJ4wyI4gyJ4gaK5wqJ4guI4wuI4hqE1gqI4gaI5BiD1QqH4heC1QWH4xaC1QiF3wiE3wiE3gWF4QaF3gaF3weF3gSF4QaD3waE3gaE3weE3weE3geD3weD3gaD4AiD3giD3waE4BSB1QaD3gSD3wOD3gSD3gOC3xF/1ASB3QOB3QOB2w9+1AKB2wKB3QOA3QKB3AOA3AOB3ASB3ASB2wSA3AJ/3AR/3QR/3AJ/2wN/2QN/2wKA2wKA3AKA3QN/3AN/3QR/2wJ+2gZ91wV+1gV+1wx80wZ+1gJ/2QJ/2gF+2gR+1wN+2gN+2QJ+2QF/2gJ+2AN92QJ92AN92gd81QR91QR91gR91wR92Qd81AF+2Qh71Qh81Al70wV91QF92QV91gV91wN92AJ92gJ92QN81gJ81gd71Ad71Qh71AN81wJ71gJ40wF41AJ30QB20QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAABQABwAAAj/AAEEINCjoMGDCBMqXMiwocOFBAIIfEixosWLCwfGODCgo8ePIEOKHEmypMmRB2IQVFCgpcuXMGPKnEmzps2aCgoa2Mmzp8+fQIMKHUq0aEEESJEmWMq0qdOnUKNKnUoVKhAgEbJqzSqh64SvYMOC3Uq2bFaxaNOqXfv1yJEMcOPKnUu3rt27ePPqhQKlhV8XgAMHRkG4sOHDh1MoXsy4sePHiwUDhpwCipYaODJr3ozDhufPoEN/vkG6tOnTpDXXWM26tevXsKVICUK7tu3buHPr3s3bdpLfSIILH04ciRgxVJIrX858+ZTn0JlfmU4duvXr2Jsnxx69OZvvZcKL/x9Pvrx582fSjyfDvr379/Dbnxdfp34dOPjz64fzpr///wAGKOCABBZo4CMIPpLIggw2+MmDEEYo4YQUVmjhhRhm+KAwHLbi4YcghujhMCSWaOKJKJYo4oostvjLizACI+OMNNZo44215KhjLTf2COOPv/TIjDFEFrnLkUgmqWSSuDTp5JNQNjnLlEVWaeWVWBKJzJZFLrMML2CGKeaYZJZp5plopqmmM86U4uabcMYp55x01mnnnXiyuciefPbp55+ABirooIQWyuYhiCaq6KKMNuroo5BGKimbgVRq6aWYZqrpppx26umnbK4h6qiklmrqqaimquqqrLJpxquwxkwq66y01mrrrbjm6gwWbXDh66/ABivssMQWa+yxxraBhQDNpJHFs9BGK+201FZr7bXYVptGMwIAIAAWbIYr7rjklmvuueime+6yAAQEADs=');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 20px;
    margin-left: 40%;
    padding: 0;
    color: #FFF;
    border: none;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
  }
  .add-tag .tag-title{
    color: #111;
    font-size: 16px;
    font-weight: 600;
  }
  .home .route-right{
    top: 0;
    left: 0;
  }
  .add-tag .tag div{
    cursor: pointer;
  }
  .add-tag .tag .active{
    background-color: #F70000;
    border: 1px solid red;
    color: #FFF;
  }
</style>
