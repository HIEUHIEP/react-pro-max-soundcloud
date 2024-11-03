'use client'
import { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    useEffect(() => {
        WaveSurfer.create({
            container: containerRef.current!, // ! chắc chắn có tồn tại
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: `/api?audio=${fileName}`,
        })
    }, [])
    return (
        <div ref={containerRef}>
            WaveTrack
        </div>
    )
}

export default WaveTrack;