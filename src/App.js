import logo from './logo.svg';
import './App.css';
import {RouterProvider} from 'react-router-dom'
import router from './router'

function App() {
  return (
    <div calssName="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
