import React from 'react';
import Main from "./components/Main";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <BrowserRouter> {/*Option to add different pages with different paths later for scalability*/}
      <div>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
