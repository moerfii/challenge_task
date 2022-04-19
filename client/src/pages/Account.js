import React from 'react';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';



import MultiLineChart from '../helpers/MultiLineChart'

function Account() {
  if(read_local_storage("isArtist")==0 || read_local_storage("isArtist")== undefined){
    return (
    <>
    <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} 
        className="container"> 
      <h1 style={{
        marginTop: '50px',
        fontSize: '30px',
        color: 'black'
      }}>
        My User Account
      </h1>
    </div>
    </>
    )
  }else{
    return(
      <>
      <div className="container">
        <MultiLineChart />
      </div>
      </>
    )
  }
}
export default Account;
