import MyCard from "../card";
import styles from '../../styles/studentSeat.module.scss';
import {ChangeEvent, useState} from "react";
import MUIDropdown from "../MUIDropdown";
import * as React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Button, IconButton} from "@mui/material";
import QuestionBox from "../QuestionBox";
import Agreement from "./Agreement";
import Submit from "./Submit";
import {types} from "./StudentView";
import {useMutation} from "@apollo/client";
import {POST_NEW_APPLICATION} from "../../graphql/operations";
import {useRouter} from "next/router";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ApplicationDetailsQuery } from "../../graphql/__generated__/graphql";

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

const Documents = (props : {
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    files : Blob[],
    removeFile  : (f : Blob)=>void,
    disabled? : boolean
}) => {
    return (
        <div style={{justifyContent: 'left', width: 500}}>
            <ol style = {{
                margin : "5px"
            }}>
                {
                    props.files.map(f => (
                        <li style = {{
                            padding : "5px",
                        }}  key = {f.name}> 
                        <div style={{
                            display : "flex",
                            justifyContent : "space-between",
                            alignItems : "center"
                        }}>
                            {f.name}
                            <IconButton onClick={(_)=>props.removeFile(f)} >
                                <CloseOutlinedIcon />
                            </IconButton>
                        </div>
                        </li>
                    )
                    )
                }
            </ol>
            {   !props.disabled &&
                <Button variant="outlined" component="label"  >
                    Upload file
                    <input type="file" hidden onChange={props.onChange} />
                </Button>
            }
        </div>
    )
}

const NewSeat = (props: {
    changeType: (event: SelectChangeEvent) => void,
    application? : ApplicationDetailsQuery['applicationDetails']

}) => {
    const [type, setType] = useState('New Seat');

    const [q1Ans, setQ1Ans] = useState(false);
    const [q2Ans, setQ2Ans] = useState(false);

    const [agreed, setAgreed] = useState(false);
    const [showError, setShowError] = useState(false);
    const [reqError, setReqError] = useState(false);
    const [reqErrorMsg, setReqErrorMsg] = useState('');

    const [files, setFiles] = useState<Blob[]>([])

    function handleFileChange(event : ChangeEvent<HTMLInputElement>) {
        console.log(event)
        setFiles((f) => {
            if(event.target.files)
                return [...f , event.target.files[0]]
            return f;
        })
    }
    function removeFile(f1: Blob){
        setFiles(f =>{
            let fc = [...f]
            fc.splice(fc.indexOf(f1))
            return fc
        } )
        // files.splice(files.indexOf(f));
    }
    

    const router = useRouter();

    const [newSeatApplication, {error, loading, data}] = useMutation(
        POST_NEW_APPLICATION
        , {
            onError : (error)=>{
                setReqError(true)
                setReqErrorMsg(error.message)
            },
            onCompleted : (data)=>{
                console.log(data);
                if(data.newSeatApplication)
                    router.push('./prevApplication');
                else
                    setReqError(true)
            }
        })

    const allQuestionsAnswered = [setQ1Ans, setQ2Ans];

    function handleSubmit() {
        console.log("here");
        if(!agreed) {
            setShowError(true);
            return;
        }        
        if(files.length > 0){

            const url = 'http://localhost:3000/upload';
            const formData = new FormData();
            files.forEach(f =>{
                formData.append('file', f);
                formData.append('filename', f.name);
            })
            let token = localStorage.getItem('token');
    
            fetch(url, {
                method : 'post',
                body : formData,
                headers : {
                    'authorization' : 'Bearer ' + token
                }
                // ... config
            }).then(resp => resp.json()).then(data =>{
                console.log(data);
    
                newSeatApplication({
                    variables: {
                        attachedFileIds: {
                            array : data.id
                        } ,
                        q1: q1Ans,
                        q2: q2Ans
                    }
                }).then(r => {
                    console.log(r);
                })
                .catch(_ =>{
                    setReqError(true)
                })
            })
            .catch(err =>{
                console.log(err);
                setReqError(true);
            })
        }
        else{
            newSeatApplication({
                variables: {
                    attachedFileIds: {
                        array : []
                    } ,
                    q1: q1Ans,
                    q2: q2Ans
                }
            }).then(r => {
                console.log(r);
            })
            .catch(_ =>{
                setReqError(true)
            })
        }


    }

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
        props.changeType(event);
    };

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreed(event.target.checked);
        setShowError(false);
    }

    let docUploadDisabled = props.application && (props.application.status !== 'REVISE')
    let agreementDisabled = props.application != undefined;

    return (
        <div style={{marginBottom: 20}}>
            <div className={styles.newSeat}>
                <MyCard content={<Questionnaire answers={allQuestionsAnswered}/>} title='Questionnaire'/>
                <div>
                    {!props.application &&
                        <div style={{display: 'flex', justifyContent: 'right', marginRight: 20}}>
                        <MUIDropdown width={200} options={[types[0], types[1]]} val={type} change={handleChange}/>
                        </div>
                    }
                    <div className={styles.doc}>
                        <MyCard content={<Documents disabled = {docUploadDisabled} removeFile={removeFile} files = {files} onChange={handleFileChange}/>} title='Upload Documents'/>
                    </div>
                </div>
            </div>
            <div className={styles.agreement}>
                <MyCard content={<Agreement disabled = {agreementDisabled} handleAgreement={handleAgreement}/>} title=''/>
                {showError && <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                    Please agree to the terms and conditions</div>}
                {reqError && <div style={{color: 'red', fontSize: 14, textAlign: 'center'}}>
                    {reqErrorMsg}</div>}
            </div>

                <div className={styles.submit} onClick={handleSubmit}>
                    {
                        !agreementDisabled &&
                        <MyCard content={<Submit/>} title=''/>
                    }
                </div>
            
        </div>
    )
}

export default NewSeat;