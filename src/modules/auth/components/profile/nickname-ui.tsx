import Button from '@/components/commons/button';
import Text from '@/components/commons/text';
import { SquarePen } from 'lucide-react';

type NickNameProps = {
  isEditing: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onEdit: () => void;
};

const NicknameUI = ({
  isEditing,
  value,
  onChange,
  onSubmit,
  onEdit,
}: NickNameProps) => {
  return isEditing ? (
    <div className='flex w-[302px] items-center justify-center gap-4 px-6'>
      <input
        value={value}
        onChange={onChange}
        className='h-[44px] w-[156px] rounded-md border border-gray px-4 py-2 text-[18px]'
      />
      <Button size='nickName' onClick={onSubmit}>
        변경하기
      </Button>
    </div>
  ) : (
    <div className='mt-4 flex items-center gap-1'>
      <Text size='24px-semibold'>{value}</Text>
      <SquarePen size={20} className='cursor-pointer' onClick={onEdit} />
    </div>
  );
};

export default NicknameUI;
