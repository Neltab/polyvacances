'use client'

import FileUploadForm from '@/app/Form/FilesUpload';
import { COLORS } from '@/app/utils/colors';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Event } from './types';
import './style.css'
import { useGetEventPhotos } from './Providers/client';
import { useCallback, useMemo, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';

type EventPopupProps = {
  event: Event;
}

export const EventPopup = ({event}: EventPopupProps) => {
  const {data: photos, status} = useGetEventPhotos(event?.id || 0);

  const photosSrc = useMemo(() => photos?.map(photo => photo.photoUrl), [photos])

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

  console.log(photos, photosSrc, currentImage)

  return (
    <div className="event-modal" style={{backgroundColor: COLORS.tags[event?.tag || 'ACTIVITE'].background}}>
      <div className='event-text-container'>
        <h2>{event?.title}</h2>
        <p>{event?.description}</p>
      </div>
      <FileUploadForm event={event}/>
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
      >
        <Masonry className="masonry" gutter="10px">
          {photos.map((photo, index) => (
            <div key={index} className="masonry-item">
              <img src={photo.photoUrl} alt="photo" onClick={ () => openImageViewer(index) } />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {isViewerOpen && photosSrc && (
        <ImageViewer
          src={ photosSrc }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
    </div>
  );
}