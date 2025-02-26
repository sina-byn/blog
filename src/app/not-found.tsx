const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center fixed inset-0 z-10 bg-[#0a0a0a] text-[#ededed] text-center'>
      <div>
        <h1 className='inline-block text-2xl font-medium align-top leading-12 border-r border-white/30 mr-5 pr-6'>
          404
        </h1>
        <div className='inline-block'>
          <h2 className='text-sm font-normal leading-12 m-0'>This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
