import AddContact from '../components/AddContact';
import MainContact from '../components/MainContact';
import EditContact from '../components/EditContact';

export const SCREENS = {
  Main: {
    key: 'mainAppScreen', //key de goi chuyen man hinh
    component: MainContact, //ten file da khai bao
    hideNavBar: true,
  },
  addContact: {
    key: 'addContactScreen',
    component: AddContact,
    hideNavBar: true,
  },
  editContact: {
    key: 'editContactScreen',
    component: EditContact,
    hideNavBar: true,
  },
};
export default SCREENS;
