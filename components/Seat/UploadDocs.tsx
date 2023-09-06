import { Button, IconButton } from "@mui/material"
import { ChangeEvent } from "react"
import CloseIcon from '@mui/icons-material/Close';

export const UploadDocs = (props : {
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    files : File[],
    removeFile  : (f : File)=>void
}) => {
    return (
        <div style={{justifyContent: 'left'}}>
            <ol style = {{
                margin : "5px"
            }}>
                {
                    props.files.map(f => (
                        <li style = {{
                            padding : "5px",
                        }}  key = {f.name}> 
                        <div style={{
                            display : "flex",
                            justifyContent : "space-between",
                            alignItems : "center"
                        }}>
                            {f.name}
                            <IconButton onClick={(_)=>props.removeFile(f)} >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>
                        </li>
                    )
                    )
                }
            </ol>
            
            {   
                <Button variant="outlined" component="label"  >
                    Upload file
                    <input type="file" hidden onChange={props.onChange} />
                </Button>
            }
        </div>
    )
}
