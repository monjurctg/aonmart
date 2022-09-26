import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SimpleTooltip = (props) => {
    const { title, children, position } = props;
    const tooltipPosition = typeof position === 'undefined' || position === null ? 'top' : position;

    return (
        <>
            <OverlayTrigger
                key={tooltipPosition}
                placement={tooltipPosition}
                overlay={
                    <Tooltip id={`tooltip-${tooltipPosition}`}>
                        {title}
                    </Tooltip>
                }
            >
                {children}
            </OverlayTrigger>
        </>
    );
}

export default SimpleTooltip;