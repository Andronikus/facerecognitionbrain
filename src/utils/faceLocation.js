export const calculateFaceLocation = data => {
    const clarifaiFaceRegion = data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    const boundingValues = {
      leftColumn: width * Number(clarifaiFaceRegion.left_col),
      rightColumn: width - (width * Number(clarifaiFaceRegion.right_col)),
      topRow: height * Number(clarifaiFaceRegion.top_row),
      bottomRow: height - (height * Number(clarifaiFaceRegion.bottom_row))
    }
    return boundingValues;
  }