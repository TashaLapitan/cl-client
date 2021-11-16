import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import {ContactsListMain} from './components/contacts/contacts-list-main';
import {ConfirmationModal} from "./components/shared/confirmation-modal";
import {ConflictAlert} from "./components/shared/conflict-alert";
import {InfoAlert} from "./components/shared/info-alert";

function App() {
  return (
      <Provider store={store}>
          <ConfirmationModal/>
          <ConflictAlert/>
          <InfoAlert/>
          <ContactsListMain/>
      </Provider>
  );
}

export default App;
