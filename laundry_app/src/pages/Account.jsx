import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Account.scss';

const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow'
];

const Accountpage = () => {
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('profile')) || { name: 'John Doe', email: 'john@example.com' });
  const [editing, setEditing] = useState(false);
  const [newSlot, setNewSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState(() => JSON.parse(localStorage.getItem('timeSlots')) || ['Monday – 10:00 AM to 5:00 PM', 'Tuesday– 10:00 AM to 5:00 PM']);
  const [preferences, setPreferences] = useState(() => JSON.parse(localStorage.getItem('preferences')) || { detergent: 'Regular', fragrance: localStorage.getItem('fragrance') || 'Lavender' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('addresses')) || []);
  const [newAddress, setNewAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [serviceHistory, setServiceHistory] = useState(() => JSON.parse(localStorage.getItem('serviceHistory')) || [
    { service: 'Laundry Pickup', date: '2025-04-15', status: 'Completed' },
    { service: 'Laundry Delivery', date: '2025-04-14', status: 'Pending' }
  ]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots));
  }, [timeSlots]);

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('serviceHistory', JSON.stringify(serviceHistory));
  }, [serviceHistory]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setEditing(false);
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  const handleAddSlot = () => {
    if (newSlot.trim() !== '') {
      const updatedSlots = [...timeSlots, newSlot.trim()];
      setTimeSlots(updatedSlots);
      setNewSlot('');
    }
  };

  const handleRemoveSlot = (index) => {
    const updated = [...timeSlots];
    updated.splice(index, 1);
    setTimeSlots(updated);
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPreferences = () => {
    localStorage.setItem('detergent', preferences.detergent);
    localStorage.setItem('fragrance', preferences.fragrance);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddAddress = () => {
    if (newAddress && !addresses.includes(newAddress)) {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      setNewAddress('');
      setAddressSaved(true);
      setTimeout(() => setAddressSaved(false), 3000);
    }
  };

  const handleRemoveAddress = (index) => {
    const updated = [...addresses];
    updated.splice(index, 1);
    setAddresses(updated);
  };

  return (
    <div className="account-container">
      <h2>User Account</h2>

      {/* Profile Section */}
      <section className="section profile">
        <h3>👤 Profile Info</h3>
        {editing ? (
          <>
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
            <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
            <button className="btn primary" onClick={handleSaveProfile}>Save</button>
          </>
        ) : (
          <>
            <div className="info-row">
              <span><strong>Name:</strong> {profile.name}</span>
              <span><strong>Email:</strong> {profile.email}</span>
            </div>
            <button className="btn primary" onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </section>

      {/* Address Book */}
      <section className="section address-book">
        <h3>📍 Address Book</h3>
        <div className="address-form">
          <select value={newAddress} onChange={(e) => setNewAddress(e.target.value)}>
            <option value="">Select City</option>
            {indianCities.map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>
          <button className="btn primary" onClick={handleAddAddress}>Add Address</button>
        </div>
        <ul>
          {addresses.map((addr, index) => (
            <li key={index}>
              {addr}
              <button className="btn small danger" onClick={() => handleRemoveAddress(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Time Slots */}
      <section className="section time-slots">
        <h3>⏰ Saved Time Slots</h3>
        <ul>
          {timeSlots.map((slot, index) => (
            <li key={index}>
              {slot}
              <button className="btn small" onClick={() => handleRemoveSlot(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="slot-form">
          <input
            type="text"
            placeholder="e.g., Friday – 5:00 PM"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
          />
          <button className="btn secondary" onClick={handleAddSlot}>+ Add Slot</button>
        </div>
      </section>

      {/* Laundry Preferences */}
      <section className="section preferences">
        <h3>🧺 Laundry Preferences</h3>
        <form>
          <label>
            Detergent Type:
            <select name="detergent" value={preferences.detergent} onChange={handlePreferenceChange}>
              <option>Regular</option>
              <option>Organic</option>
              <option>Hypoallergenic</option>
            </select>
          </label>

          <label>
            Fragrance:
            <select name="fragrance" value={preferences.fragrance} onChange={handlePreferenceChange}>
              <option>Lavender</option>
              <option>Unscented</option>
              <option>Lemon Fresh</option>
            </select>
          </label>
        </form>
        <button className="btn success" onClick={handleSubmitPreferences}>Submit Preferences</button>
      </section>

      {/* Service History */}
      <section className="section service-history">
        <h3>🧺 Service History</h3>
        <ul>
          {serviceHistory.map((history, index) => (
            <li key={index} className={history.status === 'Completed' ? 'completed' : 'pending'}>
              <span>{history.service} on {history.date}</span>
              {history.status === 'Completed' ? (
                <FaCheckCircle className="icon completed" />
              ) : (
                <FaTimesCircle className="icon pending" />
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Toast Messages */}
      {showSuccess && (
        <div className="toast-success slide-in">🎉 Preferences submitted successfully!</div>
      )}
      {addressSaved && (
        <div className="toast-success slide-in">🏠 Address saved successfully!</div>
      )}
      {profileUpdated && (
        <div className="toast-success slide-in">✅ Your profile was updated!</div>
      )}
    </div>
  );
};

export default Accountpage;
