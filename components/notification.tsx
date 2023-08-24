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

function Notification(props : {
    notification : NotificationsQuery['notifications']['notifications'][0],
    divider : boolean
}){
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                sx={{
                    color : "white"
                }}
                primary={getPrimaryText(props.notification)}
                secondary={
                    <React.Fragment>
                        {props.notification.text}
                    </React.Fragment>
                }
                />
            </ListItem>
            { props.divider && <Divider variant="fullWidth" component="li" />}
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
                }}   >
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
