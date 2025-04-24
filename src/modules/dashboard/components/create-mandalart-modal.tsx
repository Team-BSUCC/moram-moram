import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CreateMandalartModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'
      onClick={onClose}
    >
      <div
        className='relative h-[357px] w-full max-w-sm rounded-br-lg rounded-tr-lg border-l-[10px] border-pink-pigment bg-white shadow-lg outline-red-pastel sm:h-[428px] sm:max-w-[535px]'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default CreateMandalartModal;
