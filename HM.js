var dataset = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2021-01-01', '2021-12-31'));
var trueColor = dataset.select(['R', 'G', 'B']);
var trueColorVis = {
  min: 0,
  max: 255,
};
var myPic = trueColor.median().clip(geometry2);
Map.setCenter(-121.0584, 39.7285, 13);
Map.addLayer(trueColor, trueColorVis, 'True Color');

print(myPic)
var thumbParams = {dimensions: 800} //This determines the width size of the png in pixels.  You can make it bigger or smaller.
print(myPic.visualize(trueColorVis).getThumbURL(thumbParams)) // this is exporting one of the images and generates a URL -- then right click the image, save and download the PNG.