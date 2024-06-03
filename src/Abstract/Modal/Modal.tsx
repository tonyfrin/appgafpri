import React from 'react';
import { css, cx } from '@emotion/css';

const paginaOpcionesStyles = (open: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${!open ? 0 : 1};
  visibility: ${!open ? 'hidden' : 'visible'};
  transition: ${open ? 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.5s ease-in-out' : ''};
  transform: translateY(${open ? 0 : '100%'});
  z-index: 998;
`;

const buttonStyles = css`
  position: absolute;
  top: 87px;
  transform: translateY(-50%);
  right: -49%;
  cursor: pointer;
  color: #fff;
  background-color: #c12429;
  border-radius: 100%;
  padding: 6px 7px 6px 8px;
  font-size: 13px;
`;

export type ModalProps = {
  children: JSX.Element;
  open: boolean;
  onClose?: () => void;
};

export const Modal = ({ children, open, onClose }: ModalProps) => {
  return (
    <>
      <div className={cx(paginaOpcionesStyles(open))}>
          {children}
          {onClose ? (
            <button className={cx(buttonStyles)} onClick={onClose}>
              X
            </button>
          ) : (
            ''
          )}
      </div>
    </>
  );
};
