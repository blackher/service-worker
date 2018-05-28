import React, { Component } from 'react';

import PropTypes from 'prop-types';

import CommentForm from './commentForm';

import CommentList from './commentList';

import './commentApp.css';



class CommentApp extends Component{
  static childContextTypes = {
    themeColor: PropTypes.string
  }
  getChildContext () {
    return { themeColor: '123' }
  }
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
