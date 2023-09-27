import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route} from 'react-router-dom';


import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TeacherLogin from './pages/TeacherLogin';
import Splash from './pages/Splash';
import SignUp from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import UnauthedLayout from './layouts/Unauthed';

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
			<Route
			exact
			path="/splash"
			render={(props) => (<UnauthedLayout><Splash /></UnauthedLayout>)}
			/>
			<Route
			exact
			path="/sign-up"
			render={(props) => (<UnauthedLayout><SignUp /></UnauthedLayout>)} 
			/>
			<Route
			exact
			path="/login"
			render={(props) => (<UnauthedLayout><Login /></UnauthedLayout>)} 
			/>
			<Route
			exact
			path="/student-dashboard"
			render={(props) => (<UnauthedLayout><StudentDashboard /></UnauthedLayout>)}
			/>


      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);



export default App;
