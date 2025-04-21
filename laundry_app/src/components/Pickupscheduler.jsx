import React, { useEffect, useState } from 'react';
import './Pickupscheduler.scss';
import { useNavigate } from 'react-router-dom';

const Pickup = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [isExpress, setIsExpress] = useState(false);
  const [agent, setAgent] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTimeSlots = localStorage.getItem('timeSlots');
    const savedAgents = localStorage.getItem('agents');

    if (savedTimeSlots) {
      setTimeSlots(JSON.parse(savedTimeSlots));
    } else {
      const defaultTimeSlots = ['8am–10am', '10am–12pm', '12pm–2pm', '2pm–4pm', '4pm–6pm'];
      setTimeSlots(defaultTimeSlots);
      localStorage.setItem('timeSlots', JSON.stringify(defaultTimeSlots));
    }

    if (savedAgents) {
      setAgents(JSON.parse(savedAgents));
    } else {
      const defaultAgents = ['Bharath', 'Priya Sharma', 'Jhansi', 'Pawan Pawar'];
      setAgents(defaultAgents);
      localStorage.setItem('agents', JSON.stringify(defaultAgents));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickupDate || !dropoffDate || !timeSlot || !agent) {
      alert('Please complete all fields');
      return;
    }

    const details = {
      pickupDate,
      dropoffDate,
      timeSlot,
      isExpress,
      agent,
    };

    console.log("Submitting pickup details:", details);

    let existingSchedules = JSON.parse(localStorage.getItem('pickupSchedules')) || [];
    if (!Array.isArray(existingSchedules)) {
      existingSchedules = [];
    }

    existingSchedules.push(details);
    localStorage.setItem('pickupSchedules', JSON.stringify(existingSchedules));

    // ✅ Save the latest pickup for tracking screen
    localStorage.setItem('pickupDetails', JSON.stringify(details));

    navigate('/OrderTracking');
  };

  return (
    <form className="pickup-scheduler" onSubmit={handleSubmit}>
      <h2>PICKUP & DELIVERY SCHEDULER</h2>

      <label>Pickup Date</label>
      <input
        type="date"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
        className="datepicker"
      />

      <label>Drop-off Date</label>
      <input
        type="date"
        value={dropoffDate}
        onChange={(e) => setDropoffDate(e.target.value)}
        className="datepicker"
      />

      <label>Time Slot</label>
      <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
        <option value="">Choose a time slot</option>
        {timeSlots.map((slot, i) => (
          <option key={i} value={slot}>{slot}</option>
        ))}
      </select>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={isExpress}
          onChange={() => setIsExpress(!isExpress)}
        />
        Express Delivery
      </label>

      <label>Preferred Delivery Agent</label>
      <select value={agent} onChange={(e) => setAgent(e.target.value)}>
        <option value="">Choose an agent</option>
        {agents.map((a, i) => (
          <option key={i} value={a}>{a}</option>
        ))}
      </select>

      <button className="submit">Schedule</button>
    </form>
  );
};

export default Pickup;
