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

### IconArray module
The script source contains the IconArray module which is used to create and remove icon arrays.

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

To use the Icon Array, use `IconArray.draw_array()` with the desired instructions in an object.

For example, calling
```
IconArray.draw_array({
  divID: "my_div", 
  count: 2.5, 
  gridWidth: 10, 
  gridHeight: 10,
  backgroundFill: "white", 
  personFill: "orange"
})
``` 
will draw an icon array on a div with id = "my_div", and will fill in 2.5 icons colored orange and will look like this:

![icon array](https://github.com/kgrid/icon-array/blob/master/icon-array-example.png)


### Create a repeating Icon Array
It is also possible to create an icon array that continually updates based on a list of data. To do this, make a call to `IconArray.draw_repeat_array()`. This function takes the following parameters:
```
{
  divID [string]: ID of div to draw the icon array to
  delay [number]: the number of seconds between each update
  data [array]: an array of numbers containing each value you want displayed on the repeating Icon Array
  options [object]: an object containing options for drawing the icon array
    options.message [object]: specifies whether or not to show message with repeating array and provides options for message
    options.message.interval [number]: interval of time between each data entry
    options.message.timeframe [string]: time frame for data interval (ie "years", "days", etc.) 
    options.message.timestart [number]: starting time of data (ie 1 for start at 1 year)
}
```
Calling
```javascript
IconArray.draw_repeat_array("id2", 0.5, [1, 5, 7.5, 10, 15.75], {
            key: true, 
            message: {
                interval: 0.5,
                timeframe: "years"
            }
         })
```
Would make an icon array that cycles trough the values [1, 5, 7.5, 10, 15, 15.75] every 0.5 seconds. It would display the key next to the Icon Array and display the message "Value after {n} years" where n is updated each cycle.

### Removing an Icon Array
To remove an icon array, call `IconArray.clear_array()`. This function takes a div ID as its argument and removes the specified icon array.
For example, calling
```
  IconArray.clear_array("my_div")
 ```
 would remove the array that is contained in the div with ID "my_div"

# Notes
  * `IconArray.draw_array()` works by appending svg tags to draw the array. If you make multiple calls to `draw_array()` on the same Div, it will append multiple Icon Arrays. If you want to avoid this behavior, you will have to clear the original icon array prior to drawing a new icon array
  * Use `IconArray.clear_array()` to remove Icon Arrays, do not remove them manually
  * The IconArray module uses JQuery, so you will need to include JQuery in any applications using the Icon Array
