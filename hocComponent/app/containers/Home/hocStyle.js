import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import Stylea from './style';

function HOC(Stylea) {
	return class HocHome extends Stylea {
		render () {
			const elemTree = super.render();
			let newProps = {};
			//渲染劫持只能修改继承组件的属性值
			if(elemTree && elemTree.type === 'div'){
				newProps = {className: 'active'};
			}
			let newChildren = [];
			elemTree.props.children.forEach((item,i) => {
				let propsv;
				if( item.type === 'input'){//根据type的元素名称进行判断
					propsv = Object.assign({},item.props,{placeholder:3,key:i});
				}else{
					propsv = Object.assign({},item.props,{key:i});
				}
				//判断函数名称 因为传入的是一个组件，或者是函数声明的组件，没有经过reconciliation，所以不能进行渲染劫持，只能修改传入的props
				if(item.type.name === 'Name'){
					
				}
				const newItem = React.cloneElement(item,propsv,item.props.children)
				
				newChildren.push(newItem);
			})
			
			
			
			const props = Object.assign({},elemTree.props,newProps);
			
			const newElm = React.cloneElement(elemTree,props,newChildren)
			
			
			return newElm
			

		}
	}

}

export default HOC(Stylea)
