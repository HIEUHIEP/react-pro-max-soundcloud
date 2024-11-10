'use client'
import { Chip, Stack } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

interface IProps {
    track: ITrackTop | null;
}


const LikeTrack = (props: IProps) => {
    const { track } = props;
    const { data: session } = useSession();
    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>([]);
    const router = useRouter();
    const fetchData = async () => {
        if (session?.access_token) {
            const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `http://localhost:8000/api/v1/likes`,
                method: "GET",
                queryParams: {
                    current: 1,
                    pageSize: 100,
                    sort: "-createdAt"
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res2 && res2.data && res2.data.result) {
                setTrackLikes(res2.data.result)
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [session])

    const handleLikeTrack = async () => {
        const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `http://localhost:8000/api/v1/likes`,
            method: "POST",
            body: {
                track: track?._id,
                quantity: trackLikes?.some(t => t._id === track?._id) ? -1 : 1,
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        })
        fetchData();
        router.refresh();

    }
    return (
        <div style={{ display: "flex", marginTop: "15px", justifyContent: "space-between" }}>
            <div>
                <Chip
                    style={{ border: "1px solid #ccc" }}
                    icon={<FavoriteIcon />}
                    label={"Like"}
                    color={trackLikes?.some(t => t._id === track?._id) ? "error" : "default"}
                    onClick={handleLikeTrack}
                // onDelete={handleDelete}
                />
            </div>
            <div>
                <Chip
                    style={{ background: "none", marginRight: "5px" }}
                    icon={<PlayArrowIcon />}
                    label={track?.countPlay}

                // onClick={handleClick}
                // onDelete={handleDelete}
                /><Chip
                    style={{ background: "none" }}
                    icon={<FavoriteIcon />}
                    label={track?.countLike}
                // onClick={handleClick}
                // onDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export default LikeTrack;