import Skeleton from "@mui/material/Skeleton";

export default async function Page() {

  return (
    <div className="flex flex-col gap-6">
      <Skeleton variant="rounded" width={120} height={28} />
      <div className="flex flex-1 justify-between">
        <Skeleton variant="rounded" width={325} height={25} />
        <Skeleton variant="rounded" width={125} height={25} />
      </div>
      <div className="flex flex-1 justify-end">
        <Skeleton variant="rounded" width={175} height={25} />
      </div>
      <div className="flex flex-1 justify-between">
        <Skeleton variant="rounded" width={250} height={25} />
        <Skeleton variant="rounded" width={100} height={25} />
      </div>

      <div className="flex flex-1 justify-between pl-5">
        <Skeleton variant="rounded" width={325} height={20} />
        <Skeleton variant="rounded" width={125} height={20} />
      </div>
      <div className="flex flex-1 justify-between pl-5">
        <Skeleton variant="rounded" width={325} height={20} />
        <Skeleton variant="rounded" width={125} height={20} />
      </div>
    </div>
  )
}