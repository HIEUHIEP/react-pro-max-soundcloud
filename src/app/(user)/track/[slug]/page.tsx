'use client'
import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container';

const DetailTrackPage = (props: any) => {
    const { param } = props;
    const searchParams = useSearchParams()
    const search = searchParams.get('audio')
    return (
        <Container>
            DetailTrackPage
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}
export default DetailTrackPage;