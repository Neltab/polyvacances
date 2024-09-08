'use server'

import { getVacationPhotos } from "@/app/api/vacations/Providers/server";
import UploadFilesBulkForm from "@/components/planner/files/uploadFilesBulkForm";
import Card from "@/components/ui/Card";
import { EventPhotos } from "@prisma/client";

type PhotosProps = {
  params: {
    vacationUUID: string;
  };
}

export default async function Photos({
  params: {
    vacationUUID,
  },
}: PhotosProps) {
  const {eventPhotos, vacationPhotos} = await getVacationPhotos(vacationUUID);

  const photosByEvent = eventPhotos.reduce((acc, photo) => {
    const eventTitle = photo.event.title;
    if (!acc[eventTitle]) {
      acc[eventTitle] = [];
    }
    acc[eventTitle].push(photo);
    return acc;
  }, {} as Record<string, EventPhotos[]>);

  // console.log(photosByEvent);
  console.log(vacationPhotos);

  return (
    <>
      <UploadFilesBulkForm vacationUUID={vacationUUID} />
      {
        Object.entries(photosByEvent).map(([eventTitle, photos]) => (
          <Card key={eventTitle} className="flex-none flex flex-col gap-2">
              <h2 className="text-lg font-bold">{eventTitle}</h2>
              <div className="flex w-full flex-row overflow-x-scroll gap-4">
                {photos.map((photo) => (
                  photo.type === "video" 
                  ? <video key={photo.id} className="max-h-[250px] object-scale-down" controls >
                      <source src={photo.photoUrl} type="video/mp4"/>
                    </video>
                  : <img key={photo.id} src={photo.photoUrl} className="max-h-[250px] object-scale-down" alt="" />
                ))}
              </div>
          </Card>
        ))
      }
      {
        vacationPhotos.length > 0 && 
        <Card className="flex-none flex flex-col gap-2">
          <h2 className="text-lg font-bold">Autres photos</h2>
          <div className="flex w-full flex-row overflow-x-scroll gap-4">
            {vacationPhotos.map((photo) => (
              photo.type === "video" 
              ? <video key={photo.id} className="max-h-[250px] object-scale-down" controls >
                  <source src={photo.photoUrl} type="video/mp4"/>
                </video>
              : <img key={photo.id} src={photo.photoUrl} className="max-h-[250px] object-scale-down" alt="" />
            ))}
          </div>
        </Card>
      }
    </>
  )
}