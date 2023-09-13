import React, {CSSProperties, ReactNode} from 'react';
import Card from 'react-bootstrap/Card';

function MyCard(props: {
    title: string | React.JSX.Element,
    style?: CSSProperties,
    children?: ReactNode
}) {
    return (
        <Card style={{color: "white", backgroundColor: "#202020", display: "inline-block", ...props.style}}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                {props.children}
            </Card.Body>
        </Card>
    );
}

export default MyCard;