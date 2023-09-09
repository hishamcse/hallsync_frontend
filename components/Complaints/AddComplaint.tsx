import React, {useState} from "react";
import {Button, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import {ComplaintTypeDropDown} from "./complaintTypeDropDown";
import MUIStyledTextarea from "../MUITextArea";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const AddComplaintContent = (props: {
    studentId?: number,
    student9DigitId?: string,
    studentName?: string,
    date?: string,
    handleSubmission: (title: string, details: string, type: string) => void
}) => {

    const [title, setTitle] = useState<string>();
    const [type, setType] = useState<string>('RESOURCE');
    const [details, setDetails] = useState<string>();

    const [error, setError] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmission = () => {
        if (!title || !details || !type) {
            setError(true);
            return;
        }
        setError(false)
        props.handleSubmission(title, details, type);
    }

    return (
        <div>
            <DialogContent dividers>
                <Typography component={'span'} variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Title</span><br/>
                    <TextField placeholder="Complaint title"
                               style={{width: '100%', backgroundColor: '#000', color: '#fff'}}
                               onChange={handleChange} value={title} onFocus={() => setError(false)}/>
                </Typography>

                <Typography variant={"body1"} gutterBottom style={{marginTop: 20, marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Type</span><br/>
                    <ComplaintTypeDropDown val={type} setVal={setType}/>
                </Typography>


                <Typography variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Description</span><br/>
                    <MUIStyledTextarea placeHolder="complaint details" rows={8} val={details}
                                       handleInput={setDetails}/>
                </Typography>

                <Typography gutterBottom>
                    <div
                        style={{display: 'flex', justifyContent: 'space-between', margin: 10}}>
                        <div style={{color: "darkgrey"}}>
                            <Typography variant={"body1"}>
                    <span><DateRangeIcon/>&nbsp;&nbsp;&nbsp;
                        {props.date}</span>
                            </Typography>
                        </div>
                        <div style={{color: "darkgrey"}}>
                            {props.student9DigitId && (
                                <Typography variant={"body1"}>
                        <span><LocalOfferIcon/>&nbsp;
                            Student ID: {props.student9DigitId}
                    </span>
                                </Typography>
                            )}
                        </div>
                    </div>
                </Typography>
            </DialogContent>
            {
                error &&
                <Typography variant={"body1"} style={{color: 'red', textAlign: 'center'}}>
                    Please fill all fields
                </Typography>
            }
            <DialogActions>
                <Button autoFocus variant='outlined' color='inherit' size='large'
                        onClick={handleSubmission}>
                    Add
                </Button>
            </DialogActions>
        </div>
    )
}

export default AddComplaintContent;