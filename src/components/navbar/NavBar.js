import React, {Component} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';


class NavBar extends Component{
	render(){
		return (
			<AppBar position="static">
				<Toolbar>
				{this.props.children}
			</Toolbar>
			</AppBar>
		);
	}
}
export default NavBar;
