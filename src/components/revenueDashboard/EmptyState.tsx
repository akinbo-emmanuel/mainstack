import { IoReceiptOutline } from "react-icons/io5";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col justify-center py-16 px-4 w-full max-w-sm mx-auto">
      <div className="size-12 rounded-full bg-[#EFF1F6] flex items-center justify-center mb-5">
        <IoReceiptOutline size={24} />
      </div>

      <h3 className="text-[28px]/10 font-bold text-[#131316] mb-2">
        No matching transaction found for the selected filter
      </h3>

      <p className="text-base/6 text-[#56616B] mb-8">
        Change your filters to see more results, or add a new product.
      </p>

      <div className="flex">
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-[#EFF1F6] hover:bg-[#E5E7EB] text-[#131316] font-semibold rounded-full transition-colors"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}
