import useResidencyStatus from "../hooks/useResidencyStatus";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_ANNOUNCEMENT, GET_ANNOUNCEMENTS} from "../graphql/operations";
import {GetAnnouncementsQuery} from "../graphql/__generated__/graphql";
import {useState} from "react";
import MyCard from "./card";
import {Button, Typography} from "@mui/material";
import {DateRangeIcon} from "@mui/x-date-pickers";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CampaignIcon from '@mui/icons-material/Campaign';
import CustomizedDialog from "./MUIDialog";
import {useRouter} from "next/router";

const SingleAnnouncement = (props: { announcement: GetAnnouncementsQuery['getAnnouncements'][0] }) => {
    return (
        <div style={{margin: 20, width: '100%'}}>
            <div style={{color: "white", margin: 30}}>
                {props.announcement.details.substring(0, 150)}....
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 30, marginRight: 50}}>
                <div style={{color: "darkgrey"}}>
                    <Typography variant={"body1"}>
                       <span><DateRangeIcon />&nbsp;&nbsp;&nbsp;
                           {new Date(props.announcement.createdAt).toDateString()}</span>
                    </Typography>
                </div>
                <div style={{color: "darkgrey"}}>
                    {props.announcement.messManager &&
                        <Typography variant={"body1"}>
                       <span><LocalOfferIcon />&nbsp;
                           Mess Manager</span>
                        </Typography>
                    }

                    {props.announcement.authority &&
                        <Typography variant={"body1"}>
                       <span><LocalOfferIcon />&nbsp;&nbsp;
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

    const handleSubmission = () => {
        console.log("Submission");
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20}}>
                <Typography variant={"h6"}>
                    <span><CampaignIcon />&nbsp;&nbsp;&nbsp;<i>{props.announcement.title}</i></span>
                </Typography>
                <Button variant={"outlined"} color={"primary"} style={{marginTop: 10}} onClick={handleShowDetails}>
                    View Details
                </Button>
            </div>
            {
                showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} addAnnouncement={false}
                     cardTitle='Announcement Details' announcementTitle={props.announcement.title}
                     announcementDetails={props.announcement.details} handleSubmission={handleSubmission}
                     date={new Date(props.announcement.createdAt).toDateString()}
                                  messManager={!!props.announcement.messManager}/>
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
            variables : {
                title : title,
                details : details
            },
            onCompleted : (data) => {
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
                <Button variant='contained' color="primary" size='large' style={{margin: 20}} onClick={handleShowDetails}>
                    +&nbsp;Add Announcement
                </Button>
            </div>
            }
            {
                (messManager || authority) && showDetails &&
                <CustomizedDialog show={true} setShow={setShowDetails} addAnnouncement={true}
                                  cardTitle='Add Announcement' announcementTitle=''
                                  announcementDetails='' handleSubmission={handleSubmission}
                                  date={new Date().toDateString()}
                                  messManager={messManager ?? false}/>
            }
            {
                announcements.map((announcement, index) => (
                    <div key={index} style={{margin: 20}}>
                        <MyCard title={<AnnounceTitle announcement={announcement}/>}
                                content={<SingleAnnouncement announcement={announcement}/>}
                                style={{width: '100%'}}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Announcements;