import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ShipList from './components/ShipList';
import AddShip from './components/AddShip';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element ={<ShipList/>} />
            <Route path="/AddShip" element ={<AddShip/>} />
            <Route path="/AddShip/:id" element ={<AddShip/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
