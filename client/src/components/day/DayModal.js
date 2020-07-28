import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';

import { handleCloseModal } from '../../actions/weeks';

import ModalHeader from './ModalHeader';

const DayModal = ({ toggleModal, handleCloseModal }) => {

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

		</Modal>
	);
};

const mapStateToProps = (state) => ({
	toggleModal: state.weeks.toggleModal
});

export default connect(mapStateToProps, { handleCloseModal })(DayModal);
