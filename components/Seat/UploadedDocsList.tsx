import { Link } from "@mui/material"
import { ApplicationDetailsQuery } from "../../graphql/__generated__/graphql"
import { server } from "../utilities"



export const UploadedDocsList = (props : {
    files : ApplicationDetailsQuery['applicationDetails']['attachedFiles']
}) => {
    return (
        <ol style={{justifyContent: 'left', width: 500}}>
            {
                props.files  &&
                props.files.map(f =>{
                    return (
                        <li key={f.uploadedFile.uploadedFileId} style={{justifyContent: "space-between", padding: 5}}>
                            <div style={{
                                display : 'flex',
                                justifyContent: "space-between",
                                alignContent : "center"
                            }}>
                                <Link href = {server + f.uploadedFile.newFileName} underline="hover" target = "blank">
                                    {f.uploadedFile.fileName}
                                </Link>
                            </div>
                        </li>
                    )
                })
            }
        </ol>
    )
}