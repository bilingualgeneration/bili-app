import React from 'react';
import { render, screen } from '@testing-library/react';
import Memory from './Memory';

describe('<Memory />', () => {
    it('should render the title', () => {
        const {baseElement} = render(<Memory />);
        expect(baseElement).toBeDefined();
    });
});