interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  open,
  onClose,
  children,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        {children}

        <button
          onClick={onClose}
          className="mt-4 text-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;