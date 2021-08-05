import React from 'react';
import P from '../markup/P';

type LoaderProps = {
    isLoading: boolean,
};

export const Loader: React.FC<LoaderProps> = ({ children, isLoading }) => {
    if (isLoading) {
        return (
          <div>
            <P>Loading...</P>
          </div>
        );
    }

    return (<>{children}</>);
};

export default Loader;
