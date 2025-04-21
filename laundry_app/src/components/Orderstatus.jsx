import React, { useEffect, useState } from 'react';
import './Orderstatus.scss';

const steps = [
  { label: 'Order Placed', icon: '📝' },
  { label: 'Picked Up', icon: '📦' },
  { label: 'In Laundry', icon: '🧺' },
  { label: 'Out for Delivery', icon: '🚚' },
  { label: 'Completed', icon: '✅' },
];

const OrderTracking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('pickupDetails');
    console.log('Saved Order Details:', saved);

    if (saved) {
      setDetails(JSON.parse(saved));
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return isNaN(date) ? dateStr : date.toLocaleDateString();
  };

  return (
    <div className="order-tracking" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#303f9f' }}>Order Tracking</h2>

      {details ? (
        <div className="order-details" style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <p><strong>Pickup:</strong> {formatDate(details.pickupDate)}</p>
          <p><strong>Drop-off:</strong> {formatDate(details.dropoffDate)}</p>
          <p><strong>Slot:</strong> {details.timeSlot}</p>
          <p><strong>Express:</strong> {details.isExpress ? 'Yes' : 'No'}</p>
          <p><strong>Agent:</strong> {details.agent}</p>
        </div>
      ) : (
        <p style={{ fontSize: '18px', textAlign: 'center', color: '#888' }}>No order details found.</p>
      )}

      <div className="timeline-wrapper" style={{ overflowX: 'auto' }}>
        <div className="timeline" style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: '0 auto',
          maxWidth: '1000px'
        }}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className={`timeline-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                <div className="step-icon" style={{
                  backgroundColor: index < currentStep ? '#28a745' : index === currentStep ? '#007bff' : '#ccc',
                  color: 'white',
                  fontSize: '32px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}>
                  {step.icon}
                </div>
                <div className="step-label" style={{ fontSize: '16px', fontWeight: '500' }}>{step.label}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`connector-line ${index < currentStep ? 'completed' : ''}`} style={{
                  flex: 1,
                  height: '4px',
                  backgroundColor: index < currentStep ? '#28a745' : '#ccc',
                  margin: '0 10px',
                  zIndex: 1,
                  position: 'relative',
                  top: '-15px',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {currentStep === steps.length - 1 && (
        <div className="completion-message" style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
            Your laundry order has been completed. Thank you!
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
