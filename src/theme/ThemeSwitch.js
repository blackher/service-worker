import React,{Component} from 'react';
import PropTypes from "prop-types";



class ThemeSwitch extends Component{

    constructor(){
        super();
        this.state = {themeColor:''}
    }
    static contextTypes = {
        store:PropTypes.object//限制类型 object
    }

    componentWillMount(){
        this._updateHeaderColor();
    }

    _updateHeaderColor(){
        const {store} = this.context
        console.log(store);
        const  state = store.getState()
        this.setState({themeColor:state.themeColor})
    }
    handlChangeThemeColor(color){
        console.log(color);
        const {store} =this.context
        store.dispatch({
            type:'CHANGE_COLOR',
            themeColor:color
        })

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
export default ThemeSwitch
