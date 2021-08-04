import React from 'react';
import { Button, makeStyles, Tooltip } from '@material-ui/core';
import classnames from 'classnames';
import Counter from './Counter';
import styles from './IconButtonWithCounter.styles';

type IconButtonWithCounterProps = {
    className?: string,
    title: string,
    icon: string,
    count: number,
    hideCounter?: boolean,
};

export const IconButtonWithCounter: React.FC<IconButtonWithCounterProps> = 
({ className, title, icon, count, hideCounter }) => {
    const classes = makeStyles(styles)();
    return (
        <Tooltip title={title}>
            <Button variant="contained" aria-label={title} className={classnames(classes.button, className)}>
            <img src={icon} alt={title} />
            {
              !hideCounter && (
                <div className={classes.counterContainer}>
                  <Counter count={count} />
                </div>
              )
            }
            </Button>
        </Tooltip>
    );
};

export default IconButtonWithCounter;
