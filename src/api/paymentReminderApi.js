import api from '../constants/api';

export const getPaymentReminders = () => api.get('/project/paymentreminders');
export const getPaymentReminderById = (id) => api.get(`/project/paymentremindersbyid/${id}`);
export const addPaymentReminder = (data) => api.post('/project/addpaymentreminders', data);
export const updatePaymentReminder = (id, data) => api.put(`/project/updatepaymentreminders/${id}`, data);
export const deletePaymentReminder = (id) => api.delete(`/project/deletepaymentreminders/${id}`);