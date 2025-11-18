interface Props {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="bg-black text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
      >
        Previous
      </button>

      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className="bg-black text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
}
