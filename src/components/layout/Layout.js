import React from 'react';
import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css';

import '../../../node_modules/react-resizable/css/styles.css';
import './layout.css';

class Layout extends React.Component{
	render(){
		return (
			<GridLayout className="layout"  cols={24} rowHeight={50} width={1900}>
				{this.props.children}
			      </GridLayout>
		);
	}
}

export default Layout;
