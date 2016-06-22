// actionCreators
// import fetch from 'isomorphic-fetch';
import {initialize,reset} from 'redux-form';
import { push } from 'react-router-redux';

import {fields} from '../components/news/NewsItemForm';

export const BROWSE_NEWS_ACTION = 'BROWSE_NEWS_ACTION';

const MOCK_DELAY=0;//TODO 取消这部分？

// 创建新闻条目 POST /api/news/item
// 修改新闻条目 PUT  /api/news/item/:id  
// 加载新闻条目 GET  /api/news/item/:id
// 批量删除    POST /api/news/items/delete
// 翻页浏览    GET  /api/news/items/:pageNo/:orderBy/:isDesc


export function browseNews(pageNo=1){
  return (dispatch, getState) => {
    dispatch(getNewsLoadingAction());
    dispatch(push(`/news/browse/${pageNo}`));
    setTimeout(()=>{
      fetch(`/api/news/browse/${pageNo}.json`)
        .then(response=>response.json())
        .then(json=>{
           dispatch(getNewsAction(json));
        });
    },MOCK_DELAY);
  };
}

function getNewsAction(results){
  return {
    type:BROWSE_NEWS_ACTION,
    results:results
  };
}

export const NEWS_LOADING_ACTION = 'NEWS_LOADING_ACTION';

function getNewsLoadingAction(){
  return {
    type:NEWS_LOADING_ACTION
  }
}

export const NEWS_ITEM_LOADED_ACTION = 'NEWS_ITEM_LOADED_ACTION';
export const NEWS_ITEM_LOADING_ACTION = 'NEWS_ITEM_LOADING_ACTION';
export const BROWSE_NEWS_ITEM_ACTION = 'BROWSE_NEWS_ITEM_ACTION';

export function loadNewsItem(id){
  return (dispatch, getState) => {
    dispatch(getNewsItemLoadingAction());
    setTimeout(()=>{
      fetch(`/api/news/items/1.json`)
        .then(response=>response.json())
        .then(json=>{
		   json.item.date=new Date(json.item.date);
           dispatch(initialize('newsItemForm', json.item,fields));
           dispatch(getNewsItemAction(json));//TODO 简化

        });
    },MOCK_DELAY);
  };
}

function getNewsItemAction(result){
  return {
    type:BROWSE_NEWS_ITEM_ACTION,
    result:result
  };
}

function getNewsItemLoadingAction(){
  return {
    type:NEWS_ITEM_LOADING_ACTION
  }
}

export const NEWS_ITEM_OPEN_EDIT_ACTION='NEWS_ITEM_OPEN_EDIT_ACTION';
export function openNewsItemEditDialog(newsItemId){
  return {
    type:NEWS_ITEM_OPEN_EDIT_ACTION,
    newsItemId:newsItemId
  }
}

export const NEWS_ITEM_CLOSE_EDIT_ACTION='NEWS_ITEM_CLOSE_EDIT_ACTION';
export function closeNewsItemEditDialog(){
  return {
    type:NEWS_ITEM_CLOSE_EDIT_ACTION
  };
}

export function saveNewsItem(newsItem){
  return (dispatch, getState) => {
    const {pageNo}=getState().rootReducer.news.results;
    dispatch(savingNewsItemAction());
    setTimeout(()=>{
      let url, method;
      if(!newsItem.id){//create, post
        url='/api/news/items';
        method='POST'
      }else{//update, put
        url=`/api/news/items/${newsItem.id}`;
        method='PUT'
      }

      url='/api/news/items/1.json';
      method='GET';

      // 测试用
      fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(newsItem)
      })
      .then((response)=>{
        if(!(response.status >= 200 && response.status < 300)){
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response.json();
      })
      .then((json)=>{
        dispatch(showAlertAction('保存新闻条目成功'));
        dispatch(closeNewsItemEditDialog());
        dispatch(saveNewsItemSuccessAction(json.newsItemId));
        dispatch(browseNews(pageNo));
      })
      .catch((error)=>{
        dispatch(showAlertAction('保存新闻条目错误'));
        dispatch(saveNewsItemErrorAction());
      });
    },MOCK_DELAY);
  };
}

export const SAVING_NEWS_ITEM_ACTION='SAVING_NEWS_ITEM_ACTION';
function savingNewsItemAction(){
  return {
    type:SAVING_NEWS_ITEM_ACTION
  };
}

export const SAVE_NEWS_ITEM_ERROR_ACTION='SAVE_NEWS_ITEM_ERROR_ACTION';
function saveNewsItemErrorAction(){
  return {
    type:SAVE_NEWS_ITEM_ERROR_ACTION
  };
}

export const SAVE_NEWS_ITEM_SUCCESS_ACTION='SAVE_NEWS_ITEM_SUCCESS_ACTION';
function saveNewsItemSuccessAction(newsItemId){
  return {
    type:SAVE_NEWS_ITEM_SUCCESS_ACTION,
    newsItemId:newsItemId
  };
}

export const NEWS_SHOW_ALERT_ACTION='NEWS_SHOW_ALERT_ACTION';
export function showAlertAction(alertMessage){
  return {
    type:NEWS_SHOW_ALERT_ACTION,
    alertMessage:alertMessage
  };
}

export const NEWS_REMOVE_ALERT_ACTION='NEWS_REMOVE_ALERT_ACTION';
export function removeAlertAction(){
  return {
    type:NEWS_REMOVE_ALERT_ACTION
  };
}


export const NEWS_ITEMS_SELECTED_ACTION='NEWS_ITEMS_SELECTED_ACTION';
export function newsItemSelectedAction(selectedRowsIndex){
  return {
    type:NEWS_ITEMS_SELECTED_ACTION,
    selectedRowsIndex:selectedRowsIndex
  };
}

export function deleteNewsItems(items){
  return (dispatch, getState) => {
    const {pageNo}=getState().rootReducer.news.results;
    dispatch(deletingNewsItems());
    dispatch(cancelDeleteConfirmDialog());
    setTimeout(()=>{
        // 测试用
        fetch('/api/news/items/1.json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(newsItem)
        })
        .then((response)=>{
          return response.json();
        })
        .then((json)=>{
          dispatch(showAlertAction('删除新闻条目成功'));
          dispatch(deletedNewsItems());
          dispatch(browseNews(pageNo));
        })
        .catch((error)=>{
         // TODO
        });
    },MOCK_DELAY);
  }
}

export const NEWS_ITEMS_DELETING_ACTION='NEWS_ITEMS_DELETING_ACTION';
function deletingNewsItems(){
  return {
    type:NEWS_ITEMS_DELETING_ACTION
  }
}

export const NEWS_ITEMS_DELETED_ACTION='NEWS_ITEMS_DELETED_ACTION';
function deletedNewsItems(){
  return {
    type:NEWS_ITEMS_DELETED_ACTION
  }
}

export const NEWS_ITEMS_DELETE_CONFIRM_ACTION='NEWS_ITEMS_DELETE_CONFIRM_ACTION';
export function showDeleteConfirmDialog(){
  return {
    type:NEWS_ITEMS_DELETE_CONFIRM_ACTION
  }
}

export const NEWS_ITEMS_DELETE_CANCEL_ACTION='NEWS_ITEMS_DELETE_CANCEL_ACTION';
export function cancelDeleteConfirmDialog(){
  return {
    type:NEWS_ITEMS_DELETE_CANCEL_ACTION
  }
}




