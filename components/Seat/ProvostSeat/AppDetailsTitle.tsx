import Card from "@mui/material/Card"

export function Title(props : {
    text : string
}){

    return (
        <Card style={{margin: 30, textAlign: 'center', padding: 10, border: "1px solid white",
            borderRadius: 10, backgroundColor: 'black'}}>
            <h4>{props.text}</h4>
        </Card>
    )

}