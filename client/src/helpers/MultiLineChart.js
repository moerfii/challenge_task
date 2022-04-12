import React, { Component } from 'react'
import "../pages/Home.css";
import Chart from 'react-google-charts'
const LineData = [
  ['x', '2021' ,'2022' ],    
  [1, 0, 0],
  [2, 23, 15],
  [3, 17, 9],
  [4, 18, 10],      //ToDO: Change last month to Number of clicks
  [5, 9, 5],
  [6, 11, 3],
  [7, 27, 19],
  [8, 23, 15],
  [9, 17, 9],
  [10, 18, 10],
  [11, 9, 5],
  [12, 11, 3],
 
]
const LineChartOptions = {
  hAxis: {
    title: 'Month',
    textStyle:{color: '#ffffff'}
  },
  vAxis: {
    title: 'Number of clicks',
    textStyle:{color: '#ffffff'},
    
    
    
  },
  series: {
    1: { curveType: 'function' },
  },
  backgroundColor: { fill:'transparent' },
  
}
class MultiLineChart extends Component {
  render() {
    return (

        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          
      <div className="container mt-5" >
      <h1 className='featuredTitle'>
          Number of Clicks per Month
        </h1>
        <Chart
          width={'700px'}
          height={'410px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LineData}
          options={LineChartOptions}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>

      </div>
    )
  }
}
export default MultiLineChart

