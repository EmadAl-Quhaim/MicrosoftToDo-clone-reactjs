import { Reducer, useReducer, useState } from 'react';
import Navigator from './lib/Navigator/Navigator';
import ToDoList from './lib/ToDoList/ToDoList';
import EditMenu from './lib/EditMenu/EditMenu';
import './App.css';

export interface ToDo {
	id: string,
	title: string,
	date?: Date,
	isImportant: boolean,
	isDone: boolean,
	showInMyDay: boolean
}

export enum ReducerActionTypes {
	ADD_TODO,
	MARK_IMPORTANT,
	MARK_DONE,
	SHOW_IN_MY_DAY,
	EDIT_TITLE,
	DELETE
}

export interface ReducerAction {
	type: ReducerActionTypes,
	payload: ToDo
}

export interface SearchInfo {
	show: boolean,
	text: string
}

export enum SelectedToDoGroup {
	MY_DAY,
	IMPORTANT,
	TO_DO
} 

export interface EditMenuInfo {
	show: boolean,
	todo: ToDo
}

const reducer : Reducer<ToDo[], ReducerAction> = (state: ToDo[], action: ReducerAction) => {
	switch (action.type) {
		case ReducerActionTypes.ADD_TODO:
			return [...state, action.payload];
		case ReducerActionTypes.MARK_IMPORTANT:
			return state.map(e => e.id === action.payload.id ? {...e, isImportant: !e.isImportant} : e);
		case ReducerActionTypes.MARK_DONE:
			return state.map(e => e.id === action.payload.id ? {...e, isDone: !e.isDone} : e);
		case ReducerActionTypes.SHOW_IN_MY_DAY:
			return state.map(e => e.id === action.payload.id ? {...e, showInMyDay: !e.showInMyDay} : e);
		case ReducerActionTypes.EDIT_TITLE:
			return state.map(e => e.id === action.payload.id ? {...e, title: action.payload.title} : e);
		case ReducerActionTypes.DELETE:
			return state.filter(e => e.id !== action.payload.id);
		default:
			return state;
	}
};

export function getId() {
  return `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`;
}

function App() {
	const [todoList, dispatch] =	useReducer(reducer, []);
	const [selectedToDoGroup, setSelectedToDoGroup] = useState<SelectedToDoGroup>(SelectedToDoGroup.MY_DAY);
	const [searchInfo, setSearchInfo] = useState<SearchInfo>({ show: false, text: ''});
	const [editMenuInfo, setEditMenuInfo] = useState<EditMenuInfo>({ show: false, todo: {id: 'id', title: 'title', isImportant: false, isDone: false, showInMyDay: false}});
	const [inputTextEditMenu, setInputTextEditMenu] = useState('');

	return (
			<div className="App" 
				onContextMenu={e => e.preventDefault()}>
				<Navigator 
					todoList={todoList} 
					selectedToDoGroup={selectedToDoGroup} 
					setSelectedToDoGroup={setSelectedToDoGroup} 
					setSearchInfo={setSearchInfo}/>
				<ToDoList 
					todoList={todoList} 
					dispatch={dispatch} 
					selectedToDoGroup={selectedToDoGroup} 
					searchInfo={searchInfo}
					setEditMenuInfo={setEditMenuInfo}
					setInputTextEditMenu={setInputTextEditMenu}/>
				<EditMenu 
					dispatch={dispatch} 
					selectedToDoGroup={selectedToDoGroup}
					editMenuInfo={editMenuInfo}
					setEditMenuInfo={setEditMenuInfo}
					inputTextEditMenu={inputTextEditMenu}
					setInputTextEditMenu={setInputTextEditMenu}/>
			</div>
	);
}

export default App;