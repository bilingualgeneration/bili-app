import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import {getAuth} from 'firebase/auth';
import {
    AuthProvider,
    useFirebaseApp
} from 'reactfire';


import UnauthedLayout from './layouts/Unauthed';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TeacherLogin from './pages/TeacherLogin';
import Splash from './pages/Splash';
import {SignUp} from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import Stories from './pages/Stories';
import Journeys from './pages/Journeys';
import AuthedLayout from './layouts/Authed';
import Explore from './pages/Explore';
import Memory from './pages/Memory';
import Intruder from './pages/Intruder';
import StoryFactory from './pages/StoryFactory';

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

/* SwiperJS */
import 'swiper/scss';
import '@ionic/react/css/ionic-swiper.css';

setupIonicReact();

const App: React.FC = () => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    return (
	<AuthProvider sdk={auth}>
	    <IonApp>
		<IonReactRouter>
		    <Switch>
			<Route exact path="/home" render={() => (
			    <UnauthedLayout>
				<Home />
			    </UnauthedLayout>
			)} />
			<Redirect exact from="/" to="/home" />
			
			<Route exact
			       path="/login"
			       render={() => (
				   <UnauthedLayout>
				       <Login />
				   </UnauthedLayout>
			       )} />
			
			
		    <Route exact path="/reset-password" render={() => (<UnauthedLayout><ResetPassword /></UnauthedLayout>)} />
		    <Route exact path="/teacher-login" render={() => (<UnauthedLayout><TeacherLogin /></UnauthedLayout>)} />
		    <Route exact path="/student-dashboard" render={() => (<UnauthedLayout><StudentDashboard /></UnauthedLayout>)} />
		    <Route exact path="/splash" render={() => (<UnauthedLayout><Splash /></UnauthedLayout>)} />
		    <Route exact path="/sign-up" render={() => (<UnauthedLayout><SignUp /></UnauthedLayout>)} />
		    
		    <Route exact path="/stories/:uuid" render={(props) => (
			<UnauthedLayout>
			    <Stories id={props.match.params.uuid} />
			</UnauthedLayout>
		    )} />

		    <Route exact path="/journeys" render={() => (
			<UnauthedLayout>
			    <Journeys />
			</UnauthedLayout>
		    )} />

		    <Route exact path="/explore" render={() => (
			<UnauthedLayout>
			    <Explore />
			</UnauthedLayout>
		    )} />

		    <Route exact path="/memory" render={() => (
			<UnauthedLayout>
			    <Memory />
			</UnauthedLayout>
		    )} />

		    <Route exact path="/intruder" render={() => (
			<UnauthedLayout>
			    <Intruder />
			</UnauthedLayout>
		    )} />

		    <Route exact path="/story-factory" render={() => (
			<UnauthedLayout>
			    <StoryFactory />
			</UnauthedLayout>
		    )} />
		</Switch>
	    </IonReactRouter>
	</IonApp>
	</AuthProvider>
    );
};

export default App;
