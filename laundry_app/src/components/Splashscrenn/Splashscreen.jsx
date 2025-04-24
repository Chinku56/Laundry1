// // import React, { useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import './Splashscreen.scss';

// // const Splashscreen = () => {


// //   return (
// //     <div className="splash-container">
// //       <div className="logo-wrapper">
// //         <div className="logo">🧺</div>
// //         <h1 className="brand-name">Wash-O-Matic</h1>
// //         <p className="tagline">We Wash, You Chill.</p>
// //       </div>
// //       {/* <Link to="/login"><button  className='tagname'>Get started</button></Link> */}
// //       <button  className='tagname'>Get Started</button>
// //     </div>
// //   );
// // };

// // export default Splashscreen;
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Splashscreen.scss';

// const Splashscreen = () => {
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const quotes = [
//     "Freshness Delivered, One Wash at a Time.",
//     "We Make Laundry Feel Like a Breeze.",
//     "Your Laundry, Our Priority. Let's Get Fresh!"
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuoteIndex((prev) => (prev + 1) % quotes.length);
//     }, 4000); // Change quote every 4 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="splash-container">
//       <div className="logo-wrapper">
//         <div className="logo">🧺</div>
//         <h1 className="brand-name">Wash-O-Matic</h1>
//         <p className="tagline">We Wash, You Chill.</p>
//       </div>

//       <div className="quote-container">
//         <p className="quote">{quotes[quoteIndex]}</p>
//       </div>

//       <button className='tagname'>Get Started</button>
//     </div>
//   );
// };

// export default Splashscreen;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Splashscreen.scss';

const Splashscreen = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [sparkleCount, setSparkleCount] = useState(0);
  const quotes = [
    "Freshness Delivered, One Wash at a Time.⏲️",
    "We Make Laundry Feel Like a Breeze.😍",
    "Your Laundry, Our Priority. Let's Get Fresh!.😘",
  ];

  // Simulate a dynamic sparkle count (this can be from props, data, etc.)
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate a dynamic increase in items, this could be based on any number.
    const interval = setInterval(() => {
      setSparkleCount(prev => prev + 1); // Increase sparkle count by 1
    }, 1000); // Every 1 second increases the sparkle count.

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-container">
      <div className="logo-wrapper">
        <div className="logo">🧺</div>
        <h1 className="brand-name">Wash-O-Matic</h1>
        <p className="tagline">We Wash, You Chill.</p>
      </div>

      <div className="quote-container">
        <p className="quote">{quotes[quoteIndex]}</p>
      </div>

      {/* 🥳 Icon with Sparkles */}
      <div className="celebration-container">
        <div className="emoji">
          🥳
        </div>
        <div className="sparkles">
          {Array.from({ length: sparkleCount }).map((_, i) => (
            <div className="sparkle" key={i}></div>
          ))}
        </div>
      </div>

      <button className='tagname'>Get Started</button>
    </div>
  );
};

export default Splashscreen;
