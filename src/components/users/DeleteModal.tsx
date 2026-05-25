import Modal from "../common/Modal";
import Button from "../common/Button";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal = ({ open, onClose, onDelete }: DeleteModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {/* TITLE */}

        <h2 className="text-2xl font-bold text-gray-800">Delete User</h2>

        {/* MESSAGE */}

        <p className="text-gray-600">
          Are you sure you want to delete this user?
        </p>

        <p className="text-sm text-red-500">This action cannot be undone.</p>

        {/* ACTION BUTTONS */}

        <div className="flex justify-end gap-3 mt-4">
          {/* CANCEL */}

          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>

          {/* DELETE */}

          <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
