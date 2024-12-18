'use client'
import { AppBar, Box, Container } from "@mui/material"
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import { useHasMounted } from "@/utils/customHook";
import { useContext, useEffect, useRef } from "react";
import { TrackContext, useTrackContext } from "@/lib/track.wrapper";


const AppFooter = () => {
    const hasMounted = useHasMounted();
    const playerRef = useRef(null);
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    // console.log("trackContext: ", currentTrack);

    // console.log("check: ", process.env.NEXT_PUBLIC_BACKEND_URL)
    useEffect(() => {
        if (currentTrack?.isPlaying === false) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause();
        }
        if (currentTrack?.isPlaying === true) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.play();
        }
    }, [currentTrack])

    if (!hasMounted) return (<></>);

    return (
        <>
            {currentTrack._id &&
                <div style={{ marginBottom: 100 }}>
                    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2", }}>
                        <Container sx={{
                            display: "flex", gap: 10, ".rhap_main": {
                                gap: "30px"
                            }
                        }}>
                            <AudioPlayer
                                ref={playerRef}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                                volume={0.5}
                                style={{
                                    boxShadow: "unset",
                                    background: "#f2f2f2"
                                }}
                                layout="horizontal-reverse"
                                onPause={() => {
                                    setCurrentTrack({ ...currentTrack, isPlaying: false })
                                }}
                                onPlay={() => {
                                    setCurrentTrack({ ...currentTrack, isPlaying: true })
                                }}

                            // Try other props!
                            />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                justifyContent: "center",
                                width: "220px",
                            }}>
                                <div
                                    title={currentTrack.description}
                                    style={{
                                        width: "100%",
                                        color: "#ccc",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                >{currentTrack.description}</div>
                                <div
                                    title={currentTrack.title}
                                    style={{
                                        width: "100%",
                                        color: "black",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"

                                    }}>{currentTrack.title}</div>
                            </div>

                        </Container >
                    </AppBar>
                </div>
            }

        </>



    );
}

export default AppFooter;