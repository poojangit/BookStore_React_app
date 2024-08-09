
import './App.css';
import NavBar from './components/navbar/NavBar';
import Login from './pages/Login/Login';
import Router from './router/Router';



function App() {
  return (
    <>
      <div className='App'>
        {/* <Login/> */}
        {/* <SignUp/> */}
        <Router />
        {/* <NavBar/> */}
      </div>
    </>

  );
}

export default App;
