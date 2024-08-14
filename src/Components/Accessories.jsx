import React from 'react';
import './Accessories.css'; // Import the CSS file for styling
import b1 from '../images/acc1.jpg';
import b2 from '../images/acc2.jpg';
import b3 from '../images/acc3.jpg';
import b4 from '../images/acc4.jpg';
import b5 from '../images/acc5.jpg';
import b6 from '../images/acc6.jpg';
import b7 from '../images/acc7.jpg';
import b8 from '../images/acc8.jpg';
import b9 from '../images/acc9.jpg';
import b10 from '../images/acc10.jpg';

function Accessories() {
  return (
    <div className="accessories-container">
      <h1>Our Accessories</h1>
      <p>All Accessories at PakBike are from reputed brands all across the globe. We provide high quality accessories at the best prices in all over Pakistan including multiple cities</p>
      <div className="blue-card">
        <div className="card-row-pic">
          <div className="card-1"><img src={b1} alt="Accessory 1" /></div>
          <div className="card-2"><img src={b2} alt="Accessory 2" /></div>
          <div className="card-3"><img src={b3} alt="Accessory 3" /></div>
          <div className="card-4"><img src={b4} alt="Accessory 4" /></div>
          <div className="card-5"><img src={b5} alt="Accessory 5" /></div>
        </div>
        <div className="card-row-pic">
          <div className="card-6"><img src={b6} alt="Accessory 6" /></div>
          <div className="card-7"><img src={b7} alt="Accessory 7" /></div>
          <div className="card-8"><img src={b8} alt="Accessory 8" /></div>
          <div className="card-9"><img src={b9} alt="Accessory 9" /></div>
          <div className="card-10"><img src={b10} alt="Accessory 10" /></div>
        </div>
      </div>
    </div>
  );
}

export default Accessories;
