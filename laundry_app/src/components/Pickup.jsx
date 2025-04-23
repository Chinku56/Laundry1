import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import './Pickup.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePickup } from './PickupContext'; 

const Pickup = () => {
  const { setPickupDetails, setSelectedAgent } = usePickup(); 
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [isExpress, setIsExpress] = useState(false);
  const [agent, setAgent] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultTimeSlots = [
      '6:00 AM – 8:00 AM',
      '8:00 AM – 10:00 AM',
      '10:00 AM – 12:00 PM',
      '12:00 PM – 2:00 PM',
      '2:00 PM – 4:00 PM',
      '4:00 PM – 6:00 PM',
      '6:00 PM – 8:00 PM',
      '8:00 PM – 10:00 PM',
      '10:00 PM – 12:00 AM',
    ];

    setTimeSlots(defaultTimeSlots);

    const defaultAgents = ['Bharath', 'Priya Sharma', 'Jhansi', 'Pawan Pawar'];
    setAgents(defaultAgents);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupDate || !dropoffDate || !timeSlot || !agent) {
      toast.error('Please fill all required fields.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    const details = {
      pickupDate,
      dropoffDate,
      timeSlot,
      isExpress,
      agent,
    };

    // Update the context values
    setSelectedAgent(agent);
    setPickupDetails(details);

    toast.success('Pickup Scheduled Successfully!', {
      position: 'top-center',
      autoClose: 2000,
      icon: '🧺',
      onClose: () => navigate('/OrderTracking'),
    });

    if (isExpress) {
      toast.info('Express Delivery selected! ₹149 extra will be charged on delivery.', {
        position: 'bottom-center',
        autoClose: 3000,
        icon: '⚡',
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="pickup-alt-wrapper">
        <div className="pickup-alt-card">
          <h2>Schedule Your Laundry Pickup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                    setDropoffDate('');
                  }}
                />
              </div>

              <div className="form-group">
                <label>Drop-off Date</label>
                <input
                  type="date"
                  value={dropoffDate}
                  min={pickupDate ? new Date(new Date(pickupDate).getTime() + 86400000).toISOString().split('T')[0] : today}
                  onChange={(e) => setDropoffDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Time Slot</label>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                  <option value="">Select slot</option>
                  {timeSlots.map((slot, i) => (
                    <option key={i} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Delivery Agent</label>
                <select value={agent} onChange={(e) => setAgent(e.target.value)}>
                  <option value="">Choose agent</option>
                  {agents.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width checkbox">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={() => {
                    setIsExpress(!isExpress);
                    if (!isExpress) {
                      toast.info('Express Delivery selected! ₹149 extra will be charged on delivery.', {
                        position: 'bottom-center',
                        autoClose: 3000,
                        icon: '⚡',
                      });
                    }
                  }}
                />
                <span>Enable Express Delivery</span>
              </div>
            </div>
            
            <Link to="/CartPayment"><button className="schedule-btn">Proceed To Pay</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pickup;
