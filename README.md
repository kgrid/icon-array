# Icon Array
This is a visual knowledge object. Unlike regular knowledge objects, the Icon Array does not run on the Activator, instead it is used to deliver javascript code to a client that can be executed by a web application.

# How to include
To use the Icon Array, you will either need to download this file or include is as a remote script src in your web application.

### Remote source
To include this as a remote script source, include this line in you web application's HTML file:
```HTML
  <script src="http://kgrid.med.umich.edu/stack/knowledgeObject/ark:/99999/fk40s01p75/payload/content"></script>
```

### Local source
To include the Icon Array locally, download the iconarray.js file into your project directory and include a script src:
```HTML
<script src="path/to/iconarray.js"></script>
```
make sure to use the proper path to the file

# How to use
iconarray.js defines a function called `draw_array` that is used to draw the icon array. This function takes a JavaScript Object called instr as its parameter to determine how to draw the visual. This object should have the following keys:
```
{
       divID [String]: the ID of the HTML tag under which the array will be drawn,
       count [int|float]: the number of icons that will be filled (this can be an integer or a float),
       gridWidth (optional)[int]: the number of icons spanning horizontally (defaults to 10),
       gridHeight (optional)[int]: the number of icons spanning vertivally (defaults to 10),
       personFill (optional)[String]: the color that the icons will be filled with (default is "steelblue"),
       backgroundFill (optional)[String]: background color of the web page (defaults to "#FFFFFF"),
       key (optional)[boolean]: set to true to show key, false to hide (defaults to true)
}
```

To use the Icon Array, use `draw_array()` with the desired instructions in an object.

For example, calling `draw_array({divID: "my_div", count: 2.5, personFill: "orange"})` will draw an icon array on a div with id = "my_div", and will fill in 2.5 icons colored orange

# Notes
  * `draw_array()` works by appending svg tags to draw the array. If you make multiple calls to `draw_array()` on the same Div, it will append multiple Icon Arrays. If you want to avoid this behavior, you will have to clear the html of the div prior to drawing a new icon array
  * For now, this object uses D3.js to draw the array. In order to use this object you must include a script source to [D3](https://d3js.org/)


 
