import { IconButton, Link } from "@mui/material"
import { ApplicationDetailsQuery } from "../../graphql/__generated__/graphql"
import { server } from "../utilities"
import CloseIcon from '@mui/icons-material/Close';



export const UploadedDocsList = (props : {
    files : ApplicationDetailsQuery['applicationDetails']['attachedFiles'],
    removal? : {
        removedFileIds : number[],
        setRemovedFileIds : (v : number[])=>void
    },
}) => {
    return (
        <ol style={{justifyContent: 'left'}}>
            {
                props.files  &&
                props.files.map(f =>{
                    return (
                        <li key={f.uploadedFile.uploadedFileId} style={{justifyContent: "space-between", padding: 5}}>
                            <div style={{
                                display : 'flex',
                                justifyContent: "space-between",
                                alignItems : "center"
                            }}>
                                <Link href = {server + f.uploadedFile.newFileName} underline="hover" target = "blank">
                                    <span style = {{
                                        ... (props.removal && props.removal.removedFileIds.includes(f.uploadedFile.uploadedFileId) ? {textDecoration: "line-through"} : {})
                                    }}>
                                        {f.uploadedFile.fileName}
                                    </span>
                                </Link>
                                {
                                    props.removal &&
                                    <IconButton onClick={()=>{
                                        if(props.removal){

                                            if(!props.removal.removedFileIds.includes(f.uploadedFile.uploadedFileId)){
                                                props.removal?.setRemovedFileIds([...props.removal.removedFileIds, f.uploadedFile.uploadedFileId]);
                                            }
                                            else{
                                                props.removal.setRemovedFileIds(props.removal.removedFileIds.filter(id => id !== f.uploadedFile.uploadedFileId));
                                            }
                                        }

                                    }} >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ol>
    )
}