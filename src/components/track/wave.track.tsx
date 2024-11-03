'use client'
import { useEffect } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useRef } from 'react';

const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        WaveSurfer.create({
            container: containerRef.current!, // ! chắc chắn có tồn tại
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: '/audio/hoidanit.mp3',
        })
    }, [])
    return (
        <div ref={containerRef}>
            WaveTrack
        </div>
    )
}

export default WaveTrack;