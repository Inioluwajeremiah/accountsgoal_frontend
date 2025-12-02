import { lazy } from "react";
export const LazyLoadComponent = (componentPath, componentName) => {
  return lazy(() => {
    const promise = import(componentPath);
    if (componentName === null) {
      return promise;
    } else {
      return promise.then({ default: module[componentName] });
    }
  });
};
