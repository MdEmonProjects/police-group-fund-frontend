import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SortableTable from "../../components/Tables/SortableTable";
import { useGetInactiveUserDetailsQuery, usePostUpdateUserStatusMutation } from "../../features/admin/donerinfo/donerInfoQuerySlice";
import Swal from "sweetalert2";
import SvgIcon from "../../components/icons/SvgIcon";

const AccountRequest = ({ pageTitle }) => {
  const dispatch = useDispatch();
  const { data: inactiveUsers, isLoading } = useGetInactiveUserDetailsQuery();
  const [updateUserStatus] = usePostUpdateUserStatusMutation();
  useEffect(() => {
    console.log(inactiveUsers);

  }, [inactiveUsers])
  const handleEdit = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this teacher's status. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      draggable: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = updateUserStatus({
            userId: user.id,
            status: 1
          }).unwrap();

          // This will run if successful
          console.log('Success response:', response);
          Swal.fire({
            title: "Teacher register successful!",
            text: response.message || "Teacher status updated successfully",
            icon: "success",
            draggable: true,
          });
        } catch (error) {
          // This will only run if there's a REAL error
          console.error('User status update failed:', error);

          // Check if the error is actually a success response
          if (error?.data?.message === "User status updated successfully") {
            // Handle as success instead
            Swal.fire({
              title: "Success!",
              text: error.data.message,
              icon: "success",
              draggable: true,
            });
          } else {
            // Real error
            Swal.fire({
              title: "Error!",
              text: error?.data?.message || "Failed to update teacher status",
              icon: "error",
              draggable: true,
            });
          }
        }
      }
    });
  };
  const columns = [
    {
      title: "Phone Number",
      hozAlign: "center",
      field: "phone_number",
    },
    {
      title: "Name",
      field: "name",
      hozAlign: "center",
    },
    {
      title: "National ID",
      field: "Nid",
      hozAlign: "center",
    },
    {
      title: "Email",
      field: "Email",
      hozAlign: "center",
    },
    {
      title: "Action",
      hozAlign: "center",
      render: (row) => (
        <div className="flex justify-center items-center gap-2">
          <button
            className="p-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
            title="View"
            onClick={() => handleEdit(row)}
          >
            Approve
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="">
      <SortableTable columns={columns} data={inactiveUsers || []} />
    </div>
  );
};
export default AccountRequest;
