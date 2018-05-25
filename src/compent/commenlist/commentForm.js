import React, { Component } from 'react';


class CommentForm extends Component {
  constructor(){
    super();
    this.hanldContentChange = this.hanldContentChange.bind(this);
    this.hanldUsernameBlur = this.hanldUsernameBlur.bind(this);
    this.hanldUsernameChange = this.hanldUsernameChange.bind(this);
    this.state = {
      username:'',
      content:''
    }
  }
  //

  componentWillMount(){
    this._loadUsername();

  }
  componentDidMount(){
    this.textarea.focus();
  }

  //处理文本框变化事件
  hanldContentChange(){



  }
  //处理用户名丢失焦点事件
  hanldUsernameBlur(e){
    this._saveUsername(e.target.value);
  }
  //处理用户名变化事件
  hanldUsernameChange(){

  }
  _loadUsername(){
    const username = localStorage.getItem('username');
    if(username){
      this.setState({username:username});
    }


  }
  _saveUsername(username){

      localStorage.setItem('username',username);
    
  }
  render(){
    return(
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input onBlur={this.hanldUsernameBlur} defaultValue={this.state.username}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea  ref = {(textarea)=>this.textarea =textarea}  value = {this.state.content} onChange={this.hanldContentChange} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button>
            发布
          </button>
        </div>
      </div>
    )
  }
}
export default CommentForm
