/* eslint-disable no-unused-vars */
import MandalartCard from '@/modules/dashboard/components/mandalart-card';
import { getBandColorValue } from '@/modules/dashboard/services/get-band-color-value';

const DashBoardPage = () => {
  return (
    <div className='h-full bg-white-dark'>
      {Array.from({ length: 1 }).map((_, index) => {
        const bandColor = getBandColorValue(index);
        return <MandalartCard key={index} bandColor={bandColor} />;
      })}
    </div>
  );
};

export default DashBoardPage;
