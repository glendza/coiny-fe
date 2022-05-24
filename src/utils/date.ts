export const toLocale = (dtString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = new Date(dtString);
  return date.toLocaleDateString('en-US', options);
};
