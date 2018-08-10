# Icon Array
This is a resource-style knowledge object. It serves a javascript file that can be used to generate 
a visual representation of a 0-100 risk score that can be run on a web application. This is different
from most other knowledge objects which execute code in the activator and return a result.

## How to activate the Icon Array


## Referencing the activated Icon Array 
To include this as a remote script source, include this line in you web application's HTML file:
```HTML
  <script src="{activator_url}/icon/array/v0.0.1/model/resource/iconarray.js"></script>
  
```
Please look at out [example html](examples/example.html) page.

## How to use the Icon Array

### Create a static Icon Array
iconarray.js defines a function called `draw_array` that is used to draw the icon array. This function takes a JavaScript Object as its parameter to determine how to draw the visual. This object should have the following keys:
```
{
       divID [String]: the ID of the HTML tag under which the array will be drawn,
       count [int|float]: the number of icons that will be filled (this can be an integer or a float),
       gridWidth [int] (optional): the number of icons spanning horizontally (defaults to 10),
       gridHeight [int] (optional): the number of icons spanning vertivally (defaults to 10),
       personFill [String] (optional): the color that the icons will be filled with (default is "steelblue"),
       backgroundFill [String] (optional): background color of the web page (defaults to "#FFFFFF"),
       key (optional)[boolean] (optional): set to true to show key, false to hide (defaults to false)
}
```

To use the Icon Array, use `draw_array()` with the desired instructions in an object.

For example, calling
```
draw_array({
  divID: "my_div", 
  count: 2.5, 
  gridWidth: 10, 
  gridHeight: 10,
  backgroundFill: "steelblue", 
  personFill: "orange"
})
``` 
will draw an icon array on a div with id = "my_div", and will fill in 2.5 icons colored steelblue and will look like this:

