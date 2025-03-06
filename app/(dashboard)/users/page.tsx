import AddNewUserForm from "@/components/forms/AddNewUserForm";
import { DataTable } from "@/components/ui/DataTable";
import axios from "@/lib/axios";
import { User } from "@/types/api";
import { columns } from "@/components/table/table-columns/user-columns";

const Users = async () => {
  const { data: users } = await axios.get<User[]>("/user/getAll");

  return (
    <div className="m-auto max-w-7xl bg-gray-50 p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col border shadow-md">
          <AddNewUserForm />
        </div>
        <div className="flex flex-col">
          <DataTable columns={columns} data={users} sortable />
        </div>
      </div>
    </div>
  );
};

export default Users;
