"use client"

import { EventPhotos, VacationPhotos } from "@prisma/client"
//@ts-ignore
import VideoThumbnail from 'react-video-thumbnail';

type ImageOrVideoThumbnailProps = {
  photo: EventPhotos | VacationPhotos,
}

export default function ImageOrVideoThumbnail({
  photo,
}: ImageOrVideoThumbnailProps) {
  if (photo.type === "video") {
    return <VideoThumbnail videoUrl={`${photo.photoUrl}`} snapshotAtTime={0}/>
  }

  return <img src={`${photo.photoUrl}`} alt="photo"/>
}