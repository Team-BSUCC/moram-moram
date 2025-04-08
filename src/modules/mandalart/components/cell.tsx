const Cell = ({ value, className }: { value: string; className?: string }) => {
  return (
    <div
      className={`border-gray-200 flex h-20 w-20 items-center justify-center rounded-lg border text-center text-xs ${className || ''}`}
    >
      {value}
    </div>
  );
};

export default Cell;
