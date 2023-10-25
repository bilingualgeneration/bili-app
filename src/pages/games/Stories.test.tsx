import React from 'react';
import { render, screen } from '@testing-library/react';
import Stories from './Memory';

describe('<Stories />', () => {
    it('should render the title', () => {
        const {baseElement} = render(<Stories />);
        expect(baseElement).toBeDefined();
    });
});