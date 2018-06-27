import React,{Component}  from 'react'

import PropTypes from 'prop-types'
/*
*
* mapStateToPros   update store value
* mapDispatchToProps
* */
export const connect =(mapStateToProps,mapDispatchToProps)=>(WrappedComponent)=>{

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
            let stateProps = mapStateToProps?mapStateToProps(store.getState()):{}
            let dispatchProps = mapDispatchToProps?mapDispatchToProps(store.dispatch):{}
            this.setState({
                allProps:{
                    ...stateProps,
                    ...this.props,
                    ...dispatchProps
                }
            })
        }
        render(){
            return <WrappedComponent {...this.state.allProps}/>
        }

    }
    return Connect

}