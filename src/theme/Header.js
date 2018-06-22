import React,{Component}  from 'react'

import PropTypes from 'prop-types'

class Header extends Component{
    constructor(){
        super()
        this.state = {themeColor:''}
    }

    static contextTypes = {
        store:PropTypes.object//限制类型 object
    }

    componentWillMount(){
        const {store} = this.context;
        store.subscribe(()=>this._updateHeaderColor());
        this._updateHeaderColor();
    }

    _updateHeaderColor(){
        const {store} = this.context
        console.log('change header color');
        const  state = store.getState()
        this.setState({themeColor:state.themeColor})
    }

    render(){
        return(
            <h1 style={{color:this.state.themeColor}}>this is header</h1>
        )
    }
}
export default Header