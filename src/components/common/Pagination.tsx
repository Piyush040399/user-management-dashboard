interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex gap-2 justify-end mt-6 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="px-3 py-2 bg-gray-200 rounded"
      >
        Prev
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => (
          <button
            key={i}
            onClick={() =>
              onPageChange(i + 1)
            }
            className={`px-3 py-2 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="px-3 py-2 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;