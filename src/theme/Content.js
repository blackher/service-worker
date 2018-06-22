import React,{Component} from 'react';

//import PropTypes from 'prop-types';

import ThemeSwith from './ThemeSwitch'
import PropTypes from "prop-types";

class Content extends Component{
    constructor(){
        super();
        this.state = {themeColor:''}
    }
    static contextTypes = {
        store:PropTypes.object//限制类型 object
    }

    componentWillMount() {

        const { store } = this.context

        store.subscribe(() => this._updateContentColor())
        this._updateContentColor()

    }

    _updateContentColor(){
        const {store} = this.context
        console.log('change content color');
        const  state = store.getState()
        this.setState({themeColor:state.themeColor})
    }

    render(){
        return(

            <div>
                <p style={{color:this.state.themeColor}}>this is content</p>
                <ThemeSwith/>
            </div>
        )
    }
}
export  default Content