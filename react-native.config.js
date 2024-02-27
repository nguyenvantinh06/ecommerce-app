module.exports = {
    project: {
        ios: {
            unstable_reactLegacyComponentNames: [
                'react-native-fast-image',
                'CellContainer',
                'AutoLayoutView'
            ]
        },
        android: {},
    },
    assets: ['./src/assets/fonts/'],
    dependencies: {
        'react-native-vector-icons': {
            platforms: {
                ios: null,
            },
        },
    },
};
