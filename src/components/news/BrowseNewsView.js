import React, { Component,PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Colors from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import ReactPaginate from 'react-paginate';
import { PageHeader,small } from 'react-bootstrap';

import {
  browseNews,
  loadNewsItem,
  openNewsItemEditDialog,
  closeNewsItemEditDialog,
  removeAlertAction,
  newsItemSelectedAction,
  deleteNewsItems,
  showDeleteConfirmDialog,
  cancelDeleteConfirmDialog
} from '../../actions/news';

import {NewsItemForm} from './NewsItemForm';

export class BrowseNewsView extends Component {

  static contextTypes={
    dispatch: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleDialogOpen=this.handleDialogOpen.bind(this);
    this.handleOnClickEditItem=this.handleOnClickEditItem.bind(this);
    this.renderLoadingDialog=this.renderLoadingDialog.bind(this);
    this.renderEditNewsItemDialog=this.renderEditNewsItemDialog.bind(this);
    this.handleRemoveAlert=this.handleRemoveAlert.bind(this);
    this.handleOnRowSelection=this.handleOnRowSelection.bind(this);
    this.handleRemoveNewsItem=this.handleRemoveNewsItem.bind(this);
    this.renderDeleteNewsItemConfirmDialog=this.renderDeleteNewsItemConfirmDialog.bind(this);
    this.handleConfirmDialogClose=this.handleConfirmDialogClose.bind(this);
    this.handleConfirmDialogOpen=this.handleConfirmDialogOpen.bind(this);
    this.handleOnClickOrderBy=this.handleOnClickOrderBy.bind(this);
  }

  componentDidMount(){
    // console.log('==>>this.props.params.orderBy: '+this.props.params.orderBy);
    this.context.dispatch(browseNews(this.props.params.pageNo));  
  }
  gotoPage(pageNo){
    // this.context.dispatch(push(`/news/browse/${pageNo}`));
    this.context.dispatch(browseNews(pageNo));
  }
  handleOnClickOrderBy(e,rowNumber,cellId){
    switch (cellId){
      case 2:// 标题排序
        
        break;
      case 4:// 日期排序
        
        break;
      default:
        ;
    }
  }
  handleDialogOpen(newsItem={}){
    this.context.dispatch(openNewsItemEditDialog(newsItem.id));
  }
  handleOnClickEditItem(e,item){
    this.handleDialogOpen(item);
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
  handleRemoveAlert(){
    this.context.dispatch(removeAlertAction());
  }
  handleOnRowSelection(rows){
  	console.log("this.props",this.props.news.selectedRowsIndex);
    this.context.dispatch(newsItemSelectedAction(rows));
  }
  handleRemoveNewsItem(){
    this.context.dispatch(deleteNewsItems());
  }
  handleConfirmDialogOpen(){
    this.context.dispatch(showDeleteConfirmDialog());
  }
  handleConfirmDialogClose(){
    this.context.dispatch(cancelDeleteConfirmDialog());
  }
	render(){
    let {news}=this.props;
    let newsItemTable=null, newsToolBar=null, alertBar=null;

    if(news.results){
      newsItemTable=this.renderNewsItemTable();
      newsToolBar=this.renderNewsToolBar();
    }

    if(news.alertMessage){
      alertBar= (
        <Snackbar
          open={true}
          message={news.alertMessage}
          autoHideDuration={2000}
          onRequestClose={()=>{
            this.handleRemoveAlert();
          }}
        />
      );
    }

    return (
      <div>
      <PageHeader><small>新闻列表</small></PageHeader>
        {alertBar}
        {this.renderDeleteNewsItemConfirmDialog()}
        {this.renderLoadingDialog()}
        {this.renderEditNewsItemDialog()}
        {newsItemTable}
        <p />
        {newsToolBar}  
      </div>
    );  

    return null;
	}
  renderDeleteNewsItemConfirmDialog(){
    let {news}=this.props;
    if(!news || news.showDeleteConfirmDialog==null){
      return null;
    }
    const actions = [
      <FlatButton
        label="取消"
        secondary={true}
        onTouchTap={this.handleConfirmDialogClose}
      />,
      <FlatButton
        label="删除"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleRemoveNewsItem}
      />,
    ];
    return (
      <Dialog 
        modal={false} 
        actions={actions}
        open={news.showDeleteConfirmDialog} 
        contentStyle={{ maxWidth: '400px'}}>
        <div>确定要删除么?</div>
      </Dialog>
    );
  }
  renderLoadingDialog(){
    let {news}=this.props;
    
    return (
      <Dialog modal={false} open={!news.loaded} contentStyle={customContentStyle} style={{zIndex:3000}}>
        <CircularProgress /><span>{news.loadingMessage}</span>
      </Dialog>
    );
  }
  renderEditNewsItemDialog(){
    let {news}=this.props;
    if(!news.openNewsItemDialog){
      return null;
    }
    return (
      <NewsItemForm currentNewsItemId={news.currentNewsItemId} />
    );
  }
  renderNewsToolBar(){
    let {news}=this.props;
    let {hasNext,hasPrevious,pageNo}=news.results;
    return (
      <Toolbar>
        <ToolbarGroup float="left">
          <IconButton iconClassName="material-icons" tooltip="添加新闻" 
            onClick={this.handleDialogOpen}>note_add</IconButton>
          <IconButton iconClassName="material-icons" 
            tooltip="删除选中的新闻" disabled={news.selectedRowsIndex.length==0} 
              onClick={this.handleConfirmDialogOpen}>delete</IconButton>
        </ToolbarGroup>
        <ToolbarGroup  float="right" firstChild={true}>
        <ReactPaginate previousLabel={"上一页"}
                       nextLabel={"下一页"}
                       breakLabel={<a href="">...</a>}
                       pageNum={pageNo}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={()=>{this.gotoPage(pageNo)}}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
					   activeClassName={"active"} 
				
					   />
        </ToolbarGroup>
      </Toolbar>
    );
  }
  renderNewsItemTable(){
    let {news}=this.props;
    let tableRows=news.results.items.map((item,index)=>{
      return (
        <TableRow key={item.id} selected={news.selectedRowsIndex.indexOf(index) !== -1} >
            <TableRowColumn width={80}><a href='' onClick={(e)=>this.handleOnClickEditItem(e,item)}>{item.title}</a></TableRowColumn>
            <TableRowColumn width={80}>{item.author}</TableRowColumn>
            <TableRowColumn width={80}>{item.publicDate}</TableRowColumn>
            <TableRowColumn width={40}>上架</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Table multiSelectable={true} onRowSelection={this.handleOnRowSelection}>
        <TableHeader>
          <TableRow onCellClick={this.handleOnClickOrderBy}>
            <TableHeaderColumn  width={80} tooltip="点击可排序">标题 &bull;</TableHeaderColumn>
            <TableHeaderColumn width={80}>作者</TableHeaderColumn>
            <TableHeaderColumn width={80} tooltip="点击可排序">日期 &bull;</TableHeaderColumn>
            <TableHeaderColumn width={40}>状态</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {tableRows}
        </TableBody>
      </Table>
    );
  }
}

const downArraw='&darr;';
const upArraw='&uarr;';

const customContentStyle = {
  maxWidth: '300px',
};
