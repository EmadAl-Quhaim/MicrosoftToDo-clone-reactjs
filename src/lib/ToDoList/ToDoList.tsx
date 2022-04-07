import { useState } from 'react';
import { EditMenuInfo, getId, ReducerAction, ReducerActionTypes, SearchInfo, SelectedToDoGroup, ToDo } from '../../App';
import SunImage from '../Images/sun.png';
import StarImage from '../Images/star.png';
import ToDoListImage from '../Images/to-do-list.png';
import CircleImage from '../Images/dry-clean.png';
import PlusImage from '../Images/plus.png';
import CheckImage from '../Images/check.png';
import StarFilledImage from '../Images/star_filled.png';
import './ToDoList.css'

function ToDoList (
	props : { 
		todoList: ToDo[], 
		dispatch: React.Dispatch<ReducerAction>, 
		selectedToDoGroup: SelectedToDoGroup, 
		searchInfo: SearchInfo,
		setEditMenuInfo: React.Dispatch<React.SetStateAction<EditMenuInfo>>,
		setInputTextEditMenu: React.Dispatch<React.SetStateAction<string>>
	}) {

	/*--------------HEADER----------------*/
	const headerInfo = {
		0 : [SunImage, 'My Day'],
		1 : [StarImage, 'Important'],
		2 : [ToDoListImage, 'To-Do'],
	}; 

	function getHeader(): JSX.Element {
		if (props.selectedToDoGroup === SelectedToDoGroup.MY_DAY) {
			const date =  new Date();
			return (
				<div className='to-do-list-header-my-day'>
					<div className='to-do-list-header-my-day-info'>
						<div className='to-do-list-header-my-day-title'>
							{headerInfo[props.selectedToDoGroup][1]}
						</div>
						<div className='to-do-list-header-my-day-date'> {date.toLocaleString('en-US', {weekday: 'long', day: 'numeric', month: 'long'})} </div>
					</div>
			</div>
			)
		}
		return (
			<div className='to-do-list-header'>
				<img src={headerInfo[props.selectedToDoGroup][0]} alt="" />
				<div className='to-do-list-header-title'>
					{headerInfo[props.selectedToDoGroup][1]}
				</div>
			</div>
		)
	}

	/*--------------INPUT FIELD----------------*/
	const [isInputOnFocus, setIsInputOnFocus] = useState(false);
	const [inputText, setInputText] = useState('');
	function handleInput() {
		if (inputText.trim() !== '') {
			const newToDo = {
				id: getId(),
				title: inputText,
				isImportant: props.selectedToDoGroup === SelectedToDoGroup.IMPORTANT,
				isDone: false,
				showInMyDay: props.selectedToDoGroup === SelectedToDoGroup.MY_DAY
			}
			props.dispatch({type: ReducerActionTypes.ADD_TODO, payload: newToDo})
		}
		setInputText(() => '');
	}
	function getInputToDo(): JSX.Element {
		return (
			<form className='to-do-list-input-field' 
				style={isInputOnFocus ? { backgroundColor:'white'} : { backgroundColor:'#f0f0f0'}} 
				onSubmit={e => {e.preventDefault(); handleInput()}}>
				<div className='to-do-list-input-field-marker'>
					{isInputOnFocus ?
						<img src={CircleImage} alt="" /> :
						<img src={PlusImage} alt="" onClick={handleInput}/>
					}
				</div>
				<input type="text" 
					value={inputText}
					onFocus={() => setIsInputOnFocus(() => true)} 
					onBlur={() => setIsInputOnFocus(() => false)}
					onChange={(e) => setInputText(() => e.target.value)}/>
			</form>
		)
	}

	
	/*--------------SHOW TODO LIST----------------*/
	function checkToDo(element: ToDo) {
		if (props.searchInfo.show && props.searchInfo.text.trim() !== '') {
			return element.title.toLowerCase().includes(props.searchInfo.text.trim().toLowerCase())
		} else if ((props.selectedToDoGroup === SelectedToDoGroup.IMPORTANT && element.isImportant)
			|| (props.selectedToDoGroup === SelectedToDoGroup.MY_DAY && element.showInMyDay)
			|| props.selectedToDoGroup === SelectedToDoGroup.TO_DO) {
			return true;
		} 
		return false;
	}

	function showToDoList() {
		return (
			<div className='show-to-do-list'>
				{props.todoList.filter(e => checkToDo(e)).map(e => 
					<div className='to-do-element' key={e.id} onClick={() => {
						props.setInputTextEditMenu(e.title);
						props.setEditMenuInfo((el) => {
							return {show : !el.show, todo : e}
						});
					}}>
						<div className='to-do-element-marker to-do-element-done-marker'  onClick={(ev) => {
							ev.stopPropagation();
							props.dispatch({type: ReducerActionTypes.MARK_DONE, payload: e});
							props.setEditMenuInfo(el => {
								const newEditMenuInfo : EditMenuInfo = {show : el.show, todo : {...el.todo, isDone: !el.todo.isDone}};
								return newEditMenuInfo
							});
						}}>
							<img src={e.isDone ? CheckImage : CircleImage } alt=""/>
						</div>
						<div className='to-do-element-title'>
							{e.title}
						</div>
						<div className='to-do-element-marker' onClick={(ev) => {
							ev.stopPropagation();
							props.dispatch({type: ReducerActionTypes.MARK_IMPORTANT, payload: e});
							props.setEditMenuInfo(el => {
								const newEditMenuInfo : EditMenuInfo = {show : el.show, todo : {...el.todo, isImportant: !el.todo.isImportant}};
								return newEditMenuInfo
							});
						}}>
							<img src={e.isImportant ? StarFilledImage : StarImage} alt="" />
						</div>
					</div>
				)}
			</div>
		)
	}
	return (
		<div className='to-do-list'>
			{ getHeader() }
			{ showToDoList() }
			{ getInputToDo() }
		</div>
	)
}

export default ToDoList;