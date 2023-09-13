import useResidencyStatus from "../hooks/useResidencyStatus";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_ANNOUNCEMENT, GET_ANNOUNCEMENTS} from "../graphql/operations";
import {GetAnnouncementsQuery} from "../graphql/__generated__/graphql";
import {useState} from "react";
import MyCard from "./card";
import {Button, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CampaignIcon from '@mui/icons-material/Campaign';
import CustomizedDialog from "./MUIDialog";
import {useRouter} from "next/router";
import MUIStyledTextarea from "./MUITextArea";

const SingleAnnouncement = (props: { announcement: GetAnnouncementsQuery['getAnnouncements'][0] }) => {
    return (
        <div style={{margin: 20, width: '100%'}}>
            <div style={{color: "white", margin: 30}}>
                {props.announcement.details.substring(0, 150)}....
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 30, marginRight: 50}}>
                <div style={{color: "darkgrey"}}>
                    <Typography variant={"body1"}>
                       <span><DateRangeIcon/>&nbsp;&nbsp;&nbsp;
                           {new Date(props.announcement.createdAt).toDateString()}</span>
                    </Typography>
                </div>
                <div style={{color: "darkgrey"}}>
                    {props.announcement.messManager &&
                        <Typography variant={"body1"}>
                       <span><LocalOfferIcon/>&nbsp;
                           Mess Manager</span>
                        </Typography>
                    }

                    {props.announcement.authority &&
                        <Typography variant={"body1"}>
                       <span><LocalOfferIcon/>&nbsp;&nbsp;
                           Provost</span>
                        </Typography>
                    }
                </div>
            </div>
        </div>
    )
}

const AnnounceTitle = (props: { announcement: GetAnnouncementsQuery['getAnnouncements'][0] }) => {

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
                <Typography variant={"h6"}>
                    <span><CampaignIcon/>&nbsp;&nbsp;&nbsp;<i>{props.announcement.title}</i></span>
                </Typography>
                <Button variant={"outlined"} color={"primary"} style={{marginTop: 10}} onClick={handleShowDetails}>
                    View Details
                </Button>
            </div>
            {
                showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} cardTitle='Announcement Details'>
                    <AnnounceDetailsContent announcementTitle={props.announcement.title}
                                            announcementDetails={props.announcement.details}
                                            date={new Date(props.announcement.createdAt).toDateString()}
                                            messManager={props.announcement.messManager != null}
                    />
                </CustomizedDialog>
            }
        </div>
    )
}

const Announcements = () => {

    const router = useRouter();

    const {messManager, resident, authority} = useResidencyStatus();
    const [announcements, setAnnouncements] = useState<GetAnnouncementsQuery['getAnnouncements']>([]);

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const {data, loading, error} = useQuery(
        GET_ANNOUNCEMENTS, {
            fetchPolicy: "network-only",
            onCompleted: (data) => {
                console.log(data);
                setAnnouncements(data.getAnnouncements);
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )

    const [addAnnouncement] = useMutation(
        ADD_ANNOUNCEMENT, {
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            },
            onError: (error) => {
                console.log(error);
            }
        }
    )

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    }

    const handleSubmission = (title: string, details: string) => {
        console.log(title, details)

        addAnnouncement({
            variables: {
                title: title,
                details: details
            },
            onCompleted: (data) => {
                console.log(data);
                router.reload();
            }
        })
    }

    return (
        <div>
            <div>
                <Typography variant={"h4"} style={{textAlign: 'center', color: '#fff'}}>
                    Announcements
                </Typography>
            </div>
            {
                (messManager || authority) && <div>
                    <Button variant='contained' color="primary" size='large' style={{margin: 20}}
                            onClick={handleShowDetails}>
                        +&nbsp;Add Announcement
                    </Button>
                </div>
            }
            {
                (messManager || authority) && showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} cardTitle='Add Announcement'>
                    <AddAnnouncementContent messManager={messManager != null} date={new Date().toDateString()}
                                            handleSubmission={handleSubmission}/>
                </CustomizedDialog>
            }
            {
                announcements.map((announcement, index) => (
                    <div key={index} style={{margin: 20}}>
                        <MyCard title={<AnnounceTitle announcement={announcement}/>} style={{width: '100%'}}>
                            <SingleAnnouncement announcement={announcement}/>
                        </MyCard>
                    </div>
                ))
            }
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
        if (!title || !details) {
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

const CardContent = (props: { announcementDetails?: string }) => {
    return (
        <div style={{color: "white", margin: 10, fontSize: 17}}>
            {props.announcementDetails}
        </div>
    )
}


export default Announcements;