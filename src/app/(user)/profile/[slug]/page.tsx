import { sendRequest } from "@/utils/api"

const ProfilePage = async ({ params, }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug
    console.log("check: ", process.env.NEXT_PUBLIC_BACKEND_URL)
    const tracks = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: `http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10`,
        method: "POST",
        body: { id: slug },
    })
    console.log("check tracks: ", tracks)
    return (
        <div>ProfilePage Slug {slug}</div>
    )
}

export default ProfilePage;