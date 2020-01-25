import React, { useEffect, useState, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import classnames from 'classnames';
import Icon from '@/components/Icon';
import ViewContext from '../../contexts/ViewContext';
import { getCurrentView, closeView } from '../View';
import styles from './styles.pcss';

const modalNode = document.getElementById('modal');

const ModalView = () => {
  const [currentView, setCurrentView] = useState(null);
  const [beforeHide, setBeforeHide] = useState(false);
  const { viewState } = useContext(ViewContext);
  const modalRef = useRef();

  useEffect(() => {
    // TODO Check if it is the same
    setCurrentView(getCurrentView('modal'));

    if (getCurrentView('modal')?.state === 2) {
      setBeforeHide(true);

      modalRef.current.addEventListener('animationend', () => {
        setBeforeHide(false);
        closeView(currentView.name, false);
      });
    }
  }, [viewState]);

  if (!currentView) {
    return null;
  }

  const isFullscreen = currentView?.options?.fullscreen;
  const position = currentView?.options?.position;

  const closeModal = () => {
    closeView(currentView.name);
  };

  return createPortal(
    <>
      <div
        data-testid="overlay"
        className={classnames(styles.Overlay, {
          [styles.BeforeHide]: beforeHide,
        })}
      />
      <FocusLock autoFocus={false}>
        <div
          data-testid="modal"
          data-fullscreen={isFullscreen}
          data-position={position}
          className={classnames(styles.Modal, {
            [styles.BeforeHide]: beforeHide,
          })}
          ref={modalRef}
        >
          <button data-testid="close-button" type="button" onClick={closeModal} className={styles.CloseButton}>
            <Icon name={isFullscreen ? 'close' : 'angle'} className={styles.CloseButtonIcon} />
          </button>
          <div className={styles.Content}>
            <currentView.component />
          </div>
        </div>
      </FocusLock>
    </>,
    modalNode,
  );
};

export default ModalView;
