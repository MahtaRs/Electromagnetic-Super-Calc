var gd = document.getElementById('myDiv');

var res = 30;
var resX = res;
var resY = res;
var resZ = res;
var resV = 10;

createData({
  dims: [resX, resY, resZ, resV],
  isoMin: 0,
  isoMax: null
});

function createData(opts) {

  function f_xyz(x, y, z) {
    if(z > 0.4 && z < 0.6) return 0; // not working with undefined;

    return (1 - x) * y + (1 - y) * z + (1 - z) * x;

  }

  var mapX = function (a) { return a; };
  var mapY = function (a) { return a; };
  var mapZ = function (a) { return a; };

  var colorscale = "Portland";
  var reversescale = false;
  var opacity = 1.0;
  var fill = 1.0;


  var isoMin = opts.isoMin;
  var isoMax = opts.isoMax;

  var width = opts.dims[0];
  var height = opts.dims[1];
  var depth = opts.dims[2];
  var count = opts.dims[3];

  function getIndex(i, j, k) {
    return k + depth * j + depth * height * i;
  }

  function calcData(axis) {

    var i, j, k;

    var dataCube = [];
    for (i = 0; i < width; i++) {
      for (j = 0; j < height; j++) {
        for (k = 0; k < depth; k++) {

          var index = getIndex(i, j, k);

          if (axis === 0) { // fill X
            dataCube[index] = 120 * mapX(i / (width - 1));
          }
          if (axis === 1) { // fill Y
            dataCube[index] = 120 * mapY(j / (height - 1));
          }
          if (axis === 2) { // fill Z
            dataCube[index] = 120 * mapZ(k / (depth - 1));
          }

          if (axis === 3) { // fill Value
            var x = i / (width - 1);
            var y = j / (height - 1);
            var z = k / (depth - 1);

            dataCube[index] = 1000 * f_xyz(x, y, z);
          }
        }
      }
    }

    return dataCube;
  }


  Plotly.newPlot(gd,
    {
      "data": [
        {
          "type": "isosurface",
          "x": calcData(0),
          "y": calcData(1),
          "z": calcData(2),
          "value": calcData(3),
          "isomin": isoMin,
          "isomax": isoMax,
          "spaceframe": { "show": false },
          "surface": { "show": true, "fill": fill, count: count },
          "caps": {
            "x": { "show": false },
            "y": { "show": false },
            "z": { "show": false }
          },
          "slices": {
            "x": { "show": false },
            "y": { "show": false },
            "z": { "show": false }
          },
          "colorscale": colorscale,
          "reversescale": reversescale,
          "opacity": opacity
        }
      ],
      "layout": {
        "width": 1000,
        "height": 800,
        "scene": {
          "camera": {
            "eye": {
              "x": -2,
              "y": 1.5,
              "z": 1
            }
          }
        }
      }
    }
  );

}
