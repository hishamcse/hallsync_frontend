import React, { useState } from 'react'
import type { NextPage } from 'next'
// import { Card } from '../components/card'
import MyDropDown from '../components/dropdown'
import MyCard from '../components/card'
import MyCheckBox from '../components/checkbox'
import { UploadFile } from '../components/fileUpload'
import { FreeRoom } from '../components/freeRoom'

const items = ['New Seat', 'Temp Seat','Room Change']

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
      <FreeRoom setSeatId={()=>{}}/>
    </div>
  )
}




export default QuestionnaireNewSeat
