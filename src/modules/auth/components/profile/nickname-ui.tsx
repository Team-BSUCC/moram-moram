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
  const inputMaxLength = 10;

  const handleEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return isEditing ? (
    <div
      className='mt-4 flex w-full items-center justify-center gap-2 px-8'
      onClick={(e) => e.stopPropagation()}
    >
      <Input
        variant='nickname'
        sizes='18px-medium'
        maxLength={inputMaxLength}
        placeholder={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <Button
        size='nickName'
        variant='nickname'
        type='button'
        onClick={onSubmit}
      >
        변경하기
      </Button>
    </div>
  ) : (
    <div className='mt-4 flex h-[43px] items-center gap-1'>
      <Text size='24px-semibold'>{value}</Text>
      <SquarePen
        size={32}
        className='cursor-pointer p-1'
        onClick={(e) => {
          handleEditing(e);
        }}
      />
    </div>
  );
};

export default NicknameUI;
