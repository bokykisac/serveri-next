import DashboardContainer from "@/components/DashboardContainer";
import axios from "@/lib/axios";
import { Partner } from "@/types/api";

const Home = async () => {
  const { data } = await axios.get<Partner[]>("/poslovni-partner/getAllTable");

  return <DashboardContainer partners={data} />;
};

export default Home;
