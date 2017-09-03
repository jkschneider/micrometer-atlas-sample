import React from 'react';
import logoNoTitle from '../img/logo-no-title.svg';

export default function Title() {
  return (
    <div className="text-center vertical-center" style={{minHeight: 900}}>
      <img src={logoNoTitle} className="mt-5 img-fluid" alt="" style={{margin: '0 auto'}}/>
      <h1 className="mt-2">Micrometer Atlas</h1>
      <h3 className="mt-5">Michael Minella</h3>
      <h4>Chicago Java User Group</h4>
      <span style={{fontSize: '1.2rem'}}>September 1, 2017</span>
    </div>
  );
}