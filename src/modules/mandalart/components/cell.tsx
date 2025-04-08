const Cell = ({ value, className }: { value: string; className?: string }) => {
  return (
    <div
      className={`border-gray-200 flex h-20 w-20 items-center justify-center border text-center text-xs ${className || ''}`}
      style={{ borderRadius: '8px' }}
    >
      {value}
    </div>
  );
};

export default Cell;
