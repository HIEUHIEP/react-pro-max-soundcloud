
import WaveTrack from '@/components/track/wave.track';
// import { useSearchParams } from 'next/navigation'
import Container from '@mui/material/Container';
import { sendRequest } from '@/utils/api';

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = (await params).slug

    // fetch data
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${slug}`,
        method: "GET",
    });
    // const product = await fetch(`https://.../${slug}`).then((res) => res.json())

    return {
        title: res?.data?.title,
        description: res?.data?.description,
    }
}

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