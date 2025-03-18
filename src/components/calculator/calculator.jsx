import React from 'react';
import './calculator.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Data } from '../../utils/Data';
import { BarChart } from '../barchart/barchart';
import Chart from "chart.js/auto";
import { OtherUsersData } from '../../utils/otherData';
import Questions from '../questions/questions';
import { Button } from 'react-bootstrap';

export default function Calculator() {
  const [activeGraph, setActiveGraph] = useState('myGraph');
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    step1Input: '',
    step2Input: ''
    // Add more fields here when adding new questions
  });

  // Keep the chart configurations as they were
  const myChartData = {
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };

  const otherUsersChartData = {
    labels: OtherUsersData.map((data) => data.year),
    datasets: [
      {
        label: "Other Users Gained",
        data: OtherUsersData.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="containerCalc">
      <h1 className='heading'>Emissions Calculator</h1>
      
      <div className="calc">
        <Questions
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      <div className="graph">
        <BarChart chartData={activeGraph === 'myGraph' ? myChartData : otherUsersChartData} />
        
        <div className="graphButtons">
          <Button 
            variant="primary"
            type="button"
            onClick={() => setActiveGraph('myGraph')}
            className={activeGraph === 'myGraph' ? 'active' : ''}
          >
            My Graph
          </Button>
          <Button 
            variant="primary" 
            type="button"
            onClick={() => setActiveGraph('otherUsers')}
            className={activeGraph === 'otherUsers' ? 'active' : ''}
          >
            Other Users
          </Button>
        </div>
      </div>
    </div>
  );
}