import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Comment from './comment';
class CommentList extends Component {

  static contextTypes = {
    themeColor: PropTypes.string
  }
  render() {
    console.log(this.context);
    const comments = [
       {username: 'Jerry', content: 'Hello'},
       {username: 'Tomy', content: 'World'},
       {username: 'Lucy', content: 'Good'}
     ]
    return (
      <div>
       {comments.map((comment, i) => <Comment comment={comment} key={i} />)}
     </div>
    )
  }
}

export default CommentList
