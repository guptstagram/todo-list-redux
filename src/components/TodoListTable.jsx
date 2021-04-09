import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {useDispatch,useSelector} from "react-redux";
import {todoAddAction,todoUpdateAction,todoDeleteAction} from "../actions/todoActions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height:"100vh",
        padding: theme.spacing(2),
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
    },
    table:{
    },
    taskDone:{
        textDecoration: "line-through",
    },
    paper: {
        width: '100%',
    },
    mBot:{
        marginBottom:theme.spacing(2),
    },
    mTop:{
        marginTop:theme.spacing(2),
    },
    todoForm: {
        display:"flex",
    },
    todoInput: {
        width: "100%",
        margin:theme.spacing(1),
    },
    addButton:{
        width:"fit-content",
        minWidth:"200px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin:theme.spacing(1),
        maxHeight:"56px",
    },
    pointer:{
        cursor:"pointer",
    },
    formControl: {
        minWidth:"200px",
        margin:theme.spacing(1),
    },
    fontBold:{
        fontWeight:"bold",
    },
    '@media screen and (max-width: 767px)': {
        table:{
        },
        todoForm: {
            flexWrap:"wrap",
        },
        formControl: {
          width:"100%",
        },
        addButton:{
            width:"100%",
        },
      },
}));

const TodoListTable=(props)=>{
    
    const classes = useStyles();
    const dispatch=useDispatch();
    const searchPaperRef = React.useRef();
    const formPaperRef = React.useRef();
    const tablePaperRef = React.useRef();
    const globalRows=useSelector(state=>state);
    const [rows,setRows]=React.useState(globalRows);
    const [todoInput,setToDoInput]=React.useState("");
    const [todoSearch,setToDoSearch]=React.useState("");
    const [todoFilter,setToDoFilter]=React.useState("all");
    const [todoError,setError] =React.useState({error:false,helperText:"Todo Already exist..."});

    React.useEffect(()=>{
        let searchPaperHeight=searchPaperRef.current.offsetHeight;
        let formPaperHeight=formPaperRef.current.offsetHeight;
        let windowHeight=window.innerHeight;
        tablePaperRef.current.style.height=`${windowHeight-formPaperHeight-searchPaperHeight-64}px`
        setRows(globalRows);
    },[globalRows]);

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(globalRows.filter(row=>row.todo===todoInput).length>0){
            setError({...todoError,error:true});
            return;
        }
        dispatch(todoAddAction(todoInput));
        setToDoInput("");
        setToDoSearch("");
        setToDoFilter("all");
        setRows(globalRows);
        setError({...todoError,error:false});
    }

    const handleDeleteTodo=(todo)=>{
        dispatch(todoDeleteAction(todo));
        setToDoSearch("");
        setToDoFilter("all");
        setRows(globalRows);
    }

    const handleUpdateTodo=(todo)=>{
        dispatch(todoUpdateAction(todo));
        setToDoSearch("");
        setToDoFilter("all");
        setRows(globalRows);
    }

    const handleTodoSearch=e=>{
        setToDoSearch(e.target.value);
        let filt=globalRows.filter(row=>{
            if(row.todo.toLowerCase().includes(e.target.value.toLowerCase()) && todoFilter==="all") return true;
            else if(row.todo.toLowerCase().includes(e.target.value.toLowerCase()) && row.completed && todoFilter==="completed") return true;
            else if(row.todo.toLowerCase().includes(e.target.value.toLowerCase()) && !row.completed && todoFilter==="notcompleted") return true;
            return false;
        });
        setRows(filt);
    }
    const handleSearchFilter=e=>{
        setToDoFilter(e.target.value);
        if(e.target.value==="all"){
            setRows(globalRows);
        }
        else if(e.target.value==="completed"){
            let filt=globalRows.filter(row=>row.completed);
            setRows(filt);
        }
        else if(e.target.value==="notcompleted"){
            let filt=globalRows.filter(row=>!row.completed);
            setRows(filt);
        }
    }
    const resetTodoList=()=>{
        setToDoSearch("");
        setToDoFilter("all");
        setRows(globalRows);
    }

    return(
        <div className={classes.root}>
            <Box>
            <Paper className={`${classes.paper} ${classes.mBot}`} ref={searchPaperRef}>
                <Box className={classes.todoForm}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="todo-filter-label">Filter Todo</InputLabel>
                        <Select
                            labelId="todo-filter-label"
                            id="todo-filter"
                            value={todoFilter}
                            onChange={handleSearchFilter}
                            label="Search Filter"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="notcompleted">Incomplete</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="search-todo" label="Search To Do Item" variant="outlined" className={classes.todoInput} value={todoSearch} onChange={handleTodoSearch}/>
                    <Button onClick={resetTodoList} variant="contained" color="primary" className={classes.addButton}>Reset</Button>
                </Box>
            </Paper>
            <TableContainer component={Paper} className={classes.table} ref={tablePaperRef}>
                <Table className={classes.table} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.fontBold}>Task</TableCell>
                            <TableCell className={classes.fontBold} align="right">Completed</TableCell>
                            <TableCell className={classes.fontBold} align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.todo}>
                                <TableCell component="th" scope="row" className={row.completed?classes.taskDone:null}>{row.todo}</TableCell>
                                <TableCell align="right" >{!row.completed?<ClearIcon onClick={()=>handleUpdateTodo(row.todo)} className={classes.pointer}/>:<DoneIcon onClick={()=>handleUpdateTodo(row.todo)} className={classes.pointer}/>}</TableCell>
                                <TableCell align="right" className={classes.pointer}><DeleteIcon onClick={()=>handleDeleteTodo(row.todo)} className={classes.pointer}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            <Paper className={`${classes.paper} ${classes.mTop}`} ref={formPaperRef}>
                <form className={classes.todoForm} onSubmit={handleFormSubmit}>
                    <TextField id="add-todo" label="Enter Task" variant="outlined" className={classes.todoInput} value={todoInput} onChange={(e)=>setToDoInput(e.target.value)} required {...todoError.error?todoError:null}/>
                    <Button type="submit" variant="contained" color="primary" className={classes.addButton}>Add Task</Button>
                </form>
            </Paper>
        </div>
    )
}

export default TodoListTable;