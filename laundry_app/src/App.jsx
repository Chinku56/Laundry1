
import './App.scss';
// import { Routes, Route } from 'react-router-dom';
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
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Pickup from './components/Pickupscheduler';
// import OrderTracking from './components/Orderstatus';
// import SplashScreen from './components/Splashscrenn/Splashscreen';
// import Subscriptions from './components/Subscription/Subscription';
// import PaymentPage from './components/Paymentpage/Paymentpage';

import Offers from './components/Promotionalbanners/Promotionalbanners';
// import Servicehours from './components/Servicehours';
import LoginPage from './pages/Login'
import Signup from './pages/Signup'
import Subscriptions from './components/Subscription/Subscription';
import Servicehours from './components/Servicehours';
import Accountpage from './pages/Account';
import PaymentPage from './components/Paymentpage/Paymentpage';

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
          <Route path='/Offers' element={<Offers/>}/>
          <Route path="/Subscriptions" element={<Subscriptions />} />
          <Route path="/Servicehours" element={<Servicehours />} />
          <Route path="/Accountpage" element={<Accountpage />} />
          <Route path="/payment" element={<PaymentPage />} /> ✅ fixed usage
          
          // Redirect root path to /pickup
           {/* <Route path="/" element={<SplashScreen />} /> */}
        {/* <Route path="/" element={<Navigate to="/pickup" replace />} /> */}

        Main routes
        {/* <Route path="/pickup" element={<Pickup />} />
        <Route path="/ordertracking" element={<OrderTracking />} /> */}
         {/* <Route path="/Subscriptions" element={<Subscriptions />} /> */}
        
         {/* <Route path='/login'element={<LoginPage/>} />
        <Route path='/signup' element={<Signup/>} /> */}
        {/* Catch-all route (optional)
        <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
        </Routes>
      </div>
    </CartProvider>)
}
export default App;