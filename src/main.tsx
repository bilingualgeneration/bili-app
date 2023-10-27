import App from './App';
import { createRoot } from 'react-dom/client';
import {FirebaseWrapper} from './components/FirebaseWrapper';
import {I18nWrapper} from '@/components/I18nWrapper';
import {ProfileContextProvider} from './contexts/ProfileContext';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
	<FirebaseWrapper>
	    <I18nWrapper>
		<ProfileContextProvider>
		    <App />
		</ProfileContextProvider>
	    </I18nWrapper>
	</FirebaseWrapper>
    </React.StrictMode>
);
