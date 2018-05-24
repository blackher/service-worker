import React,{Component} from 'react';

class like extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.changeLikeText = this.changeLikeText.bind(this);
    this.state ={
      isLiked:false,
      bgcolor:props.value
      //初始化状态
    }
  }
  //
  changeLikeText(e){
    console.log(e);
    this.setState({
      isLiked:!this.state.isLiked,
      bgcolor: this.props.value === this.state.bgcolor ?'yellow': this.props.value
    })
  }
  render(){

    return(
    <button id='like-btn'>
       <span className='like-text' style={{color:this.state.bgcolor}} onClick = {this.changeLikeText}>{this.state.isLiked ? '取消' : '点赞'}</span>

     </button>
   )

  }
}
export default like;
