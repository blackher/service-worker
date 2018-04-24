import React, { Component } from 'react';
import Square from './Square';
import axios from 'axios';

class Board  extends Component {
  constructor(){
    super();
    this.state = {
      square:Array(9).fill(null),
      isNext:true,
      data:null
    }


  }
  componentDidMount(){
    let self =this;//this
    axios.get('https://72dbfc87.ngrok.io/',{})
    .then(function(res){
        //console.log(res);
        //this.setState("data")
        self.setState({data:res.data});  //this  指向错误
        //return res.data;
    })
    .catch(function(err){
        console.log(err);
    });
    //console.log(data);


  }



  handleClick(i){
    //setInterval(this.getData(),3000);

    const squares = this.state.square.slice();
    if(this.getWin(squares)||squares[i]){
      return false;
    }
    squares[i] = this.state.isNext?'X':'O';
    this.setState({square: squares,isNext:!this.state.isNext});
  }

  renderSquare(i){
    return <Square value={this.state.square[i]} onClick={()=>{this.handleClick(i)}}/>;
  }
 //获取获胜者
 getWin(squares){
   const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

   ];
   for (var i = 0; i < lines.length; i++) {
     const[a,b,c] = lines[i];

     if(squares[a] &&squares[a] ===squares[b] &&squares[a]===squares[c]){
       return squares[a];
     }

   }
   return null;


 }

  render() {
    const winner = this.getWin(this.state.square);
    let data = this.state.data;
    let status;
    if(winner){
      status ='winne is'+winner;
    }else{
      status = this.state.isNext?'Next player: X':'Next player: O';
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="data">{data}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }



}
export default Board;
