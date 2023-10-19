import React from 'react';
import { render, screen } from '@testing-library/react';
import {Preload} from './Preload';

describe('<Preload />', () => {
    it('should render', () => {
	const {baseElement} = render(<Preload />);
	expect(baseElement).toBeDefined();
    });
    
    it('should push user to /login if the user is not authed', () => {
	// todo: implement
    });

    it('should push user to student dashboard if user is authed as student', () => {
	// todo: implement
    });

    it('should push user to teacher dashboard if user is authed as teacher', () => {
	// todo: implement
    });

    it('should push user to parent dashboard if user is authed as parent', () => {
	// todo: implement
    });

    
});
