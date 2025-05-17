import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MdClose } from 'react-icons/md';

interface MenuProps {
  show: boolean;
  onClose: () => void;
}

const Menu = ({ show, onClose }: MenuProps) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-full bg-black pt-20 text-white transition-transform duration-300 ${show ? 'translate-x-0' : '-translate-x-full'} `}
      style={{ willChange: 'transform' }}
    >
      {/* Logo */}
      <img src="/logo.png" alt="logo" className="mx-auto mb-[46px] h-6" />
      {/* 菜单项 */}
      <nav className="flex w-full flex-col items-center gap-8">
        <a href="/" className="text-lg font-medium hover:text-blue-400">
          Home
        </a>
        <a href="/" className="text-lg font-medium hover:text-blue-400">
          AI Agent
        </a>
        <a href="/" className="text-lg font-medium hover:text-blue-400">
          Product
        </a>
        <a href="/" className="text-lg font-medium hover:text-blue-400">
          Docs
        </a>
      </nav>
      {/* Connect Wallet 按钮 */}

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="absolute bottom-20 left-1/2 h-[46px] w-[184px] -translate-x-1/2 cursor-pointer rounded-full text-base text-white"
                      style={{
                        background:
                          'linear-gradient(90deg, #5694FF 0%, #2659FF 100%)',
                      }}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="absolute bottom-20 left-1/2 h-[46px] w-[184px] -translate-x-1/2 cursor-pointer rounded-full text-base text-white"
                      style={{
                        background:
                          'linear-gradient(90deg, #5694FF 0%, #2659FF 100%)',
                      }}
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="absolute bottom-20 left-1/2 h-[46px] w-[184px] -translate-x-1/2 cursor-pointer rounded-full text-base text-white"
                      style={{
                        background:
                          'linear-gradient(90deg, #5694FF 0%, #2659FF 100%)',
                      }}
                    >
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      {/* 关闭按钮 */}
      <MdClose
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer text-2xl text-white"
        onClick={onClose}
      />
    </div>
  );
};

export default Menu;
