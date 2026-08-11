import { lazy } from 'react';

const components = import.meta.glob(
    '../components/*.jsx'
);

const lazyComponent = (componentName) => {

    const path = `../components/${componentName}.jsx`;

    const importer = components[path];

    if (!importer) {
        throw new Error(
            `Lazy component "${componentName}" not found.`
        );
    }

    return lazy(importer);
};

export default lazyComponent;