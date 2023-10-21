import {
    describe,
    expect,
    it
} from 'vitest';
import {
    FC,
    JSX
} from 'react';

import {
    cleanup,
    fireEvent,
    render,
    renderHook,
    screen
} from '@testing-library/react';

import {ExtendedRadio} from './ExtendedRadio';

const generateOption = (text: string): JSX.Element => {
    return <div>{text}</div>;
}

describe('Extended Radio', () => {
    it('should render each option', () => {
	render('<ExtendedRadio />');
    });

    it('should add the default active class to a clicked component', () => {
	const options: JSX.Element[] = [
	    generateOption('hello'),
	    generateOption('world'),
	    generateOption('hola'),
	    generateOption('mundo')
	];
	const {container} = render('<ExtendedRadio options={options} />');
	const target: JSX.Element = screen.getByTestId('extended-radio-component').query(':nth-child(2)');
	fireEvent.click(target);
	expect(target).toHaveClass('active');
    });

    /*
    it('should ', () => {

    });

    it('should ', () => {

    });
    */
});
