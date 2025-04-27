import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
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
    <div className='mt-4 flex w-[302px] items-center justify-center gap-2 px-6'>
      <Input
        variant='nickname'
        sizes='18px-medium'
        value={value}
        onChange={onChange}
      />
      <Button size='nickName' onClick={onSubmit}>
        변경하기
      </Button>
    </div>
  ) : (
    <div className='mt-4 flex h-[44px] items-center gap-1'>
      <Text size='24px-semibold'>{value}</Text>
      <SquarePen size={20} className='cursor-pointer' onClick={onEdit} />
    </div>
  );
};

export default NicknameUI;
