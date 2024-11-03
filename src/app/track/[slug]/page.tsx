'use client'
import { useSearchParams } from 'next/navigation'


const DetailTrackPage = (props: any) => {
    const { param } = props;
    const searchParams = useSearchParams()
    const search = searchParams.get('audio')
    return (
        <div>
            DetailTrackPage
        </div>
    )
}
export default DetailTrackPage;