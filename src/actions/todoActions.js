export const todoAddAction=(task)=>({
    type:"ADD_TODO",
    task:task,
})
export const todoUpdateAction=(task)=>({
    type:"UPDATE_TODO",
    task:task,
})
export const todoDeleteAction=(task)=>({
    type:"DELETE_TODO",
    task:task,
})