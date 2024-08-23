'use server'

import { getVacationPhotos } from "@/app/api/vacations/Providers/server";
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
  const photos = await getVacationPhotos(vacationUUID);

  const photosByEvent = photos.reduce((acc, photo) => {
    const eventTitle = photo.event.title;
    if (!acc[eventTitle]) {
      acc[eventTitle] = [];
    }
    acc[eventTitle].push(photo);
    return acc;
  }, {} as Record<string, EventPhotos[]>);

  return (
    <Card className="flex-none">
      {
        Object.entries(photosByEvent).map(([eventTitle, photos]) => (
          <div key={eventTitle} className="flex flex-col gap-2 font-bold">
            <h2 className="text-lg">{eventTitle}</h2>
            <div className="flex w-full flex-row overflow-x-scroll gap-4">
              {photos.map((photo) => (
                <img key={photo.id} src={photo.photoUrl} className="max-h-[250px] object-scale-down" alt="" />
              ))}
            </div>
          </div>
        ))
      }
    </Card>
  )
}