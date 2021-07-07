// const MetroConfig = require('@ui-kitten/metro-config');

// // const defaultConfig = getDefaultConfig(__dirname);

// const evaConfig = {
//     evaPackage: '@eva-design/eva',
//     customMappingPath: './src/ui/mapping.json',
//     // Optional, but may be useful when using mapping customization feature.
//     // customMappingPath: './custom-mapping.json',
// };

// // // module.exports = MetroConfig.create(
// // //     evaConfig,
// // //     // Whatever was previously specified

// // // );

// const { getDefaultConfig } = require('metro-config');

// console.log('MetroConfig', MetroConfig);

// module.exports = MetroConfig.create(
//     evaConfig,
//     (async () => {
//         const {
//             resolver: { sourceExts, assetExts },
//         } = await getDefaultConfig();

//         return {
//             transformer: {
//                 babelTransformerPath: require.resolve('react-native-svg-transformer'),
//             },
//             resolver: {
//                 assetExts: assetExts.filter((ext) => ext !== 'svg'),
//                 sourceExts: [...sourceExts, 'svg'],
//             },
//         };
//     })(),
// );

// // module.exports = (async () => {
// //     const {
// //         resolver: { sourceExts, assetExts },
// //     } = await getDefaultConfig();
// //     return {
// //         transformer: {
// //             babelTransformerPath: require.resolve('react-native-svg-transformer'),
// //         },
// //         resolver: {
// //             assetExts: assetExts.filter((ext) => ext !== 'svg'),
// //             sourceExts: [...sourceExts, 'svg'],
// //         },
// //     };
// // })();

const MetroConfig = require('@ui-kitten/metro-config');
const defaultConfig = require('metro-config/src/defaults').getDefaultValues();

const evaConfig = {
    evaPackage: '@eva-design/eva',
    customMappingPath: './src/ui/mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
});
