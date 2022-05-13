import React from 'react';
import { Card } from 'antd';


const About = () => {
  
  return (
  <>
      <Card hoverable title="About this app" extra={<a href="#">More</a>} style={{ width: '40%', height: '50%',
        margin: '50px'  }}>
      <p style={{fontSize:'20px'}}>
      Music streaming platforms like spotify and apple music do not forward all the money paid 
      by users to the artists but rather keep a big part for themselves. In our opinion, artists are the true 
      creators of this value and should also be the earners of the money paid. Therefore, we implemnted a
      decentralized P2P music platform which supplies the money directly to the artists.
      </p>
    </Card>
  </>
)
}

export default About;
