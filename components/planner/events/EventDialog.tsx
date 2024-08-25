'use client'

import { useGetEvent, useGetEventPhotos, useUploadImages } from "@/app/api/events/Providers/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Event } from "@/app/api/events/types"
import { useMemo, useState, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageViewer from 'react-simple-image-viewer';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Vacation } from "@/app/api/vacations/types";
import EditEventButton from "./EditEventButton";

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

  const photosSrc = useMemo(() => photos?.map(photo => `${photo.photoUrl}`), [photos])

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
        <DialogContent className="max-h-screen">
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
              <Label htmlFor="picture">Ajouter des photos</Label>
              <Input id="picture" name='images' multiple accept="image/png, image/jpeg" type="file" />
            </div>
            <Button type="submit">Ajouter</Button>
          </form>
          <ResponsiveMasonry>
            <Masonry className="masonry overflow-y-scroll" gutter="10px">
              {photos.map((photo, index) => (
                <div key={index} className="masonry-item">
                  <img src={`${photo.photoUrl}`} alt="photo" onClick={ () => openImageViewer(index) } />
                </div>
              ))}
              </Masonry>
          </ResponsiveMasonry>
        </DialogContent>
      </Dialog>
      <Dialog open={isViewerOpen} onOpenChange={closeImageViewer}>
        <DialogContent className="w-screen h-screen max-w-none max-h-none">
          {isViewerOpen && photosSrc && (
            <ImageViewer
              src={ photosSrc }
              currentIndex={ currentImage }
              disableScroll={ false }
              closeOnClickOutside={ true }
              onClose={ closeImageViewer }
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}