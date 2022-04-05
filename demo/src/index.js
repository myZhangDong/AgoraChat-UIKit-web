import React, { Component } from "react";
import { render } from "react-dom";

import { EaseChat, EaseApp } from "../../src/index";
// import WebIM from "./WebIM";
import val from "./comm";
// import initListen from "./WebIMListen";
import { times } from "lodash";
export default class Demo extends Component {
  state = {
    token: val,
    type:'',
    showMemberList: false,
    list:[
      { nickName: 'test000', role: 'GroupOwner' },
      { nickName: 'test111', role: 'Admin' },
      { nickName: 'test222', role: 'Admin' },
      { nickName: 'test333', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
      { nickName: 'test444', role: 'member' },
  ],
  };

  postData = (url, data) => {
    return fetch(url, {
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      mode: "cors",
      redirect: "follow",
      referrer: "no-referrer",
    }).then((response) => response.json());
  };
    addSessionItem = () => {
    let session = {
      conversationType: "singleChat",
      conversationId: "zd132",
    };
    EaseApp.addConversationItem(session);
    // EaseApp.thread.closeThreadPanel()
    // EaseApp.thread.setHasThreadEditPanel(true)
  };
  test = (res) =>{
    console.log('test登录成功',res);
  }
  test2 = (err) =>{
    console.log('登录失败',err)
  }
  test3 = (res) =>{
    console.log('res>>',res);
  }
  test4 = (val) =>{
    console.log('val',val);
  }
  test5 = (val1,val2) => {
    console.log('val',val1,val2)
  }
  
  render() {
    console.log("this.state.token>>", this.state.token);
    return (
      <div>
          <button onClick={this.addSessionItem}> 测试 </button>
        <h3>EaseApp</h3>
        <div>
          <EaseApp
            successLoginCallback={this.test}
            failCallback={this.test2}
            onAvatarChange={this.test3}
            onChatAvatarClick={this.test4}
            onEditThreadPanel={this.test5}
            appkey= "easemob-demo#chatdemoui"
            username="wy6"
            password="1"
            isShowReaction
            // agoraToken="007eJxTYPCe51Vb5Rl3kCX/veizhwyel9f7fNp0e2mBNGd157ut3zUVGNIMU5LNzS2SUlKSzUzMElMs0ozMDCzNzZITjVIMDE2To7ItkxRkGBhONNtwMzKwMjACIYivwmBiaJxoYWxgoJtoZpmqa2iYmqybZG5oqWtpbGJsmpaWbGpmbgIAfPMmSQ=="
            header={<div style={{ height: "100px" }}>TestHeader</div>} 
            />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
