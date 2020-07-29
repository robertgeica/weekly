import store from '../store/store';

export const selectWeeks = () => store.getState().weeks.data;

export const selectDay = () => store.getState().weeks.currentDay;

export const toggle = () => store.getState().weeks.toggleModal;

export const toggleEditSelector = () => store.getState().weeks.toggleEditModal;