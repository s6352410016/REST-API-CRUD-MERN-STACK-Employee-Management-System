import {Route , Routes , Link} from 'react-router-dom';
import Employees from './components/employees';
import AddEmployee from './components/addemployee';
import UpdateEmployee from './components/updateemployee';

function App() {
  return (
    <>
      <Link to={'/'}></Link>
      <Routes>
        <Route path='/' element={<Employees/>}></Route>
        <Route path='/addemployee' element={<AddEmployee/>}></Route>
        <Route path='/update/:id' element={<UpdateEmployee/>}></Route>
      </Routes>
    </>
  );
}

export default App;