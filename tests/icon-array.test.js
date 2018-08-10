var rewire = require('rewire');
var d3 = require('d3');

var iconarray = rewire('../icon-array/v0.0.1/model/resource/iconarray');

var draw = iconarray.__get__("draw_array");
iconarray.__set__("d3", d3);

test('Test the Testing', () => {
  expect(1+2).toBe(3);
});

test('happy day', () => {

  expect(() => {
    draw( "myDivId",100,10,10,"blue","white",true)
  }).not.toThrow();

});

test('bad day', () => {

  expect(() => {
    draw()
  }).toThrow();

});




