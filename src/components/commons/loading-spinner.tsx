const LoadingSpinner = () => {
  return (
    <div className='flex h-screen items-center justify-center gap-8 bg-white-light'>
      <svg
        width='248'
        height='248'
        viewBox='0 0 248 248'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='animate-spin'
      >
        <circle
          cx='123.704'
          cy='123.656'
          r='118.5'
          transform='rotate(135 123.704 123.656)'
          stroke='url(#paint0_linear_1393_124915)'
          strokeWidth='10'
        />
        <defs>
          <linearGradient
            id='paint0_linear_1393_124915'
            x1='123.704'
            y1='0.15625'
            x2='123.704'
            y2='247.156'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0.350962' stopColor='#F6B2BB' />
            <stop offset='1' stopColor='#4CB446' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
