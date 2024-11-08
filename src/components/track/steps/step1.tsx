'use client'
import { FileWithPath, useDropzone } from 'react-dropzone';
import './theme.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback, useState } from 'react';
import { sendRequest, sendRequestFile } from '@/utils/api';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface IProps {
    setValue: (v: number) => void,
    setTrackUpload: any,
    trackUpload: any,
}
const Step1 = (props: IProps) => {
    const [percent, setPercent] = useState(0);
    const { data: session } = useSession();
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        if (acceptedFiles && acceptedFiles[0]) {
            props.setValue(1);
            const audio = acceptedFiles[0];
            const formData = new FormData();
            formData.append('fileUpload', audio);

            try {
                const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                        'target_type': 'tracks',
                        delay: '2000',
                    },
                    onUploadProgress: progressEvent => {
                        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                        setPercent(percentCompleted);
                        props.setTrackUpload({
                            ...props.trackUpload,
                            fileName: acceptedFiles[0].name,
                            percent: percentCompleted
                        });
                        // do whatever you like with the percentage complete
                        // maybe dispatch an action that will update a progress bar or something
                        console.log(percentCompleted);
                    }
                })
                props.setTrackUpload((prevState: any) => ({
                    ...prevState,
                    // fileName: acceptedFiles[0].name,
                    uploadedTrackName: res.data.data.fileName
                    // percent: percentCompleted
                }));
            } catch (error) {
                //@ts-ignore
                alert(error?.response?.data?.message);
            }

        }
    }, [session])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio': ['.mp3', ".wav"]
        },
    });



    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Step1;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function InputFileUpload() {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={(event) => { event.preventDefault() }}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
            />
        </Button>
    );
}
