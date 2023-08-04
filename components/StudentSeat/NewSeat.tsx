import MyCard from "../card";
import styles from '../../styles/studentSeat.module.scss';
import {useState} from "react";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Button} from "@mui/material";
import QuestionBox from "../QuestionBox";
import Agreement from "./Agreement";
import Submit from "./Submit";
import {types} from "./StudentView";
import {useMutation} from "@apollo/client";
import {LOGIN, POST_NEW_APPLICATION} from "../../graphql/operations";
import {useRouter} from "next/router";

const Questionnaire = (props: {answers:  React.Dispatch<React.SetStateAction<boolean>>[]}) => {
    return (
        <div className={styles.questionnaire}>
            <QuestionBox text="From Outside of Dhaka" checkBox={true} answer={props.answers[0]}/>
            <QuestionBox text="No Close Realtive in Dhaka" checkBox={true} answer={props.answers[1]}/>
            <QuestionBox text="College Outside of Dhaka" checkBox={true} />
            <QuestionBox text="School Outside of Dhaka" checkBox={true} />
            <QuestionBox text="Dummy question" checkBox={true} />
            <QuestionBox text="Dummy question" checkBox={false} dropDown={["none", "hello", "hi"]}/>
            <QuestionBox text="Dummy question" checkBox={true} />
        </div>
    )
}

const Documents = () => {
    return (
        <div style={{justifyContent: 'left', width: 500}}>
            <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
                1. Photo
                <Button variant="outlined" color='inherit'>Upload</Button>
            </div>
           <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
               2. NID
               <Button variant="outlined" color='inherit'>Upload</Button>
           </div>
           <div style={{display: "flex", justifyContent: "space-between", padding: 5}}>
               3. Electric Bill
               <Button variant="outlined" color='inherit'>Upload</Button>
           </div>
            <Button variant="outlined" color='inherit'>Upload others(if any)</Button>
        </div>
    )
}

const NewSeat = (props: {changeType: (event: SelectChangeEvent) => void}) => {
    const [type, setType] = useState('New Seat');

    const [q1Ans, setQ1Ans] = useState(false);
    const [q2Ans, setQ2Ans] = useState(false);

    const [agreed, setAgreed] = useState(false);
    const [showError, setShowError] = useState(false);
    const [reqError, setReqError] = useState(false);

    const router = useRouter();

    const [newSeatApplication, {error, loading, data}] = useMutation(
        POST_NEW_APPLICATION
        , {
            onError : ()=>{},
            onCompleted : (data)=>{
                console.log(data);
                if(data.newSeatApplication)
                    router.push('./prevApplication');
                else
                    setReqError(true)
            }
        })

    const allQuestionsAnswered = [setQ1Ans, setQ2Ans];

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
        setShowError(false);
    }

    const submission = () => {
        console.log('submitted');
        console.log(q1Ans);
        console.log(q2Ans);
        console.log(agreed);
        if(!agreed) {
            setShowError(true);
            return;
        }

        newSeatApplication({
            variables: {
                attachedFileIds: "",
                q1: q1Ans,
                q2: q2Ans
            }
        }).then(r => {
            console.log(r);
        })
    }

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <MyCard content={<Questionnaire answers={allQuestionsAnswered}/>} title='Questionnaire'/>
                <div>
                    <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                      <MUIDropdown width={200} options={[types[0], types[1]]} val={type} change={handleChange}/>
                    </div>
                    <div className={styles.doc}>
                        <MyCard content={<Documents/>} title='Upload Documents'/>
                    </div>
                </div>
            </div>
            <div className={styles.agreement}>
                <MyCard content={<Agreement handleAgreement={handleAgreement}/>} title=''/>
                {showError && <div style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
                    Please agree to the terms and conditions</div>}
                {reqError && <div style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
                    Something went wrong for your application. Please try again</div>}
            </div>

            <div className={styles.submit} onClick={submission}>
                <MyCard content={<Submit/>} title=''/>
            </div>
        </div>
    )
}

export default NewSeat;