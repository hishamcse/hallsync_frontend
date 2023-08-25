import { Button, IconButton } from "@mui/material"
import { ChangeEvent } from "react"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const UploadDocs = (props : {
    onChange : (e : ChangeEvent<HTMLInputElement>) => void,
    files : Blob[],
    removeFile  : (f : Blob)=>void
}) => {
    return (
        <div style={{justifyContent: 'left', width: 500}}>
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
                                <CloseOutlinedIcon />
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
