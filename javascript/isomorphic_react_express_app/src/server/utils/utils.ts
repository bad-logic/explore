export const getTemplateNameFromRoute = (route: string): string => {
  const template = route.replace(/\//g, '').toLowerCase() || 'home'; // in case the url is / only
  return template;
};
