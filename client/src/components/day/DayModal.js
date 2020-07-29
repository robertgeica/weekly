import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';

import { handleCloseModal } from '../../actions/weeks';
import { toggleEditSelector } from '../../selectors/week.selectors';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import EditModal from './EditModal';

const DayModal = ({ toggleModal, handleCloseModal }) => {
  const toggle = toggleEditSelector();

	return (
		<Modal
			isOpen={!!toggleModal}
			onRequestClose={handleCloseModal}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="modal"
			style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
		>
			<ModalHeader />
      {toggle == true ? <EditModal /> : <ModalBody />}

		</Modal>
	);
};

const mapStateToProps = (state) => ({
	toggleModal: state.weeks.toggleModal,
  toggleEditModal: state.weeks.toggleEditModal
});

export default connect(mapStateToProps, { handleCloseModal })(DayModal);
