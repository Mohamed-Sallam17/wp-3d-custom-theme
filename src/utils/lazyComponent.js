import { lazy } from 'react';

// 1. استخدام ** لتضمين كافة المجلدات الفرعية
const components = import.meta.glob('../components/**/*.jsx');

const lazyComponent = (componentName) => {
  // 2. البحث عن الملف الذي ينتهي باسم المكون المطلوب
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