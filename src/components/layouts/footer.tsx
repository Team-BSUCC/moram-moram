import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/manda-logo-text.svg';
import github from '../../../public/images/github-logo.svg';
import palms from '../../../public/images/palms-logo.svg';
import Text from '../commons/text';

const Footer = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-center md:gap-[40px]'>
        <div className='mb-4 text-center md:mb-0 md:text-left'>
          <span className='mr-3 text-[#202020]'>Contact</span>
          <Link href='mailto:info@manda.com' className='text-[#666666]'>
            info@manda.com
          </Link>
        </div>

        <div className='mb-6 flex items-center justify-center gap-5 md:mb-0'>
          <span className='mr-2 text-[#202020]'>Follow Us</span>
          <Link
            href='https://github.com/Team-BSUCC/moram-moram'
            target='_blank'
          >
            <Image
              src={github}
              alt='깃허브'
              width='20'
              height='20'
              draggable={false}
            />
          </Link>
          <Link href='https://moram-moram.palms.blog' target='_blank'>
            <Image
              src={palms}
              alt='블로그'
              width='20'
              height='20'
              draggable={false}
            />
          </Link>
        </div>
      </div>

      <div className='mt-2 flex flex-col items-center sm:mt-4'>
        <div className='mb-2'>
          <Image
            src={logo}
            alt='Manda'
            width='100'
            height='32'
            draggable={false}
          />
        </div>

        <Text size='14px-regular' textColor='sub'>
          © 2025 Manda. All rights reserved.
        </Text>
      </div>
    </div>
  );
};

export default Footer;
