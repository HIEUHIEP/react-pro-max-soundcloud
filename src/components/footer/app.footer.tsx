'use client'
import { AppBar, Box, Container } from "@mui/material"
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import { useHasMounted } from "@/utils/customHook";
import { useContext } from "react";
import { TrackContext, useTrackContext } from "@/lib/track.wrapper";


const AppFooter = () => {
    const hasMounted = useHasMounted();
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    console.log("trackContext: ", currentTrack);
    if (!hasMounted) return (<></>);
    // console.log("check: ", process.env.NEXT_PUBLIC_BACKEND_URL)
    return (
        <div style={{ marginBottom: 100 }}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2", }}>
                <Container sx={{
                    display: "flex", gap: 10, ".rhap_main": {
                        gap: "30px"
                    }
                }}>
                    <AudioPlayer
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        volume={0.5}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2"
                        }}
                        layout="horizontal-reverse"
                    // Try other props!
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", minWidth: "100px" }}>
                        <Box sx={{ color: "#ccc" }}> Arthor </Box>
                        <Box sx={{ color: "black" }}> Name song </Box>
                    </Box>
                </Container >
            </AppBar>
        </div>


    );
}

export default AppFooter;