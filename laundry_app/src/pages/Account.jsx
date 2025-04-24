// import React, { useState, useEffect } from 'react';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import './Account.scss';
// import { Link } from 'react-router-dom';

// const indianCities = [
//   'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
//   'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow'
// ];

// const Accountpage = () => {
//   const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('profile')) || { name: 'John Doe', email: 'john@example.com' });
//   const [editing, setEditing] = useState(false);
//   const [newSlot, setNewSlot] = useState('');
//   const [timeSlots, setTimeSlots] = useState(() => JSON.parse(localStorage.getItem('timeSlots')) || ['Monday – 10:00 AM to 5:00 PM', 'Tuesday– 10:00 AM to 5:00 PM']);
//   const [preferences, setPreferences] = useState(() => JSON.parse(localStorage.getItem('preferences')) || { detergent: 'Regular', fragrance: localStorage.getItem('fragrance') || 'Lavender' });
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('addresses')) || []);
//   const [newAddress, setNewAddress] = useState('');
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [profileUpdated, setProfileUpdated] = useState(false);
//   const [serviceHistory, setServiceHistory] = useState(() => JSON.parse(localStorage.getItem('serviceHistory')) || [
//     { service: 'Laundry Pickup', date: '2025-04-15', status: 'Completed' },
//     { service: 'Laundry Delivery', date: '2025-04-14', status: 'Pending' }
//   ]);

//   useEffect(() => localStorage.setItem('profile', JSON.stringify(profile)), [profile]);
//   useEffect(() => localStorage.setItem('timeSlots', JSON.stringify(timeSlots)), [timeSlots]);
//   useEffect(() => localStorage.setItem('preferences', JSON.stringify(preferences)), [preferences]);
//   useEffect(() => localStorage.setItem('addresses', JSON.stringify(addresses)), [addresses]);
//   useEffect(() => localStorage.setItem('serviceHistory', JSON.stringify(serviceHistory)), [serviceHistory]);

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveProfile = () => {
//     setEditing(false);
//     setProfileUpdated(true);
//     setTimeout(() => setProfileUpdated(false), 3000);
//   };

//   const handleAddSlot = () => {
//     if (newSlot.trim() !== '') {
//       setTimeSlots([...timeSlots, newSlot.trim()]);
//       setNewSlot('');
//     }
//   };

//   const handleRemoveSlot = (index) => {
//     const updated = [...timeSlots];
//     updated.splice(index, 1);
//     setTimeSlots(updated);
//   };

//   const handlePreferenceChange = (e) => {
//     const { name, value } = e.target;
//     setPreferences((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmitPreferences = () => {
//     localStorage.setItem('detergent', preferences.detergent);
//     localStorage.setItem('fragrance', preferences.fragrance);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const handleAddAddress = () => {
//     if (newAddress && !addresses.includes(newAddress)) {
//       setAddresses([...addresses, newAddress]);
//       setNewAddress('');
//       setAddressSaved(true);
//       setTimeout(() => setAddressSaved(false), 3000);
//     }
//   };

//   const handleRemoveAddress = (index) => {
//     const updated = [...addresses];
//     updated.splice(index, 1);
//     setAddresses(updated);
//   };
//   return (
   
//     <div className="account-container">
//       <h2>User Account</h2>
//     <Link to ="/home"> <button className='Back1'>Back</button></Link>


//       <section className="section profile">
//         <h3>👤 Profile Info</h3>
//         {editing ? (
//           <>
//             <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
//             <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
//             <button className="btn primary" onClick={handleSaveProfile}>Save</button>
//           </>
//         ) : (
//           <>
//             <div className="info-row">
//               <span><strong>Name:</strong> {profile.name}</span>
//               <span><strong>Email:</strong> {profile.email}</span>
//             </div>
//            <Link> <button className="btn primary" onClick={() => setEditing(true)}>Edit Profile</button></Link>
//           </>
//         )}
//       </section>

//       <section className="section address-book">
//         <h3>📍 Address Book</h3>
//         <div className="address-form">
//           <select value={newAddress} onChange={(e) => setNewAddress(e.target.value)}>
//             <option value="">Select City</option>
//             {indianCities.map((city, i) => (
//               <option key={i} value={city}>{city}</option>
//             ))}
//           </select>
//           <button className="btn primary" onClick={handleAddAddress}>Add Address</button>
//         </div>
//         <ul>
//           {addresses.map((addr, index) => (
//             <li key={index}>
//               {addr}
//               <button className="btn small danger" onClick={() => handleRemoveAddress(index)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section className="section time-slots">
//         <h3>⏰ Saved Time Slots</h3>
//         <ul>
//           {timeSlots.map((slot, index) => (
//             <li key={index}>
//               {slot}
//               <button className="btn small" onClick={() => handleRemoveSlot(index)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//         <div className="slot-form">
//           <input type="text" placeholder="e.g., Friday – 5:00 PM" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} />
//           <button className="btn secondary" onClick={handleAddSlot}>+ Add Slot</button>
//         </div>
//       </section>

//       <section className="section preferences">
//         <h3>🧺 Laundry Preferences</h3>
//         <form>
//           <label>
//             Detergent Type:
//             <select name="detergent" value={preferences.detergent} onChange={handlePreferenceChange}>
//               <option>Regular</option>
//               <option>Organic</option>
//               <option>Hypoallergenic</option>
//             </select>
//           </label>

//           <label>
//             Fragrance:
//             <select name="fragrance" value={preferences.fragrance} onChange={handlePreferenceChange}>
//               <option>Lavender</option>
//               <option>Unscented</option>
//               <option>Lemon Fresh</option>
//             </select>
//           </label>
//         </form>
//         <button className="btn success" onClick={handleSubmitPreferences}>Submit Preferences</button>
//       </section>

//       <section className="section service-history">
//         <h3>🧺 Service History</h3>
//        <Link to ="/Pastorder" className='Back2'> <button className='Back2'>View Past Orders</button></Link>
//       </section>
      
//       {showSuccess && <div className="toast-success slide-in">🎉 Preferences submitted successfully!</div>}
//       {addressSaved && <div className="toast-success slide-in">🏠 Address saved successfully!</div>}
//       {profileUpdated && <div className="toast-success slide-in">✅ Your profile was updated!</div>}
//     </div>
//   );
// };

// export default Accountpage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Account.scss';

const cityData = {
  Hyderabad: {
    Madhapur: '500081',
    'Banjara Hills': '500034',
    Gachibowli: '500032',
    Kondapur: '500084',
  },
  Bangalore: {
    Koramangala: '560034',
    Whitefield: '560066',
    'HSR Layout': '560102',
    Indiranagar: '560038',
  },
  Mumbai: {
    Andheri: '400053',
    Bandra: '400050',
    Colaba: '400005',
  },
  Delhi: {
    Dwarka: '110075',
    Saket: '110017',
    'Karol Bagh': '110005',
  },
  Chennai: {
    Adyar: '600020',
    'T. Nagar': '600017',
    Velachery: '600042',
  },
};

const AccountPage = () => {
  const defaultEmail = 'admin@gmail.com';
  const defaultName = 'admin';
  const defaultAddress = 'Hyderabad, Madhapur, 500081';
  const defaultClubMembership = '1 month plan 😍';
  const defaultExpiryDate = '31/05/2025';

  const [profile, setProfile] = useState(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile')) || {};
    return {
      name: defaultName,
      email: defaultEmail,
      password: '',
      ...savedProfile,
    };
  });

  const [editing, setEditing] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileUpdated, setProfileUpdated] = useState(false);

  const [selectedCity, setSelectedCity] = useState(() => localStorage.getItem('selectedCity') || '');
  const [selectedArea, setSelectedArea] = useState(() => localStorage.getItem('selectedArea') || '');
  const [pincode, setPincode] = useState(() => localStorage.getItem('pincode') || '');
  const [addressSaved, setAddressSaved] = useState(false);
  const [addressRemoved, setAddressRemoved] = useState(false);

  useEffect(() => {
    const updatedProfile = {
      ...profile,
      name: defaultName,
      email: defaultEmail,
    };
    localStorage.setItem('profile', JSON.stringify(updatedProfile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity);
    setSelectedArea('');
    setPincode('');
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedArea) {
      const pin = cityData[selectedCity][selectedArea];
      setPincode(pin);
    }
  }, [selectedArea]);

  const handlePasswordSave = () => {
    if (tempPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setProfile(prev => ({
      ...prev,
      password: tempPassword
    }));

    setEditing(false);
    setTempPassword('');
    setConfirmPassword('');
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  const handleSaveAddress = () => {
    if (selectedCity && selectedArea && pincode) {
      localStorage.setItem('selectedArea', selectedArea);
      localStorage.setItem('pincode', pincode);
      setAddressSaved(true);
      setAddressRemoved(false);
      setTimeout(() => setAddressSaved(false), 3000);
    }
  };

  const handleRemoveAddress = () => {
    setSelectedCity('');
    setSelectedArea('');
    setPincode('');
    setAddressRemoved(true);
  };

  return (
    <div className="account-container page-fade">
      <h2 className='account'>USER ACCOUNT</h2>
      <Link to="/home"><button className='Back1'>Back</button></Link>

      {/* Profile Section */}
      <div className="section-container slide-up">
        <section className="section profile">
          <h3>👤 Profile Info</h3>
          {editing ? (
            <>
              <input type="text" value={profile.name} readOnly />
              <input type="email" value={profile.email} readOnly />
              <input type="password" placeholder="Enter password" value={tempPassword} onChange={(e) => setTempPassword(e.target.value)} />
              <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button className="btn small primary" onClick={handlePasswordSave}>Save</button>
            </>
          ) : (
            <>
              <div className="info-row">
                <span><strong>Name:</strong> {profile.name}</span><br />
                <span><strong>Email:</strong> {profile.email}</span>
              </div>
              <button className="btn small primary" onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}
        </section>
      </div>

      {/* Club Membership Section */}
      <div className="section-container slide-up">
        <section className="section club-membership">
          <h3>🎟️ Club Membership</h3>
          <div className="membership-info">
            <p><strong>Name:</strong> {defaultName}</p>
            <p><strong>Email:</strong> {defaultEmail}</p>
            <p><strong>Address:</strong> {defaultAddress}</p>
            <p><strong>Club Ultimate:</strong> {defaultClubMembership}</p>
            <p><strong>Expiry Date:</strong> {defaultExpiryDate}</p>
          </div>
        </section>
      </div>

      {/* Address Section */}
      <div className="section-container fade-in">
        <section className="section address-book">
          <h3>📍 Address</h3>
          <div className="address-form">
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Select City</option>
              {Object.keys(cityData).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            {selectedCity && (
              <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                <option value="">Select Area</option>
                {Object.keys(cityData[selectedCity]).map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            )}

            <button className="btn small success" onClick={handleSaveAddress}>Save Address</button>
          </div>

          {selectedCity && selectedArea && pincode && (
            <div className="selected-address">
              <p><strong>📍 Location:</strong> {selectedArea}, {selectedCity}</p>
              <p><strong>📮 Pincode:</strong> {pincode}</p>
            </div>
          )}

          {(!selectedCity || !selectedArea || !pincode) && (
            <div className="choose-another-address">
              <button className="btn small danger" onClick={() => setSelectedCity('')}>Choose Another Address</button>
            </div>
          )}

          {addressSaved && !addressRemoved && (
            <div className="address-saved">
              <p>🏠 Address saved successfully!</p>
              <button className="btn small danger" onClick={handleRemoveAddress}>Remove Address</button>
            </div>
          )}
        </section>
      </div>

      {/* Service History Section */}
      <div className="section-container slide-up">
        <section className="section service-history">
          <h3>🧺 Service History</h3>
          <Link to="/Pastorder"><button className=' Back2'>View Past Orders</button></Link>
        </section>
      </div>

      {/* Toast Notifications */}
      {profileUpdated && <div className="toast-success slide-in">✅ Profile updated successfully!</div>}
      {addressSaved && !addressRemoved && <div className="toast-success slide-in">🏠 Address saved successfully!</div>}
      {addressRemoved && <div className="toast-success slide-in">📍 Address removed!</div>}
    </div>
  );
};

export default AccountPage;
