'use client'
import { AppBar, Box, Container } from "@mui/material"
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import { useHasMounted } from "@/utils/customHook";


const AppFooter = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) return (<></>);
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2" }}>
            <Container sx={{ display: "flex", gap: 10 }}>
                <AudioPlayer
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                    volume={0.5}
                    style={{
                        boxShadow: "unset",
                        background: "#f2f2f2"
                    }}
                // Try other props!
                />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", minWidth: "100px" }}>
                    <Box sx={{ color: "#ccc" }}> Arthor </Box>
                    <Box sx={{ color: "black" }}> Name song </Box>
                </Box>
            </Container >
        </AppBar>

    );
}

export default AppFooter;