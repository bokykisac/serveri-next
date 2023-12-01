import ColleaguesPage from "@/components/colleagues/ColleaguesPage";
import axios from "@/lib/axios";

const Colleagues = async () => {
  const { data } = await axios.get("/zaposleni/getAllPageable?page=1&size=16");

  return <ColleaguesPage initialColleagues={data} />;
};

export default Colleagues;
