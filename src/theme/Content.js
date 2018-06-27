import React,{Component} from 'react';

//import PropTypes from 'prop-types';

import ThemeSwith from './ThemeSwitch'

import {connect} from "./redux";

class Content extends Component{



    render(){
        return(
            <div>
                <p style={{color:this.props.themeColor}}>this is content</p>
                <ThemeSwith/>
            </div>
        )
    }
}
const mapStateToProps= (state)=>{
    return{
        themeColor:state.themeColor//需要的属性值
    }
}

Content = connect(mapStateToProps)(Content)

export  default Content