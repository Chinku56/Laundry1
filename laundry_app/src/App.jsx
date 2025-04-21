// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Pickup from './components/Pickupscheduler';
import OrderTracking from './components/Orderstatus';
import SplashScreen from './components/Splashscrenn/Splashscreen';
import Subscriptions from './components/Subscription/Subscription';
import PaymentPage from './components/Paymentpage/Paymentpage';
import Promotions from './components/Promotionalbanners/Promotionalbanners';
import Offers from './components/Promotionalbanners/Promotionalbanners';
import Servicehours from './components/Servicehours';

function App() {
  return (
    <Router>
    {/* <Subscriptions /> */}
      <Routes>
        Redirect root path to /pickup
           {/* <Route path="/" element={<SplashScreen />} /> */}
        {/* <Route path="/" element={<Navigate to="/pickup" replace />} /> */}

        Main routes
        {/* <Route path="/pickup" element={<Pickup />} />
        <Route path="/ordertracking" element={<OrderTracking />} /> */}
         <Route path="/" element={<Subscriptions />} />
         <Route path="/payment" element={<PaymentPage />} /> ✅ fixed usage
        {/* Catch-all route (optional)
        <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
      </Routes>
      {/* <Offers />
      <Servicehours /> */}
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
