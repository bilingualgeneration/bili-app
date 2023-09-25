import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TeacherLogin from './pages/TeacherLogin';

import UnauthedLayout from './layouts/Unauthed'; // Import the UnauthedLayout component
import Splash from './pages/Splash'; // Import the Splash component
import SignUp from './pages/SignUp'; // Import the SignUp component

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/teacher-login" component={TeacherLogin} />

        {/* Routes using UnauthedLayout */}
        <Route exact path="/splash" render={(props) => (<UnauthedLayout component={<Splash />} />)} />
        <Route exact path="/sign-up" render={(props) => (<UnauthedLayout component={<SignUp />} />)} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
