import { Dispatch, SetStateAction } from 'react';

const COLORS = [
  '#F7B7C3',
  '#F48C96',
  '#FF9664',
  '#FCE645',
  '#A8D871',
  '#9BCFEA',
  '#7CBFE4',
  '#A496E4',
];

type ColorpickerProps = {
  selectedColor: number;
  setSelectedColor: Dispatch<SetStateAction<number>>;
};

export default function ColorPicker({
  selectedColor,
  setSelectedColor,
}: ColorpickerProps) {
  return (
    <div
      className='flex w-fit justify-center gap-2 rounded-lg border-[1px] border-assist p-2'
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {COLORS.map((color, index) => (
        <label key={index} className='relative'>
          <input
            type='radio'
            name='color'
            value={index}
            checked={selectedColor === index}
            onChange={(e) => {
              setSelectedColor(index);
              e.stopPropagation();
              e.preventDefault();
            }}
            className='sr-only'
          />
          <div
            className='h-[28px] w-[28px] cursor-pointer rounded-md transition duration-200 hover:scale-[1.2] active:scale-[1] sm:h-[40px] sm:w-[40px]'
            style={{
              backgroundColor: color,
              boxShadow:
                selectedColor === index
                  ? '0 0 0 1px white, 0 0 0 3px black'
                  : 'none',
            }}
          >
            {selectedColor === index && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='select-none text-xl text-black'>✔</span>
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
