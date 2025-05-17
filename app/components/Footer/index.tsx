import { useMediaQuery } from '~/hooks/useMediaQuery';

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const tableList = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'AI Agent',
      href: '/',
    },
    {
      name: 'Product',
      href: '/',
    },
    {
      name: 'Docs',
      href: '/',
    },
  ];

  return (
    <div className="mb-10 flex w-full flex-col-reverse items-center justify-center gap-14 md:flex-row md:justify-between md:px-6 lg:px-[120px] 2xl:px-[280px]">
      <div className="flex flex-col items-center justify-center md:items-start">
        <img
          src="/logo.png"
          alt="logo"
          className="h-[28px] object-contain md:h-[32px]"
        />

        <div className="mt-[32px] text-center text-sm text-white md:text-left md:text-base">
          © 2025 Smart AI labs
        </div>

        <div className="mt-2 text-center text-sm text-white md:text-left md:text-base">
          Privacy & Policy | Terms & Conditions
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 md:items-end">
        <div className="flex items-center justify-center gap-8">
          <img src="/imgs/common/x.png" alt="x" className="w-[37px]" />
          <img
            src="/imgs/common/telegram.png"
            alt="telegram"
            className="w-[37px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5 md:flex-row md:gap-10">
          {tableList.map(item => (
            <a
              href={item.href}
              key={item.name}
              className="text-sm text-white md:text-base"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
