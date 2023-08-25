import React, { useState } from 'react'
import type { NextPage } from 'next'
// import { Card } from '../components/card'
import MyDropDown from '../components/dropdown'
import MyCard from '../components/card'
import MyCheckBox from '../components/checkbox'
import { UploadFile } from '../components/fileUpload'
import { FreeRoom } from '../components/Seat/freeRoom'
import AlignItemsList from '../components/notification'


const items = ['New Seat', 'Temp Seat','Room Change']



import {PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ParticipationBarChart from '../components/StatAndFeedback/ParticipationBarChart'
import { AbsenteesBarChart } from '../components/StatAndFeedback/AbsenteesBarChart'
import { RatingBarChart } from '../components/StatAndFeedback/RatingsStat'
import { OptInPieChart } from '../components/StatAndFeedback/OptInPieChart'
import { MealPreferencesBarChart } from '../components/StatAndFeedback/PreferencesBarChart'



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
    {/* <OptInPieChart /> */}
    <MealPreferencesBarChart />
    </div>
  )
}




export default QuestionnaireNewSeat
