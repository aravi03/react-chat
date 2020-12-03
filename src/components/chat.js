import React, { Component } from 'react'
import '../static/css/chat_interface.css';
import '../static/css/temporary.css';
class SendButton extends Component{
    render(){
      return (<div className="send_message" onClick={this.props.handleClick}>
                <div className="text">send</div>
              </div>);
    }
}

class MessageTextBoxContainer extends Component{
  render(){
    return(
      <div className="message_input_wrapper">
        <input id="msg_input" className="message_input" placeholder="Type your messages here..." value={this.props.message} onChange={this.props.onChange} onKeyPress={this.props._handleKeyPress}/>
      </div>
    );
  }
}

class Avartar extends Component {
  render(){
    return(
      <div className="avatar"/>
    );
  }
}

class BotMessageBox extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <li className="message left appeared">
        {/* <Avartar></Avartar> */}
        <div className="text_wrapper">
            <div className="text">Default</div>
        </div>
      </li>
    );
  }
}

class UserMessageBox extends Component{
  constructor(props) {
    super(props);

  }
  render(){
    return(
      <li className={`message ${this.props.appearance} appeared`}>
        <Avartar></Avartar>
        <div className="text_wrapper">
            <div className="text">{this.props.message}</div>
            {/* <div className="time">{this.props.date}</div> */}
            <div className="time">{this.props.time}</div>
        </div>
      </li>
    );
  }
}

class MessagesContainer extends Component{
  constructor(props) {
    super(props);
    this.createBotMessages = this.createBotMessages.bind(this);
  }

  scrollToBottom = () => {
    var el = this.refs.scroll;
    el.scrollTop = el.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  createBotMessages(){
    console.log(this.props.messages);
    return this.props.messages.map((message, index) =>
       <UserMessageBox key={index} message={message["message"]} time={message["time"]} date={message["date"]} appearance={message["isbotmessage"] ? "left": "right"}/>
    );
  }

  render(){

    return(
      <ul className="messages" ref="scroll">
        {this.createBotMessages()}
      </ul>
    );
  }
}


export default class chat extends Component {
    constructor(props){
        super(props);
        this.state = {"messages": [], "current_message":""}
        this.handleClick = this.handleClick.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addMessageBox = this.addMessageBox.bind(this);
      }
      
    
      addMessageBox(enter=true){
        let messages = this.state.messages;
        let current_message = this.state.current_message;
        console.log(this.state);
        if(current_message && enter){
            var d = new Date(); // for now
            var dd=d.getDate();
            var dm=d.getMonth();
            var dy=d.getFullYear();
            var h=d.getHours(); // => 9
            var m=d.getMinutes(); // =>  30
            var s=d.getSeconds(); // => 51
          messages = [...messages, {"message":current_message,"date":dd+':'+dm+':'+dy,"time":h+':'+m+':'+s}];
          messages = [...messages, {"message":"Hello I'm a bot. This is my default message",isbotmessage:true,"time":h+':'+m+':'+s,"date":dd+':'+dm+':'+dy}];
          current_message = ""
        }  
        this.setState({
          current_message: current_message,
          messages
        });
    
      }
    
      handleClick(){
        this.addMessageBox();
      }
    
      onChange(e) {
        this.setState({
          current_message: e.target.value
        });  
      }
    
        _handleKeyPress(e) {
        let enter_pressed = false;
        if(e.key === "Enter"){
          enter_pressed = true;
        }
        this.addMessageBox(enter_pressed)
      }
    
      render() {
        return (
            <div>
            <h1 className='chat-head'>CHAT</h1>
          <div className="chat_window">
            <MessagesContainer messages={this.state.messages}></MessagesContainer>
            <div className="bottom_wrapper clearfix">
              <MessageTextBoxContainer 
                _handleKeyPress={this._handleKeyPress} 
                onChange={this.onChange} 
                message={this.state.current_message}></MessageTextBoxContainer>
              <SendButton handleClick={this.handleClick}></SendButton>

            </div>
            
          </div>
          </div>
        );
      }
}
