import { useEffect, useState } from "react";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/useService";

import type { User } from "../types/user";

import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Pagination from "../components/common/Pagination";

import type { UserFormData } from "../utils/validation";

import { toast } from "react-toastify";

import { useDebounce } from "../hooks/useDebounce";
import UserTable from "../components/users/userTable";
import UserForm from "../components/users/userForm";
import DeleteModal from "../components/users/deleteModal";

const Dashboard = () => {

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  console.log("ooo", selectedUser)

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [search, setSearch] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 5;

  const debouncedSearch = useDebounce(
    search,
    500
  );

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.error(err);

      setError("Failed to fetch users");

      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleSubmitUser = async (
    data: UserFormData
  ) => {
    try {
      if (selectedUser) {

        await updateUser(selectedUser.id, data);

        toast.success(
          "User updated successfully"
        );
      } else {

        await createUser({
          ...data,
          createdAt: new Date().toISOString(),
        });

        toast.success(
          "User created successfully"
        );
      }


      await fetchUsers();


      setOpenModal(false);


      setSelectedUser(null);
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong");
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);

      toast.success(
        "User deleted successfully"
      );

      await fetchUsers();

      setDeleteModalOpen(false);

      setUserToDelete(null);
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete user");
    }
  };


  const filteredUsers = users.filter((user) => {

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        ) ||
      user.email
        .toLowerCase()
        .includes(
          debouncedSearch.toLowerCase()
        );


    const matchesStatus =
      statusFilter === "all"
        ? true
        : user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(
    filteredUsers.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          {error}
        </h2>

        <button
          onClick={fetchUsers}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            User Management Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all users efficiently
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
        >
          + Add User
        </Button>
      </div>


      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

          <option value="pending">
            Pending
          </option>
        </select>
      </div>

      {/* EMPTY STATE */}

      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Users Found
          </h2>

          <p className="text-gray-400 mt-2">
            Try changing search or filter
          </p>
        </div>
      ) : (
        <>
          {/* USER TABLE */}

          <UserTable
            users={paginatedUsers}
            onEdit={(user) => {
              setSelectedUser(user);
              setOpenModal(true);
            }}
            onDelete={(user) => {
              setUserToDelete(user);
              setDeleteModalOpen(true);
            }}
          />

          {/* PAGINATION */}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* ADD / EDIT MODAL */}

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedUser(null);
        }}
      >
        <h2 className="text-2xl font-bold mb-6">
          {selectedUser
            ? "Edit User"
            : "Add User"}
        </h2>

        <UserForm
          onSubmit={handleSubmitUser}
          initialData={selectedUser}
        />
      </Modal>

      {/* DELETE MODAL */}

      <DeleteModal
        open={deleteModalOpen}
        onClose={() =>
          setDeleteModalOpen(false)
        }
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Dashboard;