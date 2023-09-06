import { Button, ButtonProps } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createMixins';

export function MyButton(props : {
    type : 'submit' | 'cancel' | 'intermediate' | 'black',
    text : string,
    className? : string,
    onClick? : ()=>void,
    buttonProps? : ButtonProps,
    children? : React.ReactNode,
    isLabel? : boolean,
    style? : CSSProperties
}){
    let comp = {

    }
    if(props.isLabel){
        comp = {
            component : "label"
        }
    }
    let submitColor = "#00868D";
    let cancelColor = "#FF0000";
    let intermediateColor = "#FF6B00";
    let black = "#000000";
    let sxProps = {
        backgroundColor : submitColor,
        color : "white",
        ":hover" : {
            backgroundColor : submitColor,
            opacity : .8
        }
    }
    if(props.type == 'cancel'){
        sxProps.backgroundColor = cancelColor;
        sxProps[':hover'].backgroundColor = cancelColor;
    }
    else if(props.type == 'intermediate'){
        sxProps.backgroundColor = intermediateColor;
        sxProps[':hover'].backgroundColor = intermediateColor;
    }
    else if(props.type == 'black'){
        sxProps.backgroundColor = black;
        sxProps[':hover'].backgroundColor = black;
    }
    
    return (
        <Button {...comp} variant='contained' onClick={(e)=>{
            if(props.onClick) props.onClick();
        }} {... props.buttonProps} sx={sxProps} style={{
            ... props.style
        }} > {props.text} {props.children} </Button>
    )
}