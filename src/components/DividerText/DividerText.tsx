// todo: don't hardcode style

import {
    JSX
} from 'react';
import {
    IonText
} from '@ionic/react';


export type DividerTextProps = {
    className?: string,
    text: string
}

export const DividerText = ({
    className,
    text
}: DividerTextProps): JSX.Element => {

    return (
	<>
	    <div
		className={className}
		style={{
		    alignContent: 'stretch',
		    alignItems: 'center',
		    display: 'flex'
		}}>
		<hr style={{
		    borderTop: '2px solid rgb(146, 148, 156)',
		    width: '100%'
		}} />
		<IonText style={{
		    color: 'rgb(146, 148, 156)',
		    whiteSpace: 'nowrap',
		    paddingLeft: '2rem',
		    paddingRight: '2rem'
		}}>
		    {text}
		</IonText>
		<hr style={{
		    borderTop: '2px solid rgb(146, 148, 156)',
		    width: '100%'
		}} />
	    </div>
	</>
    );
}
