import './Navigator.css'
import profileImage from '../Images/profile.png';
import { ToDo, SelectedToDoGroup, SearchInfo } from '../../App';
import SearchImage from '../Images/search.png';
import SunImage from '../Images/sun.png';
import StarImage from '../Images/star.png';
import ToDoListImage from '../Images/to-do-list.png';


function Navigator(
	props : { 
		todoList: ToDo[], 
		selectedToDoGroup: SelectedToDoGroup, 
		setSelectedToDoGroup : React.Dispatch<React.SetStateAction<SelectedToDoGroup>>, 
		setSearchInfo: React.Dispatch<React.SetStateAction<SearchInfo>>
	}) {
	
	function getNumberOfUndoneToDo(f : (arg: ToDo) => boolean) {
		const l = props.todoList.filter(f).length;
		return l !== 0 ? l : '';
	}

	return (
		<div className='navigator'>
			<div className='user-profile'>
				<img src={profileImage} alt="user" />
				<div className='user-info'>
					<div className='user-name'>
						John Doe
					</div>
					<div className='user-email'>
						john.doe@example.com
					</div>
				</div>
			</div>
			<form className='search-bar' onSubmit={e => props.setSearchInfo({show: true, text : e.currentTarget.value})}>
				<input type="search" placeholder="Search" onChange={e => props.setSearchInfo({show: true, text : e.currentTarget.value})}/>
				<div className='search-symbol'>
					<img src={SearchImage} alt="search" />
				</div>
			</form>
			<div className='to-do-groups'>
				<div className={'to-do-group' + (props.selectedToDoGroup === SelectedToDoGroup.MY_DAY ? ' selected' : '')} 
					onClick={() => props.setSelectedToDoGroup(SelectedToDoGroup.MY_DAY)}> 
					<div className='to-do-group-marker'/>
					<div className='to-do-group-symbol'>
						<img src={SunImage} alt="my-day" />
					</div>
					<div className='to-do-group-title'>My Day</div>
					<div className='to-do-group-number-of-undone-to-do'>
						{getNumberOfUndoneToDo(e => !e.isDone && e.showInMyDay)}
					</div>
				</div>
				
				<div className={'to-do-group' + (props.selectedToDoGroup === SelectedToDoGroup.IMPORTANT ? ' selected' : '')} 
					onClick={() => props.setSelectedToDoGroup(SelectedToDoGroup.IMPORTANT)}> 
					<div className='to-do-group-marker'/>
					<div className='to-do-group-symbol'>
						<img src={StarImage} alt="important" />
					</div>
					<div className='to-do-group-title'>Important</div>
					<div className='to-do-group-number-of-undone-to-do'>
						{getNumberOfUndoneToDo(e => !e.isDone && e.isImportant)}
					</div>
				</div>
				
				<div className={'to-do-group' + (props.selectedToDoGroup === SelectedToDoGroup.TO_DO ? ' selected' : '')} 
					onClick={() => props.setSelectedToDoGroup(SelectedToDoGroup.TO_DO)}> 
					<div className='to-do-group-marker'/>
					<div className='to-do-group-symbol'>
						<img src={ToDoListImage} alt="to-do" />
					</div>
					<div className='to-do-group-title'>To-Do</div>
					<div className='to-do-group-number-of-undone-to-do'>
						{getNumberOfUndoneToDo(e => !e.isDone)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigator;