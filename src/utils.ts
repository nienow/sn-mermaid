export const getPreviewText = (text: string, limit = 50) => {
  if (text.length <= limit) {
    return text;
  } else {
    return text.substring(0, limit) + '...';
  }
};
