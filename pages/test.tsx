import React, { useState } from 'react'
import type { NextPage } from 'next'
// import { Card } from '../components/card'
import MyDropDown from '../components/dropdown'
import MyCard from '../components/card'
import MyCheckBox from '../components/checkbox'
import { UploadFile } from '../components/fileUpload'
import { FreeRoom } from '../components/freeRoom'
import AlignItemsList from '../components/notification'


const items = ['New Seat', 'Temp Seat','Room Change']



import {PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ParticipationBarChart from '../components/ParticipationBarChart'
import { AbsenteesBarChart } from '../components/AbsenteesBarChart'
import { RatingBarChart } from '../components/RatingsStat'
import { OptInPieChart } from '../components/OptIn'

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 300, color : "#FFE605" },
  { name: 'A2', value: 100 , color : "#FFFFFF"},
];

function PieChart_() {

    return (
        <PieChart width={400} height={400}>
          {/* <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" /> */}
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#FFE605" label paddingAngle={5} >
            {
              data02.map(d =>(
                <Cell key={d.name} fill={d.color} />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend  layout='vertical' align='right' verticalAlign='middle' />
        </PieChart>
    );
}



const Test: NextPage = () => {
  const [val, setVal] = useState<string>(items[1]);
  return (
    <div className='contentRoot' style={{
      color : "white"
    }}>
      <MyDropDown items={items}
      onSelect={(val)=>setVal(val)} selectedVal={val} toggleStyle={{
        width : "160px",
        
      }} />
    </div>
    // <Card title='Questionnaire' body={<div>Test</div>} />
  )
}

function QuestionnaireNewSeat(){
  return (
    <div className='contentRoot'>
		{/* <MyBarChart /> */}
		{/* <ParticipationBarChart />
		<AbsenteesBarChart />
    <RatingBarChart /> */}
    {/* <PieChart_ /> */}
    <OptInPieChart />
    </div>
  )
}




export default QuestionnaireNewSeat
