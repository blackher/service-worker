import React,{Component}  from 'react'

import PropTypes from 'prop-types'

export const connect =(mapStateToProps)=>(WrappedComponent)=>{

    class Connect extends Component{
        static contextTypes ={
            store:PropTypes.object
        }
        //初始化state
        constructor(){
            super()
            this.state ={allProps:{}}
        }


        componentWillMount(){

            const {store}= this.context
            this._updateProps()//初始化
            store.subscribe(()=>this._updateProps())
        }
        //更新所有的props
        _updateProps(){
            const {store} =this.context
            let contextState = mapStateToProps(store.getState());
            this.setState({
                allProps:{
                    ...contextState,
                    ...this.props
                }
            })
        }
        render(){
            return <WrappedComponent {...this.state.allProps}/>
        }

    }
    return Connect

}