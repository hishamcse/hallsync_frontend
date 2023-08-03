import { Button } from "@mui/material";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import MyCard from "./card";



export function UploadFile() {

    const [files, setFiles] = useState<Blob[]>([])

    function handleChange(event : ChangeEvent<HTMLInputElement>) {
        console.log(event)
        setFiles((f) => {
            if(event.target.files)
                return [...f , event.target.files[0]]
            return f;
        })
    }
    function handleSubmit(event : FormEvent<HTMLFormElement>) {
        console.log("here");
        event.preventDefault()
        const url = 'http://localhost:3000/upload';
        const formData = new FormData();
        files.forEach(f =>{
            formData.append('file', f);
            formData.append('filename', f.name);
        })
        let token = localStorage.getItem('token');

        fetch(url, {
            method : 'post',
            body : formData,
            headers : {
                'authorization' : 'Bearer ' + token
            }
            // ... config
        }).then(resp => resp.json()).then(data =>{
            console.log(data);
        })
        .catch(err =>{
            console.log(err);
        })


    }
    return (
        <div className="App" style={{color : "white"}}>
            <MyCard content={
                <form onSubmit={handleSubmit}>
                    <ol>
                        {
                            files.map(f => <li key = {f.name}> {f.name}</li>)
                        }
                    </ol>
                    <Button variant="outlined" component="label"  >
                        Upload file
                        <input type="file" hidden onChange={handleChange}  />
                    </Button>
                    {/* <button type="submit">Upload</button> */}
                </form>
            } 
            title = "Uploaded documents"
            />
        </div>
    )
}