import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

require("!style!css!./main.css") 


/* 2016.10.30 
預期實作功能:
1.從父元件傳遞資料，不要繞一圈
2.能新增項目
3.能移除項目
4.項目能排序(優先順序)
5.能顯示新增時間
6.完成可以打勾 
7.可以劃掉完成項目
*/

class App extends React.Component {
  	constructor(props) {
    	super(props);
    	this._inputText = this._inputText.bind(this);
    	this._renderList = this._renderList.bind(this);
    	this._handleDelete = this._handleDelete.bind(this);
    	this._handleEdit = this._handleEdit.bind(this);
    	this.state = {
    		items: [],
    		text:"",
    	};
  	}
  	_inputText(e){
  		this.setState({
  			text: e.target.value,
  		});
  	}	
 	_renderList(e){	
 		e.preventDefault();
 		const new_items = this.state.items.concat(
 			[{
 				text: this.state.text,
 				edit: false,
 			}]
 		);
 		//清空輸入框
 		this.setState({
 			items: new_items,
 			text: "",	
 		});
 	}
 	_handleDelete(index,e){
 		e.preventDefault();	
 		const arr = this.state.items.slice();
 		arr.splice(index,1);
 		this.setState({
 			items: arr,
 		});
 	
 	}
 	_handleEdit(index,e){
 		e.preventDefault();
 		const arr = this.state.items.slice();
 		arr[index].edit = true;
 		this.setState({
 			items: arr,
 		});
 	}
  	render() {  
  		const item_arr = this.state.items;
		const todo_item = item_arr.map(function(value,index){
			let num = index+1;
			return(
				<li className="todo-item" key={index}>	
					<div className="text">				
						<span className={value.edit?"hidden":""}>{num+". "+value.text}</span>
						<s className={value.edit?"":"hidden"}>{num+". "+value.text}</s>
					</div>
					<div className="btn-group">
						<input className="todo-finish"
								type="button"
								value="完成"
								onClick={this._handleEdit.bind(null,index)}>
						</input>
						<input className="todo-delete" 
								type="button" 
								value="刪除" 
								onClick={this._handleDelete.bind(null,index)}>
						</input>
					</div>
					<div className="time">
						<span>這裡會顯示時間</span>
					</div>
				</li>
			);
		}.bind(this));

    	return (
	      	<div className="container">
	        	<h1>Reactjs: My todolist</h1>
	        	<form>
		            <input type="text" 
		            		value={this.state.text} 
		            		onChange={this._inputText}>
		            </input>
		        	<input type="button" 
		        			defaultValue="新增" 
		        			onClick={this._renderList}>
		        	</input>
		        </form>
		        <ul>{todo_item}</ul>
		    </div>
    	);
  	}
}

ReactDOM.render(<App />, document.getElementById('app'));