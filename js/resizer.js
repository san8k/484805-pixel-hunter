export default (container, image) => {
  const imageProperties = {};

  imageProperties.width = (container.width / container.height) < (image.width / image.height) ? container.width : image.width * container.height / image.height;

  imageProperties.height = (container.width / container.height) < (image.width / image.height) ? container.width * image.height / image.width : container.height;

  return imageProperties;
};
