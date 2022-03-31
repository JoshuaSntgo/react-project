import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
  return (
    <div className='cards'>
      <h1>Checkout the latest updates of CITI </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.png'
              text='CITI PARADE'
              label='Parade'
              path='/services'
            />
            <CardItem
              src='images/img-2.png'
              text='Web Development Competition'
              label='Revotech'
              
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.png'
              text='Tech4Ed Technopreneurship Seminar'
              label='Tech4Ed '
              
            />
            <CardItem
              src='images/img-4.png'
              text='Bulsu CITI Teams Intramurals 2019'
              label='Intramurals'
             
            />
            <CardItem
              src='images/img-8.png'
              text='The 4th BLISZARD'
              label='BLISZARD'
             
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;