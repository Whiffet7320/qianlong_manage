<template>
  <div class="websocket">
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div id="dplayer1"></div>
    </el-dialog>
    <div class="webSocketWrapper">
      <div class="wxchatBorderLeft">
        <el-row>
          <div style="padding: 10px">
            <div style="display: inline-block">
              <el-input
                class="searchInp"
                placeholder="搜索"
                prefix-icon="el-icon-search"
                v-model="input2"
                size="mini"
              ></el-input>
            </div>
          </div>
        </el-row>

        <el-row class="userList">
          <div
            v-for="(ele, index) in searchListArr"
            :key="index"
            @click="userClick(ele, index)"
            class="user"
          >
            <el-col :span="24" ref="userActive" :class="{'active':ele.isActive}" v-if="ele.user">
              <div style="display: inline-block; padding: 12px">
                <!--  -->
                <el-badge :is-dot="ele.isDot == true">
                  <el-avatar shape="square" :src="ele.user.avatar"></el-avatar>
                </el-badge>
              </div>

              <div style="display: inline-block" class="leftUser_input">
                <el-col>
                  <div class="wxchatPeople">{{ ele.user.nick_name }}</div>
                </el-col>

                <el-col>
                  <div class="wxchatNews">{{ ele.content }}</div>
                </el-col>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>

      <div class="leftContent" v-loading="loading">
        <div class="wxchatBorderRightTop">
          <div style="float: right; padding: 5px" class="close">
            <i class="el-icon-close" style="font-size: 10px"></i>
          </div>

          <div class="wxchatName">{{ contentChat.nick_name }}</div>

          <!-- <div class="wxchatMore">
            <i class="el-icon-more"></i>
          </div>-->
        </div>

        <div
          class="wxchatBorderRightMid"
          @scroll.passive="getScroll($event)"
          ref="wxchatBorderRightMid"
        >
          <div v-if="myLoading" class="myLoading">{{myLoadingText}}</div>
          <div ref="myitems" v-for="(ele, index) in historyMassage" :key="index">
            <!-- 右侧 -->
            <div style="margin-left: 30px; margin-top: 15px" v-if="ele.user_id == userId">
              <div align="center" style="padding: 15px 0">
                <el-tag type="info" size="mini">{{ ele.myadd_time }}</el-tag>
              </div>

              <el-row>
                <el-col :span="21">
                  <div class="chatPop2">
                    <span class="popspan" style="line-height: 23px">
                      <viewer>
                        <img :src="ele.content" class="img_cyy" v-if="ele.type == 1" />
                        <div class="dplayer" v-else-if="ele.type == 3"></div>
                        <p v-else>{{ ele.content }}</p>
                      </viewer>
                    </span>
                  </div>
                </el-col>

                <el-col :span="2">
                  <el-avatar
                    shape="square"
                    src="https://img1.baidu.com/it/u=3143063822,1542135707&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500"
                    style="width: 35px; height: 35px"
                  ></el-avatar>
                </el-col>
              </el-row>
            </div>
            <!-- 左侧 -->
            <div style="margin-left: 30px; margin-top: 15px" v-else>
              <div align="center" style="padding: 15px 0">
                <el-tag type="info" size="mini">{{ ele.myadd_time }}</el-tag>
              </div>

              <el-row>
                <el-col :span="2">
                  <el-avatar shape="square" :src="toUserAvatar" style="width: 35px; height: 35px"></el-avatar>
                </el-col>

                <el-col :span="12">
                  <div class="chatPop1">
                    <span class="popspan" style="line-height: 23px">
                      <viewer>
                        <img :src="ele.content" class="img_cyy" v-if="ele.type == 1" />
                        <p v-else-if="ele.type == 11">
                          <img :src="ele.content.goods_image" class="img_cyy" />
                          <span class="spanRed popspan">¥{{ ele.content.shop_price }}</span>
                          <span class="type11Span popspan">
                            {{
                            ele.content.goods_name
                            }}
                          </span>
                        </p>
                        <div class="posRelative" v-else-if="ele.type == 3" @click="dialogV(ele)">
                          <div class="dplayer"></div>
                          <i class="el-icon-video-play"></i>
                        </div>
                        <p v-else>{{ ele.content }}</p>
                      </viewer>
                      <!--  -->
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div class="wxchatBorderRightBottom">
          <div class="wxchatIcon1">
            <el-popover placement="top" width="268" v-model="visible">
              <p>请选择上传方式：</p>
              <div style="text-align: left; margin-top: 10px">
                <el-button size="mini" type="primary" @click="company">本地上传</el-button>
                <el-button type="primary" size="mini" @click="popInps">输入网络资源地址</el-button>
                <el-input
                  size="small"
                  style="margin-top: 10px; width: 200px"
                  v-model="oppinput"
                  placeholder="请输入资源地址"
                  v-if="popInp"
                ></el-input>
                <el-button
                  style="margin-top: 12px; float: right"
                  size="mini"
                  type="test"
                  @click="Inpcompany"
                  v-if="popInp"
                >上传</el-button>
              </div>
              <i class="el-icon-picture" slot="reference" @click="popInps2"></i>
            </el-popover>
            <!-- <i class="el-icon-picture" @click="company"></i> -->
            <input
              type="file"
              name="companyLogo"
              id="file0"
              class="displayN"
              multiple="multiple"
              @change="companyLogo($event)"
              ref="fileInput"
            />
            <el-button type="primary" class="displayN" @click="uploading(true)">保存</el-button>
          </div>

          <div style="margin: -2px 15px">
            <el-input
              ref="sayInput"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              placeholder
              v-model="inputValue"
              resize="none"
              autofocus
              maxlength="500"
              @keyup.enter.native="sendBtn"
            ></el-input>
          </div>

          <div class="sendButton" @click="sendBtn">
            <el-button size="mini">发送 (Enter)</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      myLoadingText: "正在加载中...",
      myLoading: false,
      loading: false,
      mysrcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ],
      srcList: [], //放大后的图片数组
      inputValueImg: "", //上传链接地址的input
      oppinput: "",
      popInp: false,
      visible: false,
      imgFile: "",
      oss_imgurl: "",
      myCYYfile: null,
      fileList: [],
      ws: null,
      count: 0,
      userId: null, //当前用户ID
      list: [], //聊天记录的数组
      contentText: "", //input输入的值
      input2: "",
      squareUrl: "",
      textarea2: "",
      leftUserList: [], //左侧用户
      searchListArr: [], //根据搜索筛选后的左侧用户
      contentChat: {}, //右侧主聊天框
      historyMassage: null, //历史聊天记录
      inputValue: "",
      leftRight: [], //根据send_id渲染我和客户的对话框
      isDot: false, //未读消息小红点
      isDotList: [], //小红点列表
      webFlag: false,
      dplayerList: [],
      dialogVisible: false,
      dp: null,
      //
      roomId: "",
      toUserAvatar: "", //对方的头像
      socket: null,
      toUserId: "", //对方的id
      clickIndex: "",
      clickUser_id: "",
      itemHeight: 0,
      scrollflag: true
    };
  },
  computed: {
    ...mapState(["client_id", "isDotNum", "havaMessage"])
  },
  created() {
    this.initWebSocket();
    this.userId = sessionStorage.getItem("userId");
    this.getLeftUserList();
    this.socket.on("connect", () => {
      this.socket.emit("bind", [1]);
    });
    this.isDotList = this.isDotNum;
  },
  mounted() {
    // console.log(document.getElementById("dplayer1"));
    // console.log(document.getElementsByClassName('el-dialog__close')[0])
    // let closeBtn = document.getElementsByClassName('el-dialog__close')[0]
    // closeBtn.onclick = function(){
    //   console.log(1777)
    // }
  },
  watch: {
    dialogVisible: function() {
      if (this.dialogVisible == false) {
        this.dp.pause();
      }
    },
    "$store.state.isDotNum": function() {
      this.isDotList = this.$store.state.isDotNum;
      if (this.roomId != "") {
        this.userHistory();
      }
      if (this.havaMessage) {
        this.$store.commit("havaMessage", false);
        setTimeout(() => {
          this.getLeftUserList();
          console.log("watch");
        }, 500);
      }
      console.log(this.isDotList.length);
      if (this.isDotList.length == 0) {
        this.$store.commit("overallIsDot", false);
        console.log("已空");
      }
      console.log(this.isDotList);
    },
    input2: function() {
      this.searchListArr = this.leftUserList.filter(ele => {
        return ele.nick_name.indexOf(this.input2) != -1;
      });
    }
  },
  methods: {
    Inpcompany() {
      console.log(this.oppinput);
      this.sendBtn();
    },
    popInps2() {
      this.popInp = false;
    },
    popInps() {
      this.popInp = !this.popInp;
    },
    companyLogo(event) {
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      if (fileSize <= 10240 * 1024) {
        console.log(filetType);
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = file;
          this.uploading(true);
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        const res = await this.$api.uploadToken();
        let myData = res.data;
        console.log(myData);
        let client = new window.OSS.Wrapper({
          // secure:true,
          region: myData.region, //oss地址
          accessKeyId: myData.accessKeyId, //ak
          accessKeySecret: myData.accessKeySecret, //secret
          stsToken: myData.stsToken,
          bucket: myData.bucket //oss名字
        });
        var imgtype = this.imgFile.type.substr(6, 4);
        var store = `${new Date().getTime()}.${imgtype}`;
        client.put(store, file_re).then(() => {
          //这个结果就是url
          console.log(store);
          // var oss_imgurl = client.signatureUrl(store);
          this.oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
          console.log(this.oss_imgurl);
          if (this.oss_imgurl == "") {
            this.$message({
              message: "不能发送空白信息",
              type: "warning"
            });
          } else {
            if (this.oss_imgurl != "") {
              this.socket.emit("msgToUser", [
                1,
                this.oss_imgurl,
                this.toUserId
              ]);
              this.getLeftUserList();
              this.userHistory();
            }
          }
        });
      }
    },
    // oss
    company() {
      this.$refs.fileInput.click();
      this.visible = false;
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = function() {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    initWebSocket() {
      this.socket = this.$io("http://dev.cars.hxqhhhh.shop:1215", {
        transports: ["websocket"]
      });
      this.socket.on("message", data => {
        console.log(data);
      });

      // this.socket.on("chatMessage", data => {
      //   console.log("chatMessage", data);
      //   this.searchListArr[0].content = data[1].message;
      //   // console.log(this.roomId == "");
      //   if (this.roomId != "") {
      //     this.userHistory();
      //   }
      //   console.log(this.clickIndex);
      //   if (this.clickIndex != "") {
      //     this.clickIndex++;
      //     console.log(this.clickUser_id, this.isDotList);
      //     if (this.isDotList.indexOf(this.clickUser_id) != -1) {
      //       this.clickIndex = 0;
      //     }
      //   }
      //   // this.getLeftUserList();
      // });

      this.socket.on("connect", () => {
        this.socket.emit("bind", [this.userId]);
      });
    },
    async getScroll(event) {
      // if(this.scrollflag){

      // }
      // 滚动条距离底部的距离scrollBottom
      // let scrollBottom =
      //   event.target.scrollHeight -
      //   event.target.scrollTop -
      //   event.target.clientHeight;
      // window.getComputedStyle(this.$refs.LTitems).height;
      if (event.target.scrollTop == 0) {
        this.myLoading = true;
        const res = await this.$api.chatHistory({
          room_id: this.roomId,
          last_chat_id: this.historyMassage[0].id
        });
        console.log(res);
        if (res.data.chat_histories.length == 0) {
          this.myLoadingText = "没有更多消息了";
        } else {
          this.myLoadingText = "正在加载中...";
        }
        this.historyMassage = res.data.chat_histories
          .reverse()
          .concat(this.historyMassage);
        this.historyMassage.forEach(ele => {
          ele.myadd_time = ele.created_at; //聊天时间
          this.leftRight.push(ele.send_id);
          ele.content = ele.message;
        });
        console.log(this.historyMassage, "aaaaaa");
        setTimeout(() => {
          console.log(
            this.$refs.myitems[res.data.chat_histories.length - 1].offsetTop
          );
          console.log(this.$refs.myitems[res.data.chat_histories.length - 1]);
          this.itemHeight = this.$refs.myitems[
            res.data.chat_histories.length - 1
          ].offsetTop;
          event.target.scrollTop = this.itemHeight + 50;
        }, 100);
        this.myLoading = false;
      }
    },
    // oss
    async userHistory() {
      console.log("历史记录");
      //获取消息历史记录
      this.dplayerList = [];
      const res = await this.$api.chatHistory({
        room_id: this.roomId
        // last_chat_id:,
      });
      this.historyMassage = res.data.chat_histories;
      this.historyMassage.reverse();
      this.leftRight = [];
      this.historyMassage.forEach(ele => {
        ele.myadd_time = ele.created_at; //聊天时间
        this.leftRight.push(ele.send_id);
        ele.content = ele.message;
      });
      setTimeout(() => {
        this.scrollBottm();
        this.loading = false;
      }, 500);
      // const historyObj = {
      //   user_id: this.contentChat.user_id
      //   // between_time:,
      //   // is_read:,//是否已读
      // };
      // this.$api
      //   .userHistory(historyObj)
      //   .then(res => {
      //     this.historyMassage = res.data.data;
      //     this.leftRight = [];
      //     this.historyMassage.forEach(ele => {
      //       ele.myadd_time = this.formatDate(new Date(ele.add_time * 1000)); //聊天时间
      //       this.leftRight.push(ele.send_id);
      //       // var reg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
      //       // if (reg.test(ele.content)) {
      //       //   // ele.type = 1;
      //       // }
      //       // console.log(ele.type)
      //       if (ele.type == 11) {
      //         //链接（图片，价格，描述）
      //         ele.content = JSON.parse(ele.content);
      //         console.log(ele.content);
      //       } else if (ele.type == 3) {
      //         //视频
      //         this.dplayerList.push(ele);
      //       }
      //     });
      //     console.log(this.historyMassage, this.leftRight);
      //   })
      //   .then(() => {
      //     if (this.dplayerList) {
      //       console.log(this.dplayerList);
      //       this.dplayerList.forEach((ele, index) => {
      //         new this.$DPlayer({
      //           container: document.getElementsByClassName("dplayer")[index],
      //           screenshot: true,
      //           video: {
      //             url: ele.content
      //           },
      //           hotkey: false
      //         });
      //       });
      //     }
      //   })
      //   .then(() => {
      //     setTimeout(() => {
      //       this.scrollBottm();
      //       this.loading = false;
      //     }, 500);
      //   });
    },
    dialogV(ele) {
      console.log(ele);
      this.dialogVisible = true;
      setTimeout(() => {
        // console.log(document.getElementById("dplayer1"));
        this.dp = new this.$DPlayer({
          container: document.getElementById("dplayer1"),
          screenshot: true,
          autoplay: true,
          video: {
            url: ele.content
            // pic: "https://v-cdn.zjol.com.cn/280443.mp4",
            // thumbnails: "thumbnails.jpg",
          },
          hotkey: false
          // danmaku: {
          //   id: "demo",
          //   api: "https://api.prprpr.me/dplayer/",
          // },
        });
      }, 300);
    },
    userClick(ele, index) {
      // 点击左侧用户列表
      this.loading = true;
      // this.webFlag = false;
      console.log(ele, index);
      this.roomId = ele.id;
      this.toUserAvatar = ele.user.avatar;
      this.contentChat.nick_name = ele.user.nick_name;
      this.toUserId = ele.user.user_id;
      // this.isDotList[index] = "";
      if (this.isDotList.length != 0) {
        // ******点击左侧用户列表后小红点消失且不重新跳到下面******
        this.isDotList = this.isDotList.filter(num => {
          ele.isDot = false;
          return num != ele.user_id;
        });
      }
      console.log(this.isDotList);
      this.$store.commit("isDotNum", this.isDotList);
      // this.contentChat = ele;
      this.userHistory();
      // this.getLeftUserList();
      setTimeout(() => {
        ele.isDot = false;
      }, 1000);
      this.$refs.wxchatBorderRightMid.scrollTop = 0;
      this.clickIndex = index;
      console.log(this.clickIndex);
      this.searchListArr.forEach(ele2 => {
        ele2.isActive = false;
      });
      this.searchListArr[this.clickIndex].isActive = true;
      this.clickUser_id = this.searchListArr[this.clickIndex].user_id;
      console.log(this.searchListArr);
    },
    async sendBtn() {
      //发送聊天内容
      // console.log(document.getElementsByClassName("el-upload-list__item-name"))
      if (this.oppinput != "") {
        // this.inputValue = this.oppinput
        console.log(this.oppinput);
      } else {
        this.inputValue = this.$refs.sayInput.$refs.textarea.value; //输入框的内容
      }
      if (this.oppinput == "") {
        if (this.inputValue == "\n" || this.inputValue == "") {
          this.$message({
            message: "不能发送空白信息",
            type: "warning"
          });
        } else {
          if (this.inputValue.indexOf("\n") > 0) {
            var inputValue = this.inputValue.split("\n").join("");
          } else {
            inputValue = this.inputValue;
          }
          console.log(inputValue, this.toUserId);
          this.socket.emit("msgToUser", [0, inputValue, this.toUserId]);
          this.searchListArr.unshift(
            this.searchListArr.splice(this.clickIndex, 1)[0]
          );
          this.searchListArr[0].content = inputValue;
          // console.log(this.roomId == "");
        }
      } else {
        this.socket.emit("msgToUser", [1, this.oppinput, this.toUserId]);
      }
      // this.getLeftUserList();
      this.clickIndex = 0;
      console.log(this.searchListArr);
      this.$refs.sayInput.$refs.textarea.value = "";
      this.oss_imgurl = "";
      this.oppinput = "";
      //
      if (this.roomId != "") {
        this.userHistory();
      }
      console.log(this.clickIndex);
      if (this.clickIndex != "") {
        this.clickIndex++;
        console.log(this.clickUser_id, this.isDotList);
        if (this.isDotList.indexOf(this.clickUser_id) != -1) {
          this.clickIndex = 0;
        }
      }
    },
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // var g=1551334252272; //定义一个时间戳变量
    // var d=new Date(g);
    async getLeftUserList() {
      console.log("右边用户列表");
      const res = await this.$api.chatRooms();
      // console.log(res);
      this.leftUserList = [];
      res.data.forEach((ele, index) => {
        // console.log(ele.chat_histories_with_one); //最后一条内容
        this.leftUserList.push(ele);
        if (ele.chat_histories_with_one.length == 0) {
          this.leftUserList[index].content = "";
        } else {
          this.leftUserList[index].content =
            ele.chat_histories_with_one[0].message; //最后一条内容
        }
        this.leftUserList[index].myAdd_time = this.formatDate(
          new Date(ele.updated_at)
        ); //聊天时间
      });
      // console.log(this.leftUserList);
      console.log(this.isDotList);
      this.leftUserList.forEach((item, index) => {
        if (this.isDotList.indexOf(item.user_id) != -1) {
          console.log(item.user_id, item);
          item.isDot = true;
        }
        if (item.isDot == true) {
          this.leftUserList.unshift(this.leftUserList.splice(index, 1)[0]);
        }
      });
      this.searchListArr = this.leftUserList;
      this.searchListArr.forEach(ele2 => {
        ele2.isActive = false;
      });
      console.log(this.clickIndex);
      if (this.clickIndex == 0) {
        this.searchListArr[this.clickIndex].isActive = true;
      }
      if (this.clickIndex != "") {
        this.searchListArr[this.clickIndex].isActive = true;
      }
      console.log(this.searchListArr);
    },
    // 滚动条到底部
    scrollBottm() {
      let el = this.$refs.wxchatBorderRightMid;
      console.log(el.scrollTop);
      el.scrollTop = el.scrollHeight;
    }
    // //进入页面创建websocket连接
    // initWebSocket() {
    //   let _this = this;
    //   //判断页面有没有存在websocket连接
    //   if (window.WebSocket) {
    //     let ws = new WebSocket("ws://192.168.2.200:8282");
    //     _this.ws = ws;
    //     ws.onopen = func`tion () {
    //       console.log("服务器连接成功");
    //       _this.ws.send({ test: "12345" });
    //     };
    //     ws.onclose = function () {
    //       console.log("服务器连接关闭");
    //     };
    //     ws.onerror = function () {
    //       console.log("服务器连接出错");
    //     };
    //     ws.onmessage = function (e) {
    //       //接收服务器返回的数据
    //       let resData = JSON.parse(e.data);
    //       console.log(resData);
    //       if (resData.type == "say") {
    //         console.log("say说");
    //         console.log(resData.data);
    //         console.log(Number(resData.data.send_id.slice(2)));
    //         // this.isDotList.push(Number(resData.data.send_id.slice(2)));
    //         _this.isDotList = Number(resData.data.send_id.slice(2));
    //       } else if (resData.type == "init") {
    //         _this.$api.bindShop(resData.client_id).then((res) => {
    //           //绑定client_id到shop_id
    //           console.log(res.data.info);
    //         });
    //       }
    //       _this.getLeftUserList();
    //     };
    //   }
    // },
  }
};
</script>
<style>
.myLoading {
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #2683f5;
}
.websocket .img_cyy {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
.websocket .searchInp {
  transform: translateY(-4px);
}
.websocket .el-popover button {
  margin-top: 20px !important;
}
.websocket .displayN {
  display: none;
}
.websocket .upload-demo {
  height: 50px;
}
.websocket .el-upload-list {
  transform: translate(56px, -47px);
  width: 210px;
}
.websocket .chatBtn {
  transform: translate(54px, 106px);
}
/* .el-dialog__wrapper {
  position: relative !important;
}
.el-dialog__header {
  padding: 20px 20px 10px;
} */
.websocket {
  height: 100%;
  width: 100%;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.webSocketWrapper {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 798px;
}
.chatPop1 :hover {
  /* background-color: #fafafa; */
}
.chatPop1 .popspan {
  background-color: #fafafa;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 0px 0 10px 10px;
  position: relative;
  border: 1px solid #e3e3e3;
  max-width: 290px;
  -webkit-word-break: break-all;
  -moz-word-break: break-all;
  -ms-word-break: break-all;
  -o-word-break: break-all;
  word-break: break-all;
}
.chatPop1 .popspan::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid #fff;
  position: absolute;
  top: 8px;
  left: -16px;
}
.chatPop1 .spanRed {
  color: #f40;
  border: 0px;
  margin: 0;
}
.chatPop1 .type11Span {
  border: 0px;
  margin: 0;
}
.chatPop1 .popspan.spanRed::after,
.chatPop1 .popspan.type11Span::after {
  content: "";
  border: 0px solid #ffffff00;
  border-right: 0px solid #fff;
  position: absolute;
  top: 8px;
  left: -16px;
}
.chatPop2 .popspan :hover {
  background-color: #2683f5;
}
.chatPop2 .popspan {
  background-color: #2683f5;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 0px 15px 10px 10px;
  position: relative;
  border: 1px solid #e3e3e3;
  max-width: 290px;
  float: right;
  color: #fff;
  -webkit-word-break: break-all;
  -moz-word-break: break-all;
  -ms-word-break: break-all;
  -o-word-break: break-all;
  word-break: break-all;
}
.chatPop2 .popspan::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid #2683f5;
  position: absolute;
  top: 8px;
  right: -16px;
  transform: rotateY(180deg);
}
.custom {
  border: 0px solid blue;
  height: 670px;
  width: 795px;
}
.wxchatBorder {
  width: 795px;
  height: 670px;
  border: 1px solid red;
  margin-left: -20px;
  margin-top: -59.5px;
}
.wxchatBorderLeft {
  width: 250px;
  height: 670px;
  background-color: #eeebe9;
  border: 1px solid gray;
  display: inline-block;
  float: left;
  /* margin-top: -60px; */
}
.userList {
  position: absolute;
  top: 38px;
  width: 249px;
  height: 632px;
  overflow-y: scroll;
}
.userList .user div:hover {
  background-color: rgba(207, 209, 208, 1);
}
.userList .user .active {
  background-color: rgba(201, 199, 198, 1);
}
.userList .user .leftUser_input {
  width: calc(100% - 70px);
  transform: translateY(14px);
}
.el-dialog__body {
  position: relative;
}
.leftContent {
  position: absolute;
  /* top: -60px; */
  left: 252px;
  width: 543px;
}
.wxchatPeople {
  color: #000000;
  font-size: 14px;
  transform: translateY(-8px);
}
.wxchatNews {
  color: #999;
  font-size: 12px;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 16px;
}
.wxchatName {
  color: #000000;
  font-size: 20px;
  float: left;
  padding-left: 30px;
  padding-top: 20px;
}
/* .wxchatMore {
  color: #999;
  font-size: 20px;
  float: right;
  margin-right: -15px;
  padding-top: 25px;
} */
.wxchatBorderRightTop {
  width: 545px;
  height: 60px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e7e7e7;
  display: block;
  float: right;
  margin-right: -2px;
}
.wxchatBorderRightTop .close .el-icon-close {
  margin-right: 20px;
  font-size: 20px !important;
  margin-top: 16px;
}
.wxchatBorderRightMid {
  width: 545px;
  height: 428px;
  background-color: #f5f5f5;
  /* border: 2px solid deeppink; */
  display: block;
  margin-right: -2px;
  overflow-y: scroll;
}
.wxchatBorderRightBottom {
  width: 543px;
  height: 181px;
  background-color: #fff;
  border: 1px solid #eee;
  display: block;
  float: right;
  margin-right: -2px;
}
.wxchatIcon1 {
  display: inline-block;
  padding: 14px 10px 14px 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.wxchatIcon1 .el-icon-picture:hover {
  cursor: pointer;
  text-shadow: 0px 0px 5px rgb(189, 226, 255);
}
.sendButton {
  float: right;
  margin-top: 18px;
  margin-right: 28px;
}
.dplayer .dplayer-controller {
  display: none;
}
.dplayer .dplayer-controller-mask {
  display: none;
}
#dplayer1 .dplayer-controller {
  display: block;
}
#dplayer1 .dplayer-controller-mask {
  display: block;
}
.websocket .el-dialog__wrapper {
  max-height: 100%;
}
.websocket .el-dialog {
  width: 40% !important;
  /* max-height: 1000px; */
}
/* .websocket .el-dialog__body{
  max-height: 1000px !important;
} */
/* .dplayer{
  max-height: 1000px !important;
}
.dplayer-video-wrap{
  max-height: 1000px !important;
} */
.websocket .posRelative .el-icon-video-play {
  /* height: 50px;
  width: 50px; */
  font-size: 70px;
  color: rgb(30, 30, 36);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.websocket .posRelative .el-icon-video-play:hover {
  color: rgba(30, 30, 36, 0.8);
}
.websocket .posRelative {
  position: relative;
}
</style>