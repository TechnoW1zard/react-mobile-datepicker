import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children, isOpen }) => {
  const portalRef = useRef(null);
  
  useEffect(() => {
    if (!isOpen) return;
    
    // Создаём контейнер для портала
    portalRef.current = document.createElement('div');
    portalRef.current.classList.add('Modal-Portal');
    document.body.appendChild(portalRef.current);
    
    return () => {
      // Удаляем контейнер при закрытии модалки
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, [isOpen]);

  // Если модалка закрыта или контейнер ещё не создан - ничего не рендерим
  if (!isOpen || !portalRef.current) {
    return null;
  }

  // Рендерим через портал
  return createPortal(
    React.cloneElement(children, { key: 'portal' }),
    portalRef.current
  );
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;