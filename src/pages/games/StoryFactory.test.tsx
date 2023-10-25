import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryFactory from './StoryFactory';

describe('<StoryFactory />', () => {
    it('should render the title', () => {
        const {baseElement} = render(<StoryFactory />);
        expect(baseElement).toBeDefined();
    });
});