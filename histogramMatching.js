// var sourceImg = "./data.2018.png"
// var targetImg = "./data.2022.png"

var histogramMatch = function(sourceImg, targetImg) {
var geom = sourceImg.geometry();
var args = {
    reducer: ee.Reducer.autoHistogram({maxBuckets: 256, cumulative: true}), 
    geometry: geom,
    scale: 30, // Need to specify a scale, but it doesn't matter what it is because bestEffort is true.
    maxPixels: 65536 * 4 - 1,
    bestEffort: true
}

// Only use pixels in target that have a value in source (inside the footprint and unmasked).
var source = sourceImg.reduceRegion(args)
var target = targetImg.updateMask(sourceImg.mask()).reduceRegion(args)

return ee.Image.cat(
    sourceImg.select(['R']).interpolate(lookup(source.getArray('R'), target.getArray('R'))),
    sourceImg.select(['G']).interpolate(lookup(source.getArray('G'), target.getArray('G'))),
    sourceImg.select(['B']).interpolate(lookup(source.getArray('B'), target.getArray('B')))
)
}

// var result = histogramMatch("./data.2018.png", "./data.2022.png")