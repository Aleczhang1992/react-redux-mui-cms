import React, { Component,PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Colors from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {reduxForm} from 'redux-form';

import {
  closeNewsItemEditDialog,
  loadNewsItem,
  saveNewsItem
} from '../../actions/news';
export const fields = ['id','title','author','date','content'];


class NewsItemFormImpl extends Component{
  static contextTypes={
    dispatch: React.PropTypes.func.isRequired
  }

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.handleDialogClose=this.handleDialogClose.bind(this);
  }
  handleDialogClose(){
    this.context.dispatch(closeNewsItemEditDialog());
  }
  componentDidMount(){
    const {
      currentNewsItemId
    } = this.props;
    if(currentNewsItemId){
      this.context.dispatch(loadNewsItem(currentNewsItemId));  
    }

  }
  render(){
     const {
      currentNewsItemId,
      handleDialogClose,
      fields:{title,author,date,content},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;
    const actions = [
      <FlatButton
        label="取消"
        secondary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="提交"
        primary={true}
        keyboardFocused={true}
        onTouchTap={handleSubmit((data)=>{
          this.context.dispatch(saveNewsItem(data));
        })}
        type="submit"
        className="button-submit"
      />,
    ];
    let dialogTitle=!currentNewsItemId?'创建新闻条目':'修改新闻条目';
    return (
      <Dialog
        title={dialogTitle}
        modal={false}
        open={true}
        actions={actions}
        onRequestClose={handleDialogClose}
      >
        <form>
            <div>
              <TextField
                id="newsTitle"
                floatingLabelText="标题"
                hintText="标题"
                fullWidth={true}
                {...title}
  
                errorText={title.touched && title.error}
              /><br/>
              <TextField
                floatingLabelText="作者"
                hintText="作者"
                {...author}
    
              /><br/>
              <DatePickerWrapper hintText="日期" floatingLabelText="日期" autoOk={true} {...date}/>
              <TextField
                hintText="正文"
                floatingLabelText="正文"
                multiLine={true}
                fullWidth={true}
                rows={10}
                rowsMax={15}
                {...content}
              /><br/><br/>
            </div>
          </form>
        </Dialog>
    );
  }
}

export const NewsItemForm = reduxForm({
  form: 'newsItemForm',
  fields,
  validate:validateForm
})(NewsItemFormImpl);

function validateForm(data){
  const errors = {}; 
  if(!data.title || data.title.length==0) {
    errors.title = '必填项';
  }
  return errors;
}

class DatePickerWrapper extends Component {
  onChange(evt, date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }
  render() {
    return <DatePicker {...this.props} onChange={this.onChange.bind(this)}/>
  }
}