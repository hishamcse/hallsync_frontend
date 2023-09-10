import React, {useState} from "react";
import {TextField, Typography} from "@mui/material";
import MUIStyledTextarea from "../MUITextArea";
import {SelectChangeEvent} from "@mui/material/Select";
import {MyButton} from "../button";
import MUIDropdown from "../MUIDropdown";
import MyCard from "../card";
import styles from "../../styles/studentSeat.module.scss";
import {Title} from "../Seat/ProvostSeat/AppDetailsTitle";

const AddComplaintContent = (props: {
    studentId?: number,
    student9DigitId?: string,
    studentName?: string,
    date?: string,
    handleSubmission: (title: string, details: string, type: string) => void
}) => {

    const [title, setTitle] = useState<string>();
    const [type, setType] = useState<string>('RESOURCE');
    const [details, setDetails] = useState<string>('');

    const [error, setError] = useState<boolean>(false);

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDetails = (val: string) => {
        setDetails(val);
    }

    const handleSubmission = () => {
        if (!title || !details || !type) {
            setError(true);
            return;
        }
        setError(false)
        props.handleSubmission(title, details, type);
    }

    const complaintTypes = ['RESOURCE', 'STAFF', 'STUDENT'];

    const customStyles = {
        display: 'block', width: 900, alignItems: 'center', margin: 'auto', marginTop: 20, marginBottom: 20
    }

    return (
        <div style={{alignItems: 'center'}}>
            <Title text="Add Complaint" />
            <MyCard title='Complaint Title and Type' style={{...customStyles}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField placeholder="Complaint title"
                               style={{width: '80%', backgroundColor: '#000', color: '#fff', marginTop: 20}}
                               onChange={handleTitleChange} value={title} onFocus={() => setError(false)}/>
                    <div style={{paddingTop: 25, marginLeft: 30}}>
                        {/* <MUISelectStyled items={complaintTypes} 
                        type="single" placeHolder="Complaint Type" setVal={setType} val={type} /> */}
                        <MUIDropdown width={200} options={complaintTypes} val={type} change={handleTypeChange}/>
                    </div>
                </div>
            </MyCard>

            <MyCard title='Complaint Details' style={{...customStyles}}>
                <div style={{justifyContent: 'left', width: 500, paddingTop: 15}}>
                    <MUIStyledTextarea rows={20} width={850} placeHolder="State your complaint details" handleInput={handleDetails}
                    />
                </div>
            </MyCard>
            {
                error &&
                <Typography variant={"body1"} style={{color: 'red', textAlign: 'center'}}>
                    Please fill all fields
                </Typography>
            }
            <div className={styles.submit}>
                <MyButton onClick={handleSubmission} text="Submit" type="submit"/>
            </div>
        </div>
    )
}

export default AddComplaintContent;