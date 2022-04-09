import { EditMenuInfo, ReducerAction, ReducerActionTypes, SelectedToDoGroup } from '../../App';
import SunImage from '../Images/sun.png';
import StarImage from '../Images/star.png';
import StarFilledImage from '../Images/star_filled.png';
import DeleteImage from '../Images/delete.png';
import CircleImage from '../Images/dry-clean.png';
import CheckImage from '../Images/check.png';
import './EditMenu.css'

function EditMenu(props : { 
  dispatch: React.Dispatch<ReducerAction>, 
  selectedToDoGroup: SelectedToDoGroup, 
  editMenuInfo: EditMenuInfo,
  setEditMenuInfo: React.Dispatch<React.SetStateAction<EditMenuInfo>>,
  inputTextEditMenu: string,
  setInputTextEditMenu: React.Dispatch<React.SetStateAction<string>>}) {

  function handleInput() {
    if (props.inputTextEditMenu.trim() !== '' && props.editMenuInfo.todo !== undefined) {
      const newToDo = {...props.editMenuInfo.todo, title:props.inputTextEditMenu};
      props.dispatch({type: ReducerActionTypes.EDIT_TITLE, payload: newToDo})
    }
  }
  
  return (
    <div className='edit-menu' style={props.editMenuInfo.show ? {display:'flex'} : {display:'none'}}>
      <form className='edit-menu-box edit-menu-box-margin-top-40' 
				onSubmit={e => {e.preventDefault(); handleInput()}}>
				<div className='edit-menu-box-marker edit-menu-box-done-marker'>
          <img src={props.editMenuInfo.todo.isDone ? CheckImage : CircleImage } alt="" onClick={() => {
            props.dispatch({type: ReducerActionTypes.MARK_DONE, payload: props.editMenuInfo.todo});
            props.setEditMenuInfo((e) => {
              const newEditMenuInfo : EditMenuInfo = {show : e.show, todo : {...e.todo, isDone: !e.todo.isDone}};
              return newEditMenuInfo
            });
          }}/>
				</div>
				<input type="text" 
					value={props.inputTextEditMenu}
					onChange={(e) => props.setInputTextEditMenu(e.target.value)}
          onBlur={handleInput}/>
        <div className='edit-menu-box-marker' onClick={() => {
          props.dispatch({type: ReducerActionTypes.MARK_IMPORTANT, payload: props.editMenuInfo.todo});
          props.setEditMenuInfo((e) => {
            const newEditMenuInfo : EditMenuInfo = {show : e.show, todo : {...e.todo, isImportant: !e.todo.isImportant}};
            return newEditMenuInfo
        })}}>
          <img src={props.editMenuInfo.todo.isImportant ? StarFilledImage : StarImage} alt="" />
        </div>
			</form>
      <div className='edit-menu-box' onClick={() => props.dispatch({type: ReducerActionTypes.SHOW_IN_MY_DAY, payload: props.editMenuInfo.todo})}> 
        <div className='edit-menu-box-marker'>
          <img src={SunImage} alt="" />
        </div>
        Add to my-day
      </div>
      <div className='edit-menu-box edit-menu-box-delete' onClick={() => props.dispatch({type: ReducerActionTypes.DELETE, payload: props.editMenuInfo.todo})}> 
        <div className='edit-menu-box-marker'>
          <img src={DeleteImage} alt="" />
        </div>
        Delete this To-Do
      </div>
    </div>
  )
}

export default EditMenu;