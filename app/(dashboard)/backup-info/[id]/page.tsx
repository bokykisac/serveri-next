import BackupInfo from "@/components/BackupInfo";
import axios from "@/lib/axios";

interface BackupInfoPageProps {
  params: { id: string };
  searchParams: { type: "partner" | "server" };
}

const BackupInfoPage = async ({
  params,
  searchParams,
}: BackupInfoPageProps) => {
  const { id } = params;
  const { type } = searchParams;

  let data = null;

  if (type === "partner") {
    data = await axios.get(`/backupinfo/getAllFromPartner/${id}/${30}`);
  } else if (type === "server") {
    data = await axios.get(`backupinfo/getAllFromServer/${id}/${365}`);
  } else {
    data = axios.get("/backupinfo/getAll/10");
  }

  return <BackupInfo items={data.data} />;
};

export default BackupInfoPage;
