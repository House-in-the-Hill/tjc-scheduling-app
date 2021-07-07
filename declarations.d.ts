declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

//apparently this shouldn't be in root? not sure where to put it then
//gets rid of errors when importing svgs
