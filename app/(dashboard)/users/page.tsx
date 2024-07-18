import AddNewUserForm from "@/components/forms/AddNewUserForm";
import axios from "@/lib/axios";
import { User } from "@/types/api";

const Users = async () => {
  const { data: users } = await axios.get<User[]>("/user/getAll");

  return (
    <div className="m-auto max-w-7xl border bg-stone-100 p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <AddNewUserForm />
        </div>
        <div className="flex flex-col">Table</div>
      </div>
    </div>
  );
};

export default Users;
