const todoReducer=(state=[],action)=>{
    switch(action.type){
        case "ADD_TODO":
            return [...state,{todo:action.task,completed:false}];
        case "UPDATE_TODO":{
            let up=[...state];
            for(let i in up){
                if(up[i].todo===action.task) up[i].completed=!up[i].completed;
            }
            return up;
        }
        case "DELETE_TODO":{
            let up=state.filter(item=>item.todo!==action.task);
            return up;
        }
        default:
            return state;
    }
}

export default todoReducer;