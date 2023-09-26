import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TeacherLogin from './pages/TeacherLogin';
import StudentDashboard from './pages/StudentDashboard';

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
import Stories from './pages/Stories';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Switch>
        <Route exact path="/home" render={() => (<UnauthedLayout><Home /></UnauthedLayout>)} />
        <Redirect exact from="/" to="/home" />
        <Route exact path="/login" render={() => (<UnauthedLayout><Login /></UnauthedLayout>)} />
        <Route exact path="/reset-password" render={() => (<UnauthedLayout><ResetPassword /></UnauthedLayout>)} />
        <Route exact path="/teacher-login" render={() => (<UnauthedLayout><TeacherLogin /></UnauthedLayout>)} />
        <Route exact path="/student-dashboard" render={() => (<UnauthedLayout><StudentDashboard /></UnauthedLayout>)} />
        <Route exact path="/splash" render={() => (<UnauthedLayout><Splash /></UnauthedLayout>)} />
        <Route exact path="/sign-up" render={() => (<UnauthedLayout><SignUp /></UnauthedLayout>)} />
        <Route exact path="/stories" render={() => (<UnauthedLayout><Stories /></UnauthedLayout>)} />
      </Switch>
    </IonReactRouter>
  </IonApp>
);

export default App;
