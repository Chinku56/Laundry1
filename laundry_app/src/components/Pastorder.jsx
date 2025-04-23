import React from 'react';
import { Link } from 'react-router-dom';
import './Pastorder.scss';
 
const dummyOrders = [
  {
    id: 'ORD12345',
    date: '2025-04-15',
    items: ['3 Shirts', '2 Pants', '1 Jacket'],
    serviceType: 'Wash & Fold',
    status: 'Delivered',
    total: '615/-',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD12346',
    date: '2025-04-10',
    items: ['2 Towels', '1 Blanket'],
    serviceType: 'Dry Cleaning',
    status: 'Out for Delivery',
    total: '420/-',
    paymentMethod: 'Google Pay',
  },
  {
    id: 'ORD12347',
    date: '2025-03-30',
    items: ['5 Shirts'],
    serviceType: 'Ironing',
    status: 'Delivered',
    total: '300/-',
    paymentMethod: 'Debit Card',
  }
];
 
const Pastorder = () => {
  return (
    <div className="service-history-page">
      <Link to="/Accountpage"><button className='Back3'>Back</button></Link>
      <h2>🧺 My Laundry Orders</h2>
      <p>Here's a quick look at your recent services.</p>
      <div className="grid">
        {dummyOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="flex justify-between items-center mb-4">
              <h3>Order <span>#{order.id}</span></h3>
              <span className={`status ${order.status.toLowerCase().replace(/\s/g, '-')}`}>
                {order.status}
              </span>
            </div>
            <ul>
              <li><strong>Date:</strong> {order.date}</li>
              <li><strong>Service:</strong> {order.serviceType}</li>
              <li><strong>Items:</strong> {order.items.join(', ')}</li>
              <li><strong>Total:</strong> {order.total}</li>
              <li><strong>Payment:</strong> {order.paymentMethod}</li>
            </ul>
            
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Pastorder;