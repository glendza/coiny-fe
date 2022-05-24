export const toLocale = (dtString: string) => {
  if (!dtString) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const date = new Date(dtString);
  return date.toLocaleDateString('en-US', options);
};
