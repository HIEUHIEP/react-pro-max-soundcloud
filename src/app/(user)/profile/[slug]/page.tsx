'use client'

import ProfileTrack from "@/components/header/profile.track"
import { sendRequest } from "@/utils/api"
import { Container, Grid } from "@mui/material"

const ProfilePage = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug

    console.log("check: ", process.env.NEXT_PUBLIC_BACKEND_URL)
    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10`,
        method: "POST",
        body: { id: slug },
    })
    const data = tracks?.data?.result ?? []
    console.log("check tracks: ", tracks)
    return (
        // <div>ProfilePage Slug {slug}</div>
        <>
            <Container>
                <Grid container spacing={5}>
                    {data.map((track: ITrackTop, index: number) => {
                        return (
                            <Grid item xs={6}>
                                <ProfileTrack data={track} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </>
    )
}

export default ProfilePage;