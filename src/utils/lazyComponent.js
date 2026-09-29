import { lazy } from 'react';

const components = import.meta.glob('../components/**/*.jsx');

const lazyComponent = (componentName) => {
  const pathKey = Object.keys(components).find((path) =>
    path.endsWith(`/${componentName}.jsx`)
  );

  const importer = components[pathKey];

  if (!importer) {
    throw new Error(
      `Lazy component "${componentName}" not found in components folder or subfolders.`
    );
  }

  return lazy(importer);
};

export default lazyComponent;