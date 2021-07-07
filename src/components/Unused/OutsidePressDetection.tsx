import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';

//unused
function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            console.log('event.target', event.target);
            if (ref.current && !ref.current.contains(event.target)) {
                // alert('You clicked outside of me!');
                console.log('You clicked outside of me!');
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export const OutsidePressDetection = (props) => {
    //TODO: figure this one out for the datepicker
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <View ref={wrapperRef}>{props.children}</View>;
};
