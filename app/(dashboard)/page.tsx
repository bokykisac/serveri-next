import DashboardContainer from "@/components/DashboardContainer";
import axios from "@/lib/axios";
import { SelectOption } from "@/types/api";

const Home = async () => {
  const { data } = await axios.get<SelectOption[]>("/poslovni-partner/getAllTable");

  return <DashboardContainer partners={data} />;
};

export default Home;
