export default (container, image) => {
  let imageProperties = {};

  if ((container.width / container.height) < (image.width / image.height)) {
    imageProperties.width = container.width;
    imageProperties.height = container.width * image.height / image.width;
  } else {
    imageProperties.width = image.width * container.height / image.height;
    imageProperties.height = container.height;
  }

  return imageProperties;
};
