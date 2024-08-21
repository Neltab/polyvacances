import { getVacationParticipants } from "@/app/api/vacations/Providers/server";
import ModifyParticipantsButton from "@/components/planner/vacations/ModifyParticipantsButton";
import { stringAvatar } from "@/lib/utils/avatar";
import { GRADIENT_STYLE } from "@/lib/utils/colors";
import { Avatar } from "@mui/material";

type Params = {
  vacationUUID: string;
}

export default async function Page({ params: { vacationUUID } }: { params: Params }) {

  const participants = await getVacationParticipants(vacationUUID);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold flex-none" style={GRADIENT_STYLE}>Participants</h2>
        <ModifyParticipantsButton participants={participants} vacationUUID={vacationUUID} />
      </div>
      <div className="flex flex-col gap-4">
        {participants.map((participant) => (
          <div key={participant.id} className="flex flex-row gap-4 items-center">
            <Avatar {...stringAvatar(participant.name)} />
            <span>{participant.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
