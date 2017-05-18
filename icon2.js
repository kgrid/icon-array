//divID , count, gridWidth = 10, gridHeight = 10, personFill = "steelblue", backgroundFill = "#FFFFFF", key=true

/**
 * draws icon array visual by appending svg tags
 * @param  {Object} instr obect containing options for icon array
 * instr should contain the following keys
 * {
 *      divID [String]: the ID of the HTML tag under which the array will be drawn,
 *      count [int|float]: the number of icons that will be filled (this can be an integer or a float),
 *      gridWidth [int]: the number of icons spanning horizontally (defaults to 10),
 *      gridHeight [int]: the number of icons spanning vertivally (defaults to 10),
 *      personFill [String]: the color that the icons will be filled with (default is steelblue),
 *      backgroundFill [String]: background color of the web page (defaults to "#FFFFFF"),
 *      key [boolean]: set to true to show key, false to hide (defaults to true)
 * }
 */
var IconArray = (function () {
    "use strict";
    //for drawing svg icon path
    var path = "M0,0v40h22V0H0z M11,0.732c1.755,0,3.177,1.423,3.177,3.177c0,1.755-1.422,3.177-3.177,3.177" +
        "c-1.754,0-3.177-1.422-3.177-3.177C7.823,2.155,9.246,0.732,11,0.732z M18.359,11.884v9.851c0,0.763-0.617,1.381-1.381,1.381" +
        "c-0.763,0-1.381-0.618-1.381-1.381v-8.967h-0.535v0.124v10.224v14.307c0,1.02-0.826,1.848-1.848,1.848" +
        "c-1.02,0-1.846-0.828-1.846-1.848V23.114h-0.697v14.307H10.63c0,1.021-0.827,1.847-1.847,1.847c-1.021,0-1.847-0.826-1.847-1.847" +
        "c0-0.134,0.016-0.264,0.043-0.39V23.114H6.937V12.767H6.401v8.967c0,0.763-0.618,1.381-1.381,1.381s-1.38-0.619-1.38-1.383v-9.85" +
        "v-0.407c0-2.032,1.647-3.679,3.68-3.68h7.362c2.03,0,3.68,1.647,3.68,3.68v0.408H18.359z";

    var personHeight = 39;
    var personWidth = 19;
    var defaultHeight = 10
    var defaultWidth = 10
    var defaultFill = "steelblue"

    //-----FUNCTIONS-----
    var initialize_svg = function(divID, width, height, backgroundFill) 
    {
        var svgContainer = d3.selectAll("#" + divID).append("svg")
            .attr("class", "icon-array")
            .attr("fill", backgroundFill)
            .attr("width", width)
            .attr("height", height);

        return svgContainer;
    }

    var draw_person = function(svgContainer, fill, path, x, y, backgroundFill, type="icon-body") 
    {
        svgContainer.append("rect")
            .attr("class", type)
            .attr("height", personHeight)
            .attr("width", personWidth)
            .attr("fill", fill)
            .attr("transform", "translate(" + x + ", " + y + ")");

        svgContainer.append("path")
            .attr("fill", backgroundFill)
            .attr("d", path)
            .attr("transform", "translate(" + x + ", " + y + ")");
    }

    //Artist class
    var Artist = (function()
    {
        //---PRIVATE METHODS---
        //---PUBLIC METHODS---

        //constructor
        function Artist(in_fill, in_backgroundFill) 
        {
            this.iconFill = in_fill
            this.backgroundFill = in_backgroundFill

            this.path = "M0,0v40h22V0H0z M11,0.732c1.755,0,3.177,1.423,3.177,3.177c0"
                + ",1.755-1.422,3.177-3.177,3.177c-1.754,0-3.177-1.422-3.177-3.177C7.82"
                + "3,2.155,9.246,0.732,11,0.732z M18.359,11.884v9.851c0,0.763-0.617,1.3"
                + "81-1.381,1.381c-0.763,0-1.381-0.618-1.381-1.381v-8.967h-0.535v0.124v"
                + "10.224v14.307c0,1.02-0.826,1.848-1.848,1.848c-1.02,0-1.846-0.828-1.8"
                + "46-1.848V23.114h-0.697v14.307H10.63c0,1.021-0.827,1.847-1.847,1.847"
                + "c-1.021,0-1.847-0.826-1.847-1.847c0-0.134,0.016-0.264,0.043-0.39V23."
                + "114H6.937V12.767H6.401v8.967c0,0.763-0.618,1.381-1.381,1.381s-1.38-0"
                + ".619-1.38-1.383v-9.85v-0.407c0-2.032,1.647-3.679,3.68-3.68h7.362c2.0"
                + "3,0,3.68,1.647,3.68,3.68v0.408H18.359z";

            this.personHeight = 39;
            this.personWidth = 19;
            this.defaultHeight = 10
            this.defaultWidth = 10
            this.defaultFill = "steelblue"

            return Artist
        }

        //draw person
        Artist.prototype.draw_person = function(x, y, type = "icon-body") 
        {
            this.svgContainer.append("rect")
                .attr("class", type)
                .attr("height", this.personHeight)
                .attr("width", this.personWidth)
                .attr("fill", this.personFill)
                .attr("transform", "translate(" + x + ", " + y + ")");

            this.svgContainer.append("path")
                .attr("fill", this.backgroundFill)
                .attr("d", this.path)
                .attr("transform", "translate(" + x + ", " + y + ")");
        }

        //draw partial person
        Artist.prototype.draw_partial_person = function(x, y, portion,
            type = "partial-icon-body") 
        {
            svgContainer.append("rect")
                .attr("class", type + "-bottom")
                .attr("height", this.personHeight)
                .attr("width", this.personWidth)
                .attr("fill", this.personFill)
                .attr("transform", "translate(" + x + ", " + y + ")");

            svgContainer.append("rect")
                .attr("class", type + "-top")
                .attr("height", this.personHeight * (1 - portion))
                .attr("width", this.personWidth)
                .attr("fill", "#cccccc")
                .attr("transform", "translate(" + x + ", " + y + ")");


            svgContainer.append("path")
                .attr("fill", this.backgroundFill)
                .attr("d", this.path)
                .attr("transform", "translate(" + x + ", " + y + ")");
        }
    })();
   

    var draw_partial_person = function(svgContainer, fill, path, x, y, portion, 
                                backgroundFill, type="partial-icon-body") 
    {

        svgContainer.append("rect")
            .attr("class", type + "-bottom")
            .attr("height", personHeight)
            .attr("width", personWidth)
            .attr("fill", fill)
            .attr("transform", "translate(" + x + ", " + y + ")");

        svgContainer.append("rect")
            .attr("class", type + "-top")
            .attr("height", personHeight * (1 - portion))
            .attr("width", personWidth)
            .attr("fill", "#cccccc")
            .attr("transform", "translate(" + x + ", " + y + ")");


        svgContainer.append("path")
            .attr("fill", backgroundFill)
            .attr("d", path)
            .attr("transform", "translate(" + x + ", " + y + ")");
    }

    var hasDecimal = function(num)
    {
        return (num - Math.floor(num) > 0)
    }

    var clone_object = function(obj) 
    {
        if (null == obj || "object" != typeof obj) return {};
        var copy = obj.constructor();
        for (var attr in obj)
        {
            if (obj.hasOwnProperty(attr))
                copy[attr] = obj[attr];
        }
        return copy;
    }

    var remove_partial = function(divID)
    {
        $("#" + divID + " .partial-icon-body-top").remove()
        $("#" + divID + " .partial-icon-body-bottom").remove()
        
    }

    var get_icon_position = function(divID, index)
    {
        var infoString = $("#" + divID + " .icon-body").eq(index)
                                .attr("transform").split(",")

        var xPos = parseInt(infoString[0].replace(/[^0-9\.]/g, ''))
        var yPos = parseInt(infoString[1].replace(/[^0-9\.]/g, ''))

        return [xPos, yPos]
    }

    /**
     * Updates an existing Icon Array to reflect a new value
     * 
     * @param {string} divID ID of the div containing the icon array
     * @param {number} totalIcons total number of icons in the array
     * @param {number} numCurrentFilled number of icons currently filled
     * @param {number} newCount new value that icon array will represent
     * @param {string} fillColor color to fill the icons when updating
     * @return {number} the number of icons that are filled after the update
     */
    var update_array = function(divID, totalIcons, numCurrentFilled, newCount,
                        fillColor)
    {
        var decimalExists = hasDecimal(newCount)
        var numToFill = Math.floor(newCount)
        if(numToFill < numCurrentFilled)
        {
            //recolor all the ones after to be grey
            $("#" + divID + " .icon-body").attr("fill", "#cccccc")
        }

        remove_partial(divID)
        //fill the icons
        $("#" + divID + " .icon-body").slice(-1 * numToFill).attr("fill", fillColor)

        if(decimalExists)
        {
            //this will get the last icon which will need to be filled partially
            var positions = get_icon_position(divID, totalIcons - numToFill - 1)
            var xPos = positions[0]
            var yPos = positions[1]

            //fill a partial person icon in the position
            draw_partial_person(d3.select("#" + divID + " svg"), fillColor, path, xPos,
                yPos, newCount - Math.floor(newCount), "white")
            console.log("WIDTH AND HEIGHT: ", xPos, yPos)

            numToFill += 2

        }
        return numToFill
    }

    //-----BEGIN-----
    return {
        draw_array: function(instr) 
        {
            var h = instr.gridHeight ? instr.gridHeight : defaultHeight
            var w = instr.gridWidth ? instr.gridWidth : defaultWidth
            var height = instr.gridHeight ? (45 * instr.gridHeight + 29) : (45 * defaultHeight + 29)
            console.log(height)
            var width = instr.gridWidth ? (44 * instr.gridWidth) : (44 * defaultWidth + 29)
            console.log(width)
            var key = instr.key ? true : false
            console.log(key)
            var fill = instr.personFill ? instr.personFill : defaultFill
            console.log(fill)
            var backgroundFill = instr.backgroundFill ? instr.backgroundFill : "#ffffff"
            console.log(backgroundFill)

            //check if there should be a partial fill
            var decimal = instr.count - Math.floor(instr.count);
            if (decimal && decimal < 0.1) 
            {
                decimal = 0.1
            }

            var partial = (decimal != 0) ? true : false;
            //Make an SVG Container
            var svgContainer = initialize_svg(instr.divID, width, height, backgroundFill);

            var xDist = 25;
            var yCoord = 0;
            var yDist = 45
            var xCoordMultiplier = 0;

            var numGrey = (h * w) - Math.ceil(instr.count);
            console.log(numGrey);

            var c = 1;

            for (var i = 0; i < h; ++i) 
            {
                for (var j = 0; j < w; ++j, xCoordMultiplier++ , c++) 
                {
                    if (c > numGrey && partial) 
                    {
                        draw_partial_person(svgContainer, (c <= numGrey ? "#cccccc" : fill),
                            path, xCoordMultiplier * xDist, yCoord, decimal, backgroundFill);
                        partial = false;
                    }
                    else
                        draw_person(svgContainer, (c <= numGrey ? "#cccccc" : fill),
                            path, xCoordMultiplier * xDist, yCoord, backgroundFill)
                }
                xCoordMultiplier = 0;
                yCoord += yDist;
            }
            if (key && h > 3) 
            {
                yCoord += 25;

                var txt = "Number of people affected: " + instr.count;

                draw_person(svgContainer, "#cccccc", path, w * xDist + 30, 
                    (h / 2 * personHeight) - 44, backgroundFill, "key");

                svgContainer.append("text")
                    .attr("x", w * xDist + 32)
                    .attr("y", h / 2 * personHeight + 20)
                    .attr("fill", "black")
                    .text("Not affected");

                draw_person(svgContainer, fill, path, w * xDist + 30, 
                    h / 2 * personHeight + 44, backgroundFill, "key")

                svgContainer.append("text")
                    .attr("x", w * xDist + 32)
                    .attr("y", h / 2 * personHeight + 110)
                    .attr("fill", "black")
                    .text("Affected");
            }
        },

        gif_array: function(divID, interval, data, options)
        {
            var index = 0
            var iconOptions = clone_object(options)
            iconOptions.divID = divID
            iconOptions.count = data[index]
            IconArray.draw_array(iconOptions)
            var fill = options.personFill ? options.personFill : defaultFill
            //total numer of svg rectangles
            var totalIcons = $("#" + divID + " .icon-body").length
        
            index += 1   
            var numIconsCurrentlyFilled = data[0]

            setInterval(function()
             {
                if(index === data.length)
                {
                    index = 0
                }
               // console.log("index::: ", index)
               numIconsCurrentlyFilled =  update_array(divID, totalIcons,
                    numIconsCurrentlyFilled, data[index], fill)
                index += 1

            }, interval * 1000)         
        },

        repeat_array: function (divID, interval, data, options)
        {
            var index = 0
            var iconOptions = clone_object(options)
            iconOptions.divID = divID
            iconOptions.count = data[index]
            IconArray.draw_array(iconOptions)
            index += 1
            setInterval(function () 
            {
                //set index back to beginning of data array if it gets past the end
                console.log("index:", index)
                if (index === data.length)
                {
                    index = 0
                }
                //move on to next data in the list
                iconOptions.count = data[index]
                //clear the html
                //right now using vanilla js, going to change when this no 
                //  longer uses d3js
                document.getElementById(divID).innerHTML = ""
                IconArray.draw_array(iconOptions)
                index += 1
            }, interval * 1000)
        }
    }

})();



/** GIF-like functionality for icon array. Cycles through a list of 
 *  data and changes the visual
 * @param {String} divID ID of the div you want the visual to show up in
 * @param {Number} interval number of seconds in between each icon array update
 * @param {array} data  array of numbers representing different counts
 * @param {object} options options for the icon array
 * example:
 * calling repeat_array("id2", 2, [1, 5, 7.25, 10.5, 23.2], {key: true}) will
 * make a gif-like icon array visual that cycles through the counts 1, 5, 7.25...
 * every 2 seconds and draws to a div with id of "id2". the {key: true} options 
 * object makes the key show up in the visual
)
 */
var repeat_array = (function () {

    return

})();
