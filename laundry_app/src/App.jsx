import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Navbar from './components/NavBar';
import Slider from './components/Slider';
import WhyLaundryMate from './components/WhyLaundryMate';
import Services from './components/Services';
import WashFoldPrices from './components/WashFoldPrices';
import Footer from './components/Footer';
import Cart from './components/Cart';
import WashIron from './components/WashIron';
import SteamIron from './components/SteamIron';
import DryClean from './components/DryClean';
import OurProcess from './components/OurProcess'

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
              <>
                <Slider />
                <OurProcess/>
                <WhyLaundryMate />
                <Services />  
                <Footer />
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path='/washfoldprices' element={<WashFoldPrices/>} />
          <Route path='/washiron' element={<WashIron/>}/>
          <Route path='/steamiron' element={<SteamIron/>}/>
          <Route path='/dryclean' element={<DryClean/>}/>
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
