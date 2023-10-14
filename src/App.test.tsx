import {render} from '@testing-library/react';
import App from './App';
import {FirebaseWrapper} from '@/components/FirebaseWrapper';

test('renders without crashing', () => {
    const {baseElement} = render(
	<FirebaseWrapper>
	    <App />
	</FirebaseWrapper>
    );
  expect(baseElement).toBeDefined();
});

