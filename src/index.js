import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
//import Board from './Board';
//import Like from './compent/like';
//import CommentApp from './compent/commenlist/commentApp'

import Header from './theme/Header';
import Content from './theme/Content';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
class Index extends Component{

    render(){
        return(
            <div>
                <Header/>
                <Content/>
            </div>
        )
    }

}
//redux store
// function createStore(reducer){
//     let state =null;
//     const listeners =[];//监听器 处理各个组件的变化
//     const subscribe = (listener)=>{listeners.push(listener)};//订阅器
//     const  getState = ()=>state;
//     const dispatch = (action)=>{
//         state = reducer(state,action);
//         //console.log(listeners);
//         listeners.forEach((listener)=>listener());//触发监听器
//     }
//     dispatch({});//初始化
//
//     return{getState,dispatch,subscribe};
// }
//change theme color reducer
const themeReducer = (state,action)=>{
    if(!state){
        return{
            themeColor:'red'//default color
        }
    }
    switch (action.type){
        case 'CHANGE_COLOR':
            return{...state,themeColor:action.themeColor}

        default:
            return state

    }
}
const store = createStore(themeReducer);

ReactDOM.render(<Provider store={store}><Index  /></Provider>, document.getElementById('root'));
//registerServiceWorker();
