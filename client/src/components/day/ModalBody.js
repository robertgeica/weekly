import React from 'react';
import DayFocus from './DayFocus';
import DayComments from './DayComments';
import WeekFocus from './WeekFocus';


const ModalBody = () => {
  return (
    <div className="modal-body">
      <DayFocus />
      <DayComments />
      <WeekFocus />
    </div>
  );
}

export default ModalBody;
