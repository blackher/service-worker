import React, { Component } from 'react';

import CommentForm from './commentForm';

import CommentList from './commentList';

import './commentApp.css';
class CommentApp extends Component{

  render(){
      return(
        <div className ='wrapper'>
            <CommentForm />
            <CommentList />
        </div>
      )



  }


}
export default CommentApp
