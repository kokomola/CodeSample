import React from 'react';
//import SortModal from '~/src/features/bathes/components/SortModal';
//import ScheduleModal from '~/src/features/bathes/components/ScheduleModal/ScheduleModal';

export default function ModalManager<T>() {
  let currentModal;
  let renderModal = <></>;
  const modalLookup = {
    //SortModal,
    //ScheduleModal,
  };
  /*
  const currentModal = useSelector<IRootState>(
    (state) => state.modal
  ) as IModalState;
  let renderModal = <></>;

  handleOpenModal({
          modalType: 'SortModal',
          modalProps: { y: yForModal },
        })
function handleOpenModal(payload: IModalState) {
    dispatch(openModal(payload));
  }

 */
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[
      modalType! as keyof typeof modalLookup
    ] as React.ElementType;

    renderModal = <ModalComponent {...modalProps} />;
  }

  return renderModal;
}
