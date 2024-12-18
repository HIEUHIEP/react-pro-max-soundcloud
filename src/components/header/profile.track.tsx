'use client'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTrackContext } from '@/lib/track.wrapper';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from 'react';
import Link from 'next/link';
import { convertSlugUrl } from '@/utils/api';

interface IProps {
    data: ITrackTop
}
const ProfileTracks = (props: IProps) => {
    const { data } = props;
    const theme = useTheme();
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    // const [isPlaying, setIsPlaying] = useState(false);
    return (
        <Card sx={{ display: 'flex', justifyContent: "space-between", marginTop: "50px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link href={`/track/${convertSlugUrl(data.title)}-${data._id}.html?audio=${data.trackUrl}`}>
                        <Typography style={{
                            textDecoration: "none",
                            color: "unset"
                        }}
                            component="div" variant="h5">

                            <h4>{data.title}</h4>

                        </Typography>
                    </Link>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {data.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    {currentTrack._id === data._id && currentTrack.isPlaying ?
                        <PauseIcon sx={{ height: 38, width: 38 }}
                            onClick={() => {
                                setCurrentTrack({ ...currentTrack, isPlaying: false })
                            }}
                        />
                        :
                        <IconButton aria-label="play/pause"
                            onClick={() => {
                                setCurrentTrack({ ...data, isPlaying: true })
                            }}>
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    }



                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`http://localhost:8000/images/${data.imgUrl}`}
                alt="Live from space album cover"
            />
        </Card>
    );
}

export default ProfileTracks;
