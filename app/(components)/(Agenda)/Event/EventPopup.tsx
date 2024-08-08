'use client'

import FileUploadForm from '@/app/(components)/Form/FilesUpload';
import { COLORS } from '@/app/(components)/utils/colors';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Event } from './types';
import './style.css'
import { useGetEventPhotos } from './Providers/client';
import Image from 'next/image';

type EventPopupProps = {
  event: Event;
}

export const EventPopup = ({event}: EventPopupProps) => {
  const {data: photos, status} = useGetEventPhotos(event?.id || 0);

  if (status !== 'success') {
    return <div>Loading...</div>
  }

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
              <Image src={photo.photoUrl} alt="photo" />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}