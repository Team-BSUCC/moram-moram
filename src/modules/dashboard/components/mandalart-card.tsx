import CircularProgress from '@/components/commons/circular-progress';
import Spacer from '@/components/commons/spacer';
import CardButtonDropDown from './card-button-drop-down';

type MandalartCardProps = {
  bandColor: string;
};

const MandalartCard = ({ bandColor }: MandalartCardProps) => {
  return (
    <div className={`${bandColor} w-fit rounded-br-lg shadow-md`}>
      <div className='ml-3 w-96 rounded-br-lg bg-white-light'>
        <div className='flex-col p-3'>
          <div className='flex justify-between'>
            <div>365남음/날짜</div>
            <CardButtonDropDown />
          </div>
          <div className='flex-col'>
            <p>성장의 해</p>
            <p>완수한다!</p>
            <p>avatar</p>
          </div>
          <Spacer size='sm' />
          <hr className='' />
          <Spacer size='sm' />
          <div className='flex gap-3'>
            <div>
              <CircularProgress value={50} size='sm' />
            </div>
            <div className='flex-col place-content-center'>
              <p>지금까지</p>
              <p>50% 해냈어요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandalartCard;
