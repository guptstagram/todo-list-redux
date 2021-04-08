import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height:"100vh",
        padding: theme.spacing(4),
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
    },
    taskDone:{
        textDecoration: "line-through",
    },
    paper: {
        width: '100%',
        marginTop:theme.spacing(4),
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
    },
    pointer:{
        cursor:"pointer",
    }
}));
  
  const rows = [
      {todo:"YEH KAR",completed:true},
      {todo:"YEH KAR",completed:false},
      {todo:"YEH KAR",completed:false},
      {todo:"YEH KAR",completed:true},
      {todo:"YEH KAR",completed:false},
  ];

const TodoListTable=()=>{
    
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Completed</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.todo}>
                                <TableCell component="th" scope="row" className={row.completed?classes.taskDone:null}>{row.todo}</TableCell>
                                <TableCell align="right" className={classes.pointer}>{row.completed?<ClearIcon/>:<DoneIcon/>}</TableCell>
                                <TableCell align="right" className={classes.pointer}><DeleteIcon/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper className={classes.paper}>
                    <form className={classes.todoForm}>
                        <TextField id="add-todo" label="Enter Task" variant="outlined" className={classes.todoInput} required/>
                        <Button type="submit" variant="contained" color="primary" className={classes.addButton}>Add Task</Button>
                    </form>
            </Paper>
        </div>
    )
}

export default TodoListTable;