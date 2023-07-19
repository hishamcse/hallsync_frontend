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

import Card from 'react-bootstrap/Card';

function MyCard(props : {
    title : string,
    content : React.JSX.Element
}) {
  return (
    <Card style={{ color : "white", backgroundColor : "#202020", display : "inline-block" }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MyCard;