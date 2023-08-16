import { Button, ButtonProps } from "react-bootstrap";
import styles from '../styles/components.module.scss'

export function MyButton(props : {
    type : 'submit' | 'cancel' | 'intermediate',
    text : string,
    className? : string,
    onClick : ()=>void,
    buttonProps? : ButtonProps
}){
    let className = styles.submit;

    if(props.type == 'cancel') className = styles.cancel;
    else if(props.type == 'intermediate') className = styles.intermediate;
    
    return (
        <Button onClick={(e)=>props.onClick()} {... props.buttonProps} className={styles.mybutton + ' ' +  className + ' ' + props.className} > {props.text} </Button>
    )
}