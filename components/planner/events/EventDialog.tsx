'use client'

import { useGetEventPhotos, useUploadImages } from "@/app/api/events/Providers/client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Event } from "@/app/api/events/types"
import { useMemo, useState, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageViewer from 'react-simple-image-viewer';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

type EventDialogProps = {
  open: boolean,
  onClose: () => void,
  event: Event,
}

export default function EventDialog({
  open,
  onClose,
  event,
}: EventDialogProps) {
  const queryClient = useQueryClient();

  const {data: photos, status} = useGetEventPhotos(event.id);
  const photoMutation = useUploadImages(queryClient, event.id);

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

  if (status !== 'success') {
    return <div>Loading...</div>
  }

  return (
    <>
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
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
            <Masonry className="masonry" gutter="10px">
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