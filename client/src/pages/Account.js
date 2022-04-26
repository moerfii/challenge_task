import React, {useState, useEffect} from 'react';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';
import Loader from '../helpers/Loader';
import MultiLineChart from '../helpers/MultiLineChart';
import "./Account.css";

function Account() {

  const [clicks, setClicks] = useState(JSON.parse(read_local_storage("id")).artistDetails.clicks);
  const [isArtist, setIsArtist] = useState(JSON.parse(read_local_storage("id")).isArtist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
   }, 1000);
  }, []);


  if(isArtist==0 ||isArtist== undefined){
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
      {loading ? Loader() : null}
    </div>
    </>
    )
  }else{
    return(
      <>
      <div className="container">
        <MultiLineChart />
      </div>
      {loading ? Loader() : 
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} 
        className="container"> 
          <h1 style={{
            marginTop: '50px',
            fontSize: '30px',
            color: 'white'
          }}>
            Current # of clicks: {clicks}
          </h1>
        
        </div>
        <div className='payoutButton' onClick={() => console.log("PAYOUT")}>
        Payout
        </div>
      </div>
      }
      </>
    )
  }
}
export default Account;
