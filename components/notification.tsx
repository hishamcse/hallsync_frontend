import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { NotificationsQuery } from '../graphql/__generated__/graphql';
import MyCard from './card';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ProfileInfo from './Seat/ProvostSeat/ProfileInfo';
import CustomizedDialog from './MUIDialog';
import Submit from './Seat/StudentSeat/Submit';
import { MyButton } from './button';
import MUIStyledTextarea from './MUITextArea';
import { useMutation } from '@apollo/client';
import { MARK_NOTIFICATION_SEEN, POST_VOTE } from '../graphql/operations';
import { getDayAndMonthAndYearString, getTimeAMPM } from './utilities';
import { notificationContext } from '../pages/_app';

type notification =  NotificationsQuery['notifications']['notifications'][0];

function getPrimaryText(
    notification : notification
){
    if(notification.applicationId){
        return "Application Update"
    }
    else if(notification.voteId){
        return "Room Change Request"
    }
    return " "
}

function getClickToSeeText(
    notification : notification
){
    if(notification.applicationId){
        return "Click to see more details"
    }
    else if(notification.voteId){
        return "Click to vote"
    }
    return " "
}

function VoteView(props : {
    vote : NonNullable<NotificationsQuery['notifications']['notifications'][0]['vote']>,
    setShow : (val : boolean) => void
}){
    const [reason, setReason] = useState<string>('');
    let [postVoteQuery,{data, error}] = useMutation(POST_VOTE);

    function postVote(vote : "YES" | "NO", reason : string){
        postVoteQuery({
            variables : {
                voteId : props.vote.voteId,
                vote : vote,
                reason : reason
            },
            onCompleted : ()=>{
                props.setShow(false);
            },
            onError : (err)=>{
                console.error(err);
            }
        })
    }

    
    return(
        <div style={{
            margin : "0px 20px",
            marginBottom : 10
        }} >
            <MyCard title={''}>
                <div>
                    <ProfileInfo info={props.vote.seatChangeApplication.application.student} />
                    <div style={{
                        textAlign : "right",
                        paddingRight : 40
                    }}>
                        <MyButton text='Accept' type='submit' onClick={()=>{
                            postVote("YES", '');
                        }}  />
                    </div>
                </div>
            </MyCard>
            <div style={{textAlign : "center", marginTop : 20}} >
            </div>
            <MyCard title={'Decline'}>
                <MUIStyledTextarea width={420} val={reason} handleInput={setReason} placeHolder='Reason for rejection' rows={6}  />
                <div style={{
                    textAlign : "center",
                    marginTop : 10
                }}>
                    <MyButton text='Reject' type='cancel' onClick={()=>{
                        postVote("NO", reason);
                    }} />
                </div>
            </MyCard>
        </div>
    )
}

function Notification(props : {
    notification : NotificationsQuery['notifications']['notifications'][0],
    divider : boolean
}){
    const router = useRouter();
    const [show, setShow] = useState(false);
    let {decreaseUnseenCount} = React.useContext(notificationContext);

    const [markQuery] = useMutation(MARK_NOTIFICATION_SEEN);
    
    return (
        <>
            <ListItem alignItems="flex-start" sx={{
                ':hover' : {
                    opacity : .7,
                }
            }} onClick={()=>{
                if(props.notification.applicationId){
                    router.push("/application/prevApplication/" + props.notification.applicationId);
                }
                else if(props.notification.voteId){
                    console.log("ah;lkfdjhkdjafh")
                    setShow(true);
                }
                if(!props.notification.seen){
                    markQuery({
                        variables : {
                            notificationId : props.notification.notificationId
                        },
                        onCompleted : ()=>{
                            decreaseUnseenCount();
                        }
                    })
                }
            }} >
                <ListItemText
                sx={{
                    color : "white"
                }}
                primary={<div>
                    {getPrimaryText(props.notification)}
                </div> }
                secondary={
                    <div>
                        {props.notification.text}. {getClickToSeeText(props.notification)}
                        <div>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                            >
                                {getTimeAMPM(props.notification.time)}, {getDayAndMonthAndYearString(props.notification.time)}
                            </Typography>
                        </div>
                    </div>
                } 
                />
                
            </ListItem>
            { props.divider && <Divider variant="fullWidth" component="li" />}
            {
                show && props.notification.vote &&
                <CustomizedDialog show={show} setShow={setShow} cardTitle={"Vote"} >
                    <VoteView setShow={setShow} vote={props.notification.vote!} />
                </CustomizedDialog>
            }
        </>
    )
}

function NotificationsList(props : {
    notifications : NotificationsQuery['notifications']
}){
    return (
        <MyCard title={"Notifications"}style={{
            border : "1px green solid"
        }}>
            <List sx={{ 
                overflowX : "hidden", overflowY : "scroll", maxHeight : 300, width: 350, bgcolor: 'background.paper' ,
                    "&::-webkit-scrollbar": {
                        width: 10
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#111111"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "grey",
                        borderRadius: 2
                    }
                }} onClick={ (e) => e.stopPropagation()} >
                {
                    props.notifications.notifications.map((n, i) =>(
                        <Notification divider = {i !== props.notifications.notifications.length - 1} key={n.notificationId} notification={n} />
                    ))
                }
            </List>
        </MyCard>        
    )
}

export default NotificationsList;

// export default function AlignItemsList() {
//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       <ListItem alignItems="flex-start">
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="fullWidth" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemText
//         sx={{
//             color : "white"
//         }}
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               {/* <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography> */}
//               {" Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="fullWidth" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//   );
// }
