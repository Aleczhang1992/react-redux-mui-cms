import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Drawer from 'material-ui/Drawer';

import {List, ListItem, makeSelectable} from 'material-ui/List';


import Divider from 'material-ui/Divider';

let SelectableList = makeSelectable(List);

let styles={
	logo:{
		fontSize: 24,
		marginBottom: 8,
		height:'64px'
	}
};

function handleItemTap(itemId){
	console.log('商品浏览：'+itemId);
}

export default class AppLeftNav extends Component {	
	constructor(props) {
		super(props);
		this.onRequestChangeList=this.onRequestChangeList.bind(this);
	}
	onRequestChangeList(event, value) {
    	this.context.router.push(value);
  	}
	render() {
		return (
			<Drawer>
				<div style={styles.logo} />
				<SelectableList value={location.pathname} onChange= {this.onRequestChangeList}>
					<ListItem key={100} primaryText="新闻管理" primaryTogglesNestedList={true} nestedItems={[
						<ListItem key={1} primaryText="新闻" value="/news/browse"/>,
						<ListItem key={2} primaryText="栏目" value="/channel/browse"/>,
                        <ListItem key={3} primaryText="统计" value="/news/stats"/>,
					]}/>
					<ListItem key={101} primaryText="活动管理" primaryTogglesNestedList={true} nestedItems={[
						<ListItem key={1} primaryText="浏览" onTouchTap={()=>{handleItemTap('a1234')}} />,
                        <ListItem key={3} primaryText="批量导入" />,
					]}/>
					<ListItem key={103} primaryText="设置" />
					<Divider />
					<ListItem key={102} primaryText="用户管理" />
				</SelectableList>
			</Drawer>
		);
	}
}

AppLeftNav.contextTypes={
  router: React.PropTypes.object.isRequired
};