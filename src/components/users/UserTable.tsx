import { Pencil, Trash2 } from "lucide-react";
import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <div className="overflow-auto bg-white rounded-xl shadow-sm">
      <table className="w-full min-w-175">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{user.name}</td>

              <td className="p-4">{user.email}</td>

              <td className="p-4">{user.role}</td>

              <td className="p-4">
                {(() => {
                  const status = user.status.toLowerCase();
                  const statusLabel =
                    status.charAt(0).toUpperCase() + status.slice(1);
                  const statusClass =
                    status === "active"
                      ? "bg-green-500"
                      : status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500";

                  return (
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${statusClass}`}
                    >
                      {statusLabel}
                    </span>
                  );
                })()}
              </td>

              <td className="p-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="p-4 flex gap-3">
                <button onClick={() => onEdit(user)}>
                  <Pencil size={18} />
                </button>

                <button onClick={() => onDelete(user)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
