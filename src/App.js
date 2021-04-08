import { ThemeProvider } from '@material-ui/core';
import TodoListTable from './components/TodoListTable';
import theme from "./theme";

const App=()=>{
  return(
    <ThemeProvider theme={theme}>
      <TodoListTable/>
    </ThemeProvider>
  )
}

export default App;