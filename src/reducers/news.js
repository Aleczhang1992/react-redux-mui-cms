import _ from 'lodash';

import {
  BROWSE_NEWS_ACTION,
  NEWS_LOADING_ACTION,
  NEWS_ITEM_LOADING_ACTION,
  BROWSE_NEWS_ITEM_ACTION,
  NEWS_ITEM_OPEN_EDIT_ACTION,
  NEWS_ITEM_CLOSE_EDIT_ACTION,
  SAVING_NEWS_ITEM_ACTION,
  SAVE_NEWS_ITEM_ERROR_ACTION,
  NEWS_SHOW_ALERT_ACTION,
  NEWS_REMOVE_ALERT_ACTION,
  SAVE_NEWS_ITEM_SUCCESS_ACTION,
  NEWS_ITEMS_SELECTED_ACTION,
  NEWS_ITEMS_DELETING_ACTION,
  NEWS_ITEMS_DELETED_ACTION,
  NEWS_ITEMS_DELETE_CONFIRM_ACTION,
  NEWS_ITEMS_DELETE_CANCEL_ACTION
} from '../actions/news';

export default function news(state = {}, action) {
	switch (action.type) {
		case BROWSE_NEWS_ACTION:
			return Object.assign({},state,{
				results:action.results,
				selectedRowsIndex:[],
				loaded:true
			});
		case NEWS_LOADING_ACTION:
			return Object.assign({},state,{
				loaded:false,
				loadingMessage:"加载新闻列表.."
			});
		case NEWS_ITEM_LOADING_ACTION:
			return Object.assign({},state,{
				loaded:false,
				loadingMessage:"加载新闻条目.."
			});
		case BROWSE_NEWS_ITEM_ACTION:
			return Object.assign({},state,{
				result:action.result,
				loaded:true
			});
		case NEWS_ITEM_OPEN_EDIT_ACTION:
			return Object.assign({},state,{
				currentNewsItemId:action.newsItemId,
				openNewsItemDialog:true
			});
		case NEWS_ITEM_CLOSE_EDIT_ACTION:
			return Object.assign({},state,{
				openNewsItemDialog:false,
				currentNewsItemId:null
			});
		case SAVING_NEWS_ITEM_ACTION:
			return Object.assign({},state,{
				loaded:false,
				loadingMessage:'保存新闻条目..'
			});
		case SAVE_NEWS_ITEM_ERROR_ACTION:
			return Object.assign({},state,{
				loaded:true
			});
		case SAVE_NEWS_ITEM_SUCCESS_ACTION:
			return Object.assign({},state,{
				loaded:true
			});
		case NEWS_SHOW_ALERT_ACTION:
			return Object.assign({},state,{
				alertMessage:action.alertMessage
			});
		case NEWS_REMOVE_ALERT_ACTION:
			return Object.assign({},state,{
				alertMessage:null
			});
		case NEWS_ITEMS_SELECTED_ACTION:
			let selectedRowsIndex=_.union([],action.selectedRowsIndex);
			return Object.assign({},state,{
				selectedRowsIndex:selectedRowsIndex
			});
		case NEWS_ITEMS_DELETING_ACTION:
			return Object.assign({},state,{
				loaded:false,
				loadingMessage:"删除新闻条目.."
			});
		case NEWS_ITEMS_DELETED_ACTION:
			return Object.assign({},state,{
				loaded:true
			});
		case NEWS_ITEMS_DELETE_CONFIRM_ACTION:
			return Object.assign({},state,{
				showDeleteConfirmDialog:true
			});
		case NEWS_ITEMS_DELETE_CANCEL_ACTION:
			return Object.assign({},state,{
				showDeleteConfirmDialog:false
			});
		default:
			// console.log('==>>reducer switch default? '+action.type);
			return state;
	}
}