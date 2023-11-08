interface BackupInfoPageProps {
  searchParams: { type: "partner" | "server"; id: string };
}

const BackupInfoPage = ({ searchParams }: BackupInfoPageProps) => {
  return <div>Backup info</div>;
};

export default BackupInfoPage;
