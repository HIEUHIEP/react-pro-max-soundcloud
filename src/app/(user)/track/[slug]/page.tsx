
import WaveTrack from '@/components/track/wave.track';
// import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container';
import { sendRequest } from '@/utils/api';

const DetailTrackPage = async (props: any) => {
    const { params } = props;
    // const searchParams = useSearchParams()
    // const search = searchParams.get('audio')

    const resComment = await sendRequest<IBackendRes<IModelPaginate<ITrackComment[]>>>({
        url: `http://localhost:8000/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: params.slug,
            sort: "-createdAt",
        },
    });

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: "GET",
        nextOption: { cache: "no-store" }
    });
    // console.log("check comment: ", resComment);
    return (
        <Container>
            DetailTrackPage
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                    comment={resComment?.data?.result ?? null}
                />
            </div>
        </Container>
    )
}
export default DetailTrackPage;