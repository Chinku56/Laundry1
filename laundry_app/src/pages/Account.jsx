import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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
  }, [selectedArea, selectedCity]);

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
      <button className='Back1' onClick={() => navigate("/home")}>Back</button>

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
          <button className='Back2' onClick={() => navigate("/Pastorder")}>View Past Orders</button>
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

