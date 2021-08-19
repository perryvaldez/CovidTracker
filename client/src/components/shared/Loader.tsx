import React from 'react';
import classnames from 'classnames';
import { CircularProgress, makeStyles } from '@material-ui/core';
import styles from './Loader.styles';

type LoaderProps = {
    isLoading: boolean,
    withWrapper?: boolean,
    wrapperClassName?: string,
};

export const Loader: React.FC<LoaderProps> = ({ children, isLoading, withWrapper, wrapperClassName }) => {
    const classes = makeStyles(styles)();

    if (isLoading) {
      if (withWrapper) {
        return (
          <div className={classnames(classes.wrapper, wrapperClassName)}>
            <CircularProgress color="primary" size={40} className={classes.progress} />
            {children}
          </div>
        );
      }

        return (
          <div className={classnames(classes.wrapper, wrapperClassName)}>
            <CircularProgress color="primary" size={40} className={classes.progress} />
            {children}
          </div>
        );
    }

    if (withWrapper) {
      return (<div>{children}</div>);
    }

    return (<>{children}</>);
};

export default Loader;
