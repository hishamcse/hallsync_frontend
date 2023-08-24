import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CampaignIcon from "@mui/icons-material/Campaign";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MyCard from "./card";
import {TextField} from "@mui/material";
import MUIStyledTextarea from "./MUITextArea";
import {useState} from "react";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const CardContent = (props: {announcementDetails?: string}) => {
    return (
        <div style={{color: "white", margin: 10, fontSize: 17}}>
            {props.announcementDetails}
            {/*<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias asperiores*/}
            {/*    aut culpa et excepturi illum nam numquam provident quo. Commodi dicta harum illo ipsum*/}
            {/*    itaque placeat sequi vel voluptatibus!*/}
            {/*</div>*/}
            {/*<div>Ab deleniti expedita facilis harum quam sint soluta voluptates! Animi assumenda,*/}
            {/*    delectus dicta dolorum excepturi magnam magni, odio odit omnis quae quam ratione*/}
            {/*    repudiandae rerum sint totam ut velit voluptas.*/}
            {/*</div>*/}
        </div>
    )
}

const AnnounceDetailsContent = (props: {
    announcementTitle?: string,
    announcementDetails?: string,
    date?: string,
    messManager?: boolean
}) => {
    return (
        <DialogContent dividers>
            <Typography variant={"h6"} gutterBottom style={{marginBottom: 20}}>
                <span><CampaignIcon/>&nbsp;&nbsp;&nbsp;<i>{props.announcementTitle}</i></span>
            </Typography>
            <Typography gutterBottom>
                <MyCard style={{marginTop: 10, marginBottom: 20}} title=''>
                    <CardContent announcementDetails={props.announcementDetails}/>    
                </MyCard>

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
                        {props.messManager &&
                            <Typography variant={"body1"}>
                       <span><LocalOfferIcon/>&nbsp;
                           Mess Manager</span>
                            </Typography>
                        }

                        {!props.messManager &&
                            <Typography variant={"body1"}>
                       <span><LocalOfferIcon/>&nbsp;&nbsp;
                           Provost</span>
                            </Typography>
                        }
                    </div>
                </div>
            </Typography>
        </DialogContent>
    )
}

const AddAnnouncementContent = (props: {
    messManager: boolean,
    date: string,
    handleSubmission: (title: string, details: string) => void
}) => {

    const [title, setTitle] = useState<string>();
    const [details, setDetails] = useState<string>();

    const [error, setError] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleSubmission = () => {
        if(!title || !details) {
            setError(true);
            return;
        }
        setError(false)
        props.handleSubmission(title, details);
    }

    return (
        <div>
            <DialogContent dividers>
                <Typography variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Title</span><br/>
                    <TextField placeholder="announcement title"
                               style={{width: '100%', backgroundColor: '#000', color: '#fff'}}
                               onChange={handleChange} value={title} onFocus={() => setError(false)}/>
                </Typography>

                <Typography variant={"body1"} gutterBottom style={{marginBottom: 20, alignItems: 'center'}}>
                    <span><CampaignIcon/>&nbsp;&nbsp;Description</span><br/>
                    <MUIStyledTextarea placeHolder="announcement details" rows={8} val={details}
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
                            {props.messManager &&
                                <Typography variant={"body1"}>
                                   <span><LocalOfferIcon/>&nbsp;
                                       Mess Manager</span>
                                </Typography>
                            }

                            {!props.messManager &&
                                <Typography variant={"body1"}>
                                   <span><LocalOfferIcon/>&nbsp;&nbsp;
                                       Provost</span>
                                </Typography>
                            }
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

export default function CustomizedDialog(props: {
    addAnnouncement: boolean,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    cardTitle: string,
    announcementTitle?: string,
    announcementDetails?: string,
    date: string,
    messManager: boolean,
    handleSubmission: (title: string, details: string) => void
}) {
    const [open, setOpen] = React.useState(props.show);

    const handleClose = () => {
        setOpen(false);
        props.setShow(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.show}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.cardTitle}
                </BootstrapDialogTitle>
                {
                    !props.addAnnouncement &&
                    <AnnounceDetailsContent announcementTitle={props.announcementTitle}
                                            announcementDetails={props.announcementDetails}
                                            date={props.date} messManager={props.messManager}/>
                }

                {
                    props.addAnnouncement &&
                    <AddAnnouncementContent date={props.date} messManager={props.messManager}
                                            handleSubmission={props.handleSubmission}/>
                }

            </BootstrapDialog>
        </div>
    );
}