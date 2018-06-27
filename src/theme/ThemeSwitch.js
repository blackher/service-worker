import React,{Component} from 'react';

import {connect} from "./redux";



class ThemeSwitch extends Component{

    handlChangeThemeColor(color){
        console.log(this.props)
        this.props.onSwitch(color)
    }
    render(){
        return(
            <div>
                <button style={{color:'red'}} onClick={this.handlChangeThemeColor.bind(this,'red')}>red</button>
                <button style={{color:'blue'}} onClick={this.handlChangeThemeColor.bind(this,'blue')}>bule</button>
            </div>
        )
    }
}
const dispatchProps = (dispatch)=>{

    return{
        onSwitch:(color)=>{
            return dispatch({type:'CHANGE_COLOR',themeColor:color})
        }
    }


}
const mapStateToProps = (state)=>{
    return{
        themeColor:state.themeColor
    }
}
ThemeSwitch = connect(mapStateToProps,dispatchProps)(ThemeSwitch)
export default ThemeSwitch
