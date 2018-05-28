import React, { Component } from 'react'

import PropTypes from 'prop-types';

class Comment extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }
  componentDidMount(){
    console.log(this.context)
  }
  render () {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.comment.username} </span>：
        </div>
        <p>{this.props.comment.content}</p>
      </div>
    )
  }
}

export default Comment
