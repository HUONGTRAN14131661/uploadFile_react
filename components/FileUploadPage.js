import { useState } from "react"

export default function FileUploadpage(){
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (e) => {
        setSelectedFile(e.target.file[0]);
        setIsFilePicked(true);
    }
    const handleSubmission = () => {
        
    }

    return (
        <div>
            <input type="file" name="file" onChangle = {changeHandler}></input>
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}