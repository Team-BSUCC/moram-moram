import Text from '@/components/commons/text';
import clsx from 'clsx';

type MandalartTitleTabProps = {
  id: string;
  title: string;
  value: string;
  handleClick: (title: string) => void;
};

const MandalartTitleTab = ({
  id,
  title,
  value,
  handleClick,
}: MandalartTitleTabProps) => {
  return (
    <button onClick={() => handleClick(id)}>
      <div
        className={clsx(
          'border-b-[2px] px-[2px] py-[10px]',
          id === value ? 'border-main' : 'border-white-dark'
        )}
      >
        <Text size='24px-semibold'>{title}</Text>
      </div>
    </button>
  );
};

export default MandalartTitleTab;
