import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

import AppLeftNav from './AppLeftNav';

import { Grid,Row,Col } from 'react-bootstrap';

const muiTheme = getMuiTheme();

class App extends Component {
	
  static childContextTypes={
  	//定义方法key
    dispatch: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
  }
  getChildContext() {
  	//将下面方法返回到子节点直接使用
    return {
      dispatch: this.props.dispatch,
      muiTheme: getMuiTheme()
    };
  }
  render() {
    let {news}=this.props;
   
    let style={
      position: 'fixed',
      top: 0,
      zIndex:2000,
      width:"100%"
    };

    let mainScreenStyle={
      paddingTop: '64px',
      minHeight: '400px', 
      paddingLeft: '256px',
      marginBottom: '40px'
    };

    let footerStyle={
      padding: '72px 24px 72px 256px',
      backgroundColor:'rgb(33, 33, 33)',
      boxSizing: 'border-box',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.54)'
    };
    return (
      <div>
	      <Grid fluid={true}>
		       <Row className="show-grid">
			       <Col xs={12} md={8}>
				       <code>
					       <MuiThemeProvider muiTheme={getMuiTheme()}>
						        <AppBar zDepth={0} style={style} title="CMS" 
						          showMenuIconButton={false} 
						          iconElementRight={<FlatButton
						            label="退出"
						            icon={<Avatar src="/images/uxceo-128.jpg" />}
						          />}
						        />
					         </MuiThemeProvider>
				         </code>
			         </Col>
		         </Row>
	         <Row className="show-grid">
	          	<Col >
				  <code>
	        				<AppLeftNav />
	        		  </code>
			    </Col>
	        </Row>
	         <Row className="show-grid">
	         	<Col >
	         		<code>
				        <div className="mainScreen" style={mainScreenStyle}>
				          <div style={{margin: '48px 72px'}}>
				            {React.cloneElement(this.props.children, {news: news })}
				          </div>
				        </div>
		         	</code>
			    </Col>
	         </Row>
	        <Row className="show-grid">
	        		<Col >
	         		<code>
				        <div className="footer" style={footerStyle} >
				          <p>Copyright ©1999-2016 My Company. All rights reserved. </p>
				        </div>
				    </code>
			    </Col>
	         </Row>
	         </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { news } = state.rootReducer;
  return {
    news:news
  };
}

export default connect(mapStateToProps)(App);


