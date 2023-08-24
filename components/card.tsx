// import styles from '../styles/card.module.scss'


// export function Card(
//     props : {
//         title : string,
//         body : React.JSX.Element
//     }
// ){


//     return (
//         <div className={styles.root}>
//             <div className={styles.header}>
//                 {props.title}
//             </div>
//             <div>
//                 {props.body}
//             </div>
//         </div>
//     )
// }

import React, { CSSProperties, ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

function MyCard(props : {
    title : string | React.JSX.Element,
    style? : CSSProperties,
    children?: ReactNode
}) {
  return (
    <Card style={{ color : "white", backgroundColor : "#202020", display : "inline-block", ... props.style }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {/* <Card.Text> */}
            {props.children}
        {/* </Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default MyCard;