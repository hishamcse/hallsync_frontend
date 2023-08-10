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



import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ParticipationBarChart from '../components/ParticipationBarChart'
import { AbsenteesBarChart } from '../components/AbsenteesBarChart'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function MyBarChart() {

  return (
    <BarChart width={730} height={250} data={data}>
	<CartesianGrid strokeDasharray="3 3" stroke='#ffffff' />
	<XAxis dataKey="name" stroke='#ffffff' />
	<YAxis stroke='#ffffff' />
	<Tooltip cursor = {{
		
	}} contentStyle={{
		backgroundColor : "black"
	}} />
	<Legend />
	<Bar dataKey="pv" fill="#8884d8" />
	</BarChart>
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
		<ParticipationBarChart />
		<AbsenteesBarChart />
    </div>
  )
}




export default QuestionnaireNewSeat
