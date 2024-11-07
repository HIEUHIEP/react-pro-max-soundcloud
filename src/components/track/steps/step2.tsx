'use client'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function LinearWithValueLabel(props: IProps) {

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={props.trackUpload.percent} />
        </Box>
    );
}

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

function InputFileUpload(props: any) {
    const { infor, setInfor } = props;
    const { data: session } = useSession();
    const handleUploadImage = async (image: any) => {
        const formData = new FormData();
        formData.append('fileUpload', image);

        try {
            const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    'target_type': 'images',
                    delay: '1000',
                },
            })
            setInfor({
                ...infor,
                imgUrl: res.data.data.fileName
            })
            // props.setTrackUpload({
            //     ...props.trackUpload,
            //     // fileName: acceptedFiles[0].name,
            //     uploadedTrackName: res.data.data.fileName
            //     // percent: percentCompleted
            // });
        } catch (error) {
            //@ts-ignore
            alert(error?.response?.data?.message);
        }
    }

    return (
        <Button
            onChange={(e) => {
                const event = e.target as HTMLInputElement;
                if (event.files) {
                    handleUploadImage(event.files[0]);
                    console.log(">>>", event.files[0]);;
                }

            }}
            component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}


interface IProps {
    trackUpload: {
        fileName: string,
        percent: number,
        uploadedTrackName: string,
    }
}
interface INewTrack {
    title: string,
    description: string,
    trackUrl: string,
    imgUrl: string,
    category: string,
}

const Step2 = (props: IProps) => {
    const [infor, setInfor] = React.useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: "",
    });
    const { trackUpload } = props;

    const { data: session } = useSession();
    const category = [
        {
            value: 'CHILL',
            label: 'CHILL',
        },
        {
            value: 'WORKOUT',
            label: 'WORKOUT',
        },
        {
            value: 'PARTY',
            label: 'PARTY',
        }
    ];

    React.useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfor({
                ...infor,
                trackUrl: trackUpload.uploadedTrackName
            })
        }
    }, [trackUpload])
    // console.log(infor);
    const handleSubmitForm = async () => {
        const res = await sendRequest<IBackendRes<ITrackTop[]>>({
            url: "http://localhost:8000/api/v1/tracks",
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.access_token}`,

            },
            body: {
                title: infor.title,
                description: infor.description,
                trackUrl: infor.trackUrl,
                imgUrl: infor.imgUrl,
                category: infor.category,
            },
        })
        // const d = await res.json();
        if (res.data) {
            alert("Create success");
        } else {
            alert(res.message);
        }
    }
    return (
        <div>
            <div>
                <div>
                    Your uploading track: {trackUpload.fileName}
                </div>
                <LinearWithValueLabel trackUpload={trackUpload} />
            </div>

            <Grid container spacing={2} mt={5}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 250, width: 250, background: "#ccc" }}>
                        <div>
                            {infor.imgUrl ?
                                <img height={250} width={250} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${infor.imgUrl}`}></img>
                                :
                                <></>}
                        </div>

                    </div>
                    <div >
                        <InputFileUpload infor={infor} setInfor={setInfor} />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        value={infor?.title}
                        onChange={(e) => setInfor({
                            ...infor,
                            title: e.target.value
                        })}
                        label="Title"
                        variant="standard"
                        fullWidth
                        margin="dense" />
                    <TextField
                        value={infor?.description}
                        onChange={(e) => setInfor({
                            ...infor,
                            description: e.target.value
                        })}
                        label="Description"
                        variant="standard"
                        fullWidth
                        margin="dense" />
                    <TextField
                        value={infor?.category}
                        onChange={(e) => setInfor({
                            ...infor,
                            category: e.target.value
                        })}
                        sx={{
                            mt: 3
                        }}
                        id="outlined-select-currency"
                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                    //   defaultValue="EUR"
                    >
                        {category.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        onClick={() => handleSubmitForm()}
                        variant="outlined"
                        sx={{
                            mt: 5
                        }}>Save</Button>
                </Grid>
            </Grid>

        </div>
    )
}


export default Step2;
