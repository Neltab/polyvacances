'use client'

import { useGetEvent, useGetEventPhotos, useUploadImages } from "@/app/api/events/Providers/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Event } from "@/app/api/events/types"
import { useMemo, useState, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Vacation } from "@/app/api/vacations/types";
import EditEventButton from "./EditEventButton";
//@ts-ignore
import ReactImageVideoLightbox from "react-image-video-viewer";
import { Label } from "@/components/ui/label";
//@ts-ignore
import VideoThumbnail from 'react-video-thumbnail';

type EventDialogProps = {
  open: boolean,
  vacation: Vacation,
  onClose: () => void,
  event: Event,
}

export default function EventDialog({
  open,
  vacation,
  onClose,
  event: { id: eventId},
}: EventDialogProps) {
  const queryClient = useQueryClient();

  const { data: event } = useGetEvent(eventId);
  const { data: photos } = useGetEventPhotos(eventId);
  const photoMutation = useUploadImages(queryClient, eventId);

  const photosSrc = useMemo(() => photos?.map(photo => ({
    url: photo.photoUrl,
    type: photo.type,
  })), [photos])

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  if (!photos || !event) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-between">
              <p>{event.title}</p>
              <EditEventButton event={event} vacation={vacation} />
            </DialogTitle>
            <DialogDescription>
              {event.description}
            </DialogDescription>
          </DialogHeader>
            <form className="flex justify-between w-full items-center gap-1.5" action={photoMutation.mutate}>
              <div>
                  <Label>Ajouter des photos</Label>
                  <Input multiple accept="image/png, image/jpeg, video/mp4" type="file" name="files"/>
              </div>
              <Button status={photoMutation.status} type="submit">Ajouter</Button>
            </form>
          <ResponsiveMasonry>
            <Masonry className="masonry overflow-y-scroll max-h-96" gutter="10px">
              {photos.map((photo, index) => (
                <div key={index} className="masonry-item" onClick={ () => openImageViewer(index) } >
                  {
                    photo.type === "video" 
                    ? <VideoThumbnail videoUrl={`${photo.photoUrl}` } snapshotAtTime={0}/>
                    : <img src={`${photo.photoUrl}`} alt="photo"/>
                  }
                </div>
              ))}
              </Masonry>
          </ResponsiveMasonry>
        </DialogContent>
      </Dialog>
      <Dialog open={isViewerOpen} onOpenChange={closeImageViewer}>
        <DialogContent className="w-screen h-screen max-w-none max-h-none image-video-dialog">
          {isViewerOpen && photosSrc && (
            <>
              <style>{`
                .image-video-dialog > div > div {
                  z-index: 9999;
                }
              `}</style>
              <ReactImageVideoLightbox
                data={ photosSrc }
                startIndex={ currentImage }
                // disableScroll={ false }
                // closeOnClickOutside={ true }
                onCloseCallback={ closeImageViewer }
                />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}