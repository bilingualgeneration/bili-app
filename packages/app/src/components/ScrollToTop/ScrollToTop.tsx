import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
    children: any;
}

export const ScrollToTop: FC<ScrollToTopProps> = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {children}
        </>
    );
};