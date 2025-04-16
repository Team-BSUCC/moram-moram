import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

type CursorProps = {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  name: string;
};

export const Cursor = ({ className, style, color, name }: CursorProps) => {
  return (
    <div className={cn('pointer-events-none', className)} style={style}>
      <Pencil color={color} fill={color} size={30} />

      <div
        className='mt-1 rounded px-2 py-1 text-center text-xs font-bold text-white'
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
};
