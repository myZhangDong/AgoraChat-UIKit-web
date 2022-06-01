import React, { Component } from "react";
import { render } from "react-dom";
import { EaseChat, EaseApp } from "../../src/index";
import axios from 'axios'
// import WebIM from "./WebIM";
import val from "./comm";
// import initListen from "./WebIMListen";

export default class Demo extends Component {
  state = {
    token: val,
  };

  getRtctoken(params) {
    const { channel, agoraId, username } = params;
    const url = `https://a41.easemob.com/token/rtc/channel/${channel}/agorauid/${agoraId}?userAccount=${username}`
    return axios
      .get(url)
      .then(function (response) {
        console.log('getRtctoken', response)
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getConfDetail = (username, channelName) => {
    const url = `https://a41.easemob.com/agora/channel/mapper?channelName=${channelName}&userAccount=${username}`

    return axios.get(url)
      .then(function (response) {
        let members = response.data.result
        return members
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
      conversationId: "test0001",
    };
    EaseApp.addConversationItem(session);
    EaseApp.changePresenceStatus({ [session.conversationId]: 'Online' })
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
  handleGetToken = async (data) => {
    let token = ''
    console.log('data', data)

    // zd3 token
    token = await this.getRtctoken({ channel: data.channel, agoraId: '527268238', username: data.username })
    return {
      agoraUid: '527268238',
      accessToken: token.accessToken
    }
  }

  handleGetIdMap = async (data) => {
    let member = {}
    member = await this.getConfDetail(data.userId, data.channel)
    return member
  }

  render() {
    console.log("this.state.token>>", this.state.token);
    return (
      <div>
          <button onClick={this.addSessionItem}> 测试 </button>
        <h3>EaseApp</h3>
        <div>
          <EaseApp
            customMessageList={ [{name: 'report', value: 'report', position: 'others'}]}
            isShowReaction
            successLoginCallback={this.test}
            failCallback={this.test2}
            onAvatarChange={this.test3}
            onChatAvatarClick={this.test4}
            
            appkey= "easemob-demo#easeim"
            username="zd3"
            password="1"
            // agoraToken="007eJxTYDiw2fuKzNWjLzknllxuMkl+z+OTa5dxRZPB6fP1VGlGX1sFhjTDlGRzc4uklJRkMxOzxBSLNCMzA0tzs+REoxQDQ9NkPSnjJAUZBgbT1MfvGBlYGRiBEMRXYTBPsTAyMzc10LVMSjTVNTRMTda1NDdP1U0xT7Y0M0oztjC1NAMA7zUk8Q=="
            header={<div style={{ height: "100px" }}>TestHeader</div>} />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
