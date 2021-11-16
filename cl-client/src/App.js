import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import {ContactsListMain} from './components/contacts/contacts-list-main';

function App() {
  return (
      <Provider store={store}>
          <ContactsListMain/>
      </Provider>
  );
}

export default App;
