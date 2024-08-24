import Skeleton from "@mui/material/Skeleton";

export default async function Page() {

  return (
    <div className="flex flex-col gap-6">
      <Skeleton variant="rounded" width={120} height={28} />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-2 flex-1">
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={250} height={25} />
        </div>
        <div className="flex gap-2 flex-1">
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={225} height={25} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-2 flex-1">
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={250} height={25} />
        </div>
        <div className="flex gap-2 flex-1">
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={250} height={25} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex gap-2 flex-1">
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={250} height={25} />
        </div>
        <div className="flex gap-2 flex-1">
          <Skeleton variant="rounded" width={25} height={25} />
          <Skeleton variant="rounded" width={250} height={25} />
        </div>
      </div>
    </div>
  )
}