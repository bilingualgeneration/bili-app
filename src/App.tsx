import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import {getAuth} from 'firebase/auth';
import {
    AuthProvider,
    useFirebaseApp
} from 'reactfire';


import AuthedLayout from './layouts/Authed';
<<<<<<< HEAD
import UnauthedLayout from './layouts/Unauthed';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import TeacherLogin from './pages/TeacherLogin';
import {Preload} from './pages/Preload';
import {Splash} from './pages/Splash';
import {SignUp} from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import Stories from './pages/Stories';
import Journeys from './pages/Journeys';
=======
>>>>>>> main
import Explore from './pages/Explore';
import Home from './pages/Home';
import Intruder from './pages/games/Intruder';
import Journeys from './pages/Journeys';
import Login from './pages/Login';
import Memory from './pages/games/Memory';
import ResetPassword from './pages/ResetPassword';
import {SignUp} from './pages/SignUp';
import Splash from './pages/Splash';
import Stories from './pages/games/Stories';
import StoryFactory from './pages/games/StoryFactory';
import StudentDashboard from './pages/StudentDashboard';
import TeacherLogin from './pages/TeacherLogin';
import UnauthedLayout from './layouts/Unauthed';

import {SignUpDataProvider} from '@/pages/SignUp/SignUpContext';

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
import './theme/overrides.scss';

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
<<<<<<< HEAD
		<IonReactRouter>
		    <Switch>
			<Route exact path="/home" render={() => (
			    <UnauthedLayout>
				<Home />
			    </UnauthedLayout>
			)} />
			<Route exact path="/splash" render={() => (
			    <UnauthedLayout>
				<Splash />
			    </UnauthedLayout>
			)} />
			<Route exact path="/" render={() => (<UnauthedLayout><Preload /></UnauthedLayout>)} />
			
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
		    <Route exact path="/sign-up" render={() => (<UnauthedLayout>
			<SignUpDataProvider>
			    <SignUp />
			</SignUpDataProvider>
		    </UnauthedLayout>)} />
		    
		    <Route exact path="/stories/:uuid" render={(props) => (
			<UnauthedLayout>
			    <Stories id={props.match.params.uuid} />
			</UnauthedLayout>
		    )} />
=======
			<IonReactRouter>
				<Switch>
					<Route exact path="/explore" render={() => (
						<UnauthedLayout>
							<Explore />
						</UnauthedLayout>
					)} />
>>>>>>> main

					<Route exact path="/home" render={() => (
						<UnauthedLayout>
							<Home />
						</UnauthedLayout>
					)} />
					
					<Redirect exact from="/" to="/home" />

					<Route exact path="/intruder" render={() => (
						<UnauthedLayout>
							<Intruder />
						</UnauthedLayout>
					)} />

					<Route exact path="/journeys" render={() => (
						<UnauthedLayout>
							<Journeys />
						</UnauthedLayout>
					)} />

					<Route exact path="/login" render={() => (
						<UnauthedLayout>
							<Login />
						</UnauthedLayout>
					)} />

					<Route exact path="/memory" render={() => (
						<UnauthedLayout>
							<Memory />
						</UnauthedLayout>
					)} />

					<Route exact path="/reset-password" render={() => (
						<UnauthedLayout>
							<ResetPassword />
						</UnauthedLayout>
					)} />

					<Route exact path="/sign-up" render={() => (
						<UnauthedLayout>
							<SignUp />
						</UnauthedLayout>
					)} />

					<Route exact path="/splash" render={() => (
						<UnauthedLayout>
							<Splash />
						</UnauthedLayout>
					)} />

					<Route exact path="/stories/:uuid" render={(props) => (
						<UnauthedLayout>
							<Stories id={props.match.params.uuid} />
						</UnauthedLayout>
					)} />

					<Route exact path="/story-factory" render={() => (
						<UnauthedLayout>
							<StoryFactory />
						</UnauthedLayout>
					)} />

					<Route exact path="/student-dashboard" render={() => (
						<UnauthedLayout>
							<StudentDashboard />
						</UnauthedLayout>
					)} />

					<Route exact path="/teacher-login" render={() => (
						<UnauthedLayout>
							<TeacherLogin />
						</UnauthedLayout>
					)} />
				</Switch>
			</IonReactRouter>
		</IonApp>
	</AuthProvider>
    );
};

export default App;
