import BackupInfo from "@/components/BackupinfoTable";
import axios from "@/lib/axios";
import { Backupinfo } from "@/types/api";

interface BackupInfoPageProps {
  params: { id: string };
  searchParams: { type: "partner" | "server" | undefined; partnerName: string };
}

const BackupInfoPage = async ({
  params,
  searchParams,
}: BackupInfoPageProps) => {
  const { id } = params;
  const { type, partnerName } = searchParams;

  let data = null;

  if (type === "partner") {
    data = await axios.get<Backupinfo[]>(
      `/backupinfo/getAllFromPartner/${id}/${30}`,
    );
  } else if (type === "server") {
    data = await axios.get<Backupinfo[]>(
      `backupinfo/getAllFromServer/${id}/${365}`,
    );
  } else {
    data = await axios.get<Backupinfo[]>("/backupinfo/getAll/10");
  }

  return <BackupInfo data={data.data} type={type} partnerName={partnerName}/>;
};

export default BackupInfoPage;
