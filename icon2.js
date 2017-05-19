//divID , count, gridWidth = 10, gridHeight = 10, personFill = "steelblue", backgroundFill = "#FFFFFF", key=true

var IconArray = (function() 
{
    "use strict";

    /**
     * creates an svg element with specified attributes
     * 
     * @param {string} tag type of svg element to create
     * @param {object} attributes attributes for svg element
     * @returns 
     */
    var create_svg_element = function(tag, attributes)
    {
        var el = document.createElementNS('http://www.w3.org/2000/svg', tag)
        for (var k in attributes)
        {
            el.setAttribute(k, attributes[k])
        }
        return el
    }

    //Artist class
    var Artist = (function()
    {
        //---PRIVATE METHODS---

    
        //---PUBLIC METHODS---

        //constructor
        /**
         * Artist constructor
         * 
         * @param {string} in_fill fill color for icons
         * @param {string} in_backgroundFill background color of web page
         * @param {object} in_svg svg element that will be used to draw icons
         */
        function Artist(in_fill, in_backgroundFill, in_svg) 
        {
            this.iconFill = in_fill
            this.backgroundFill = in_backgroundFill
            this.svgContainer = in_svg

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
        }

        /**
         * draws a person icon to the artist's icon array
         * 
         * @param {number} x x coordinate
         * @param {number} y y coordinate
         * @param {bool} filledIn set to true to fill icon, false to make it grey
         * @param {string} [type="icon-body"] 
         */
        Artist.prototype.draw_person = function(x, y, filledIn, type="icon-body") 
        {
            this.svgContainer.appendChild(create_svg_element("rect", {
                class: type,
                fill: filledIn ? this.iconFill : "#cccccc",
                transform: "translate(" + x + ", " + y + ")",
                height: this.personHeight,
                width: this.personWidth
            }))

            this.svgContainer.appendChild(create_svg_element("path", {
                fill: this.backgroundFill,
                d: this.path,
                transform: "translate(" + x + ", " + y + ")"
            }))
        }
        
         /**
         * draws a partially filled person icon to the artist's icon array
         * 
         * @param {number} x x coordinate
         * @param {number} y y coordinate
         * @param {float} portion decimal portion of icon to fill in
         * @param {string} [type="icon-body"] 
         */
        Artist.prototype.draw_partial_person = function(x, y, portion,
            type="partial-icon-body") 
        {
            this.svgContainer.appendChild(create_svg_element("rect", {
                class: type + "-bottom",
                height: this.personHeight,
                width: this.personWidth,
                fill: this.iconFill,
                transform: "translate(" + x + ", " + y + ")"
            }))

            this.svgContainer.appendChild(create_svg_element("rect", {
               class: type + "-top",
                height: this.personHeight * (1 - portion),
                width: this.personWidth,
                fill: "#cccccc",
                transform: "translate(" + x + ", " + y + ")"
            }))

            this.svgContainer.appendChild(create_svg_element("path", {
                fill: this.backgroundFill,
                d: this.path,
                transform: "translate(" + x + ", " + y + ")"
            }))
        }

        Artist.prototype.add_bottom_message = function(message)
        {
            var svgHeight = parseInt(this.svgContainer.getAttribute("height"))
            this.svgContainer.appendChild(create_svg_element("text", {
                x: 0,
                y: svgHeight - 10,
                fill: "black"
            })).innerHTML = message
        }

        return Artist
    })();

    //-----FUNCTIONS-----

    /**
     * creates svg element within specified div and initliazes it to specified
     * dimensions
     * 
     * @param {string} divID ID of div containing icon array
     * @param {number} width width of svg canvas
     * @param {number} height height of svg canvas
     * @param {string} backgroundFill background color for svg canvas
     * @returns {object} svg element
     */
    var initialize_svg = function(divID, width, height, backgroundFill) 
    {
       document.getElementById(divID).appendChild(create_svg_element("svg", {
            class: "icon-array",
            fill: backgroundFill,
            height: height,
            width: width
        }))
        var svg = document.getElementById(divID).getElementsByClassName("icon-array")[0]

        return svg;
    }

    var get_svg_container = function(divID)
    {
         return document.getElementById(divID).getElementsByClassName("icon-array")[0]
    }
   
    /**
     * returns true if number has a decimal, false otherwise
     * 
     * @param {number} num number
     * @returns {bool}
     */
    var hasDecimal = function(num)
    {
        return (num - Math.floor(num) > 0)
    }

    /**
     * makes a shallow copy of an object
     * 
     * @param {object} obj object to copy
     * @returns {object}
     */
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

    /**
     * removes all partially filled icons from the icon array
     * 
     * @param {string} divID ID of div containing icon array
     */
    var remove_partial = function(divID)
    {
        $("#" + divID + " .partial-icon-body-top").remove()
        $("#" + divID + " .partial-icon-body-bottom").remove()
    }

    /**
     * Gets the x,y coordinates of an icon on the icon array based off its index
     * 
     * @param {string} divID ID of div containing icon array
     * @param {number} index index of icon to get coordinates from
     * @returns 
     */
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
    var update_array = function(artist, divID, totalIcons, numCurrentFilled, newCount)
    {
        var decimalExists = hasDecimal(newCount)
        //figure out number of svg rectangles that will need to be drawn
        var numToFill = Math.floor(newCount)
        if(numToFill < numCurrentFilled)
        {
            //recolor all the ones after to be grey
            $("#" + divID + " .icon-body").attr("fill", "#cccccc")
        }
        //remove any partially filled icons
        remove_partial(divID)
        //fill the icons
        $("#" + divID + " .icon-body").slice(-1 * numToFill).attr("fill", artist.iconFill)

        if(decimalExists)
        {
            //this will get the last icon which will need to be filled partially
            var positions = get_icon_position(divID, totalIcons - numToFill - 1)
            var xPos = positions[0]
            var yPos = positions[1]

            //fill a partial person icon in the position
            artist.draw_partial_person(xPos, yPos, newCount - Math.floor(newCount))

            numToFill += 2

        }
        return numToFill
    }

    //default values
    var defaultHeight = 10
    var defaultWidth = 10
    var defaultFill = "steelblue"
    var defaultBackgroundFill = "#ffffff"
    var personHeight = 39;

    //used to keep track of ion arrays currently running on repeat_array
    var runningArrays = {}

    //-----BEGIN-----
    return {
        /**
         * draws icon array visual by appending svg tags
         * @param  {object} instr obect containing options for icon array
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
        draw_array: function (instr) 
        {
            var h = instr.gridHeight ? instr.gridHeight : defaultHeight
            var w = instr.gridWidth ? instr.gridWidth : defaultWidth
            var height = instr.gridHeight ? (45 * instr.gridHeight + 29) : (45 * defaultHeight + 29)
            var width = instr.gridWidth ? (44 * instr.gridWidth) : (44 * defaultWidth + 29)
            var key = instr.key ? true : false
            var fill = instr.personFill ? instr.personFill : defaultFill
            var backgroundFill = instr.backgroundFill ? instr.backgroundFill : defaultBackgroundFill
            //check if there should be a partial fill
            var decimal = instr.count - Math.floor(instr.count);
            if (decimal && decimal < 0.1) 
            {
                decimal = 0.1
            }
            var partial = (decimal != 0) ? true : false;

            //Make an SVG Container with proper dimensions
            var svgContainer = initialize_svg(instr.divID, width, height, backgroundFill);

            //make an object that will be used to draw the svg icons
            var artist = new Artist(fill, backgroundFill, svgContainer)

            //starting coordinates for beginning of icon array
            //starts at top left of svg canvas
            var xDist = 25;
            var yCoord = 0;
            var yDist = 45
            var xCoordMultiplier = 0;
            /*figure out how many grey icons ther will be before icons start
              being filled*/
            var numGrey = (h * w) - Math.ceil(instr.count);

            var c = 1;

            for (var i = 0; i < h; ++i) 
            {
                for (var j = 0; j < w; ++j, xCoordMultiplier++ , c++) 
                {
                    if (c > numGrey && partial) 
                    {
                        artist.draw_partial_person(xCoordMultiplier * xDist, 
                                                    yCoord, decimal)
                        partial = false;
                    }
                    else
                        artist.draw_person(xCoordMultiplier * xDist, yCoord, 
                                            c > numGrey)
                }
                xCoordMultiplier = 0;
                yCoord += yDist;
            }
            if (key && h > 3) 
            {
                yCoord += 25;
                var txt = "Number of people affected: " + instr.count;

                artist.draw_person(w * xDist + 30, (h / 2 * personHeight) - 44,
                                    false, "key")

                svgContainer.appendChild(create_svg_element("text", {
                    x: w * xDist + 32,
                    y: h / 2 * personHeight + 20,
                    fill: "black"
                })).innerHTML = "Not affected"

                artist.draw_person(w * xDist + 30, h / 2 * personHeight + 44, 
                                    true, "key")

                svgContainer.appendChild(create_svg_element("text", {
                                x: w * xDist + 32,
                                y: h / 2 * personHeight + 110,
                                fill: "black"
                            })).innerHTML = "Affected"
            }
        },

        /**
         * Draws an icon array in specified div and makes animation by continuously
         * updating the array to reflect new values
         * 
         * @param {string} divID id of div containing the icon array
         * @param {number} delay number of seconds between each update
         * @param {object} data list of numbers representing data  
         * @param {object} options options for icon array
         * @param {object} options.message specify whether or not to show message
         * @param {number} options.message.interval interval of time between each data entry
         * @param {string} options.message.timeframe time frame for data interval (ie "years", "days", etc.) 
         * @param {number} options.message.timestart starting time of data (ie 1 for start at 1 year)
         */
        repeat_array: function(divID, delay, data, options)
        {
            
            var index = 0
            var iconOptions = clone_object(options)
            iconOptions.divID = divID
            iconOptions.count = data[index]
            var fill = options.personFill ? options.personFill : defaultFill
            var backgroundFill = options.backgroundFill ? optiosn.backgroundFill : defaultBackgroundFill
            //total numer of svg rectangles
            var totalIcons = $("#" + divID + " .icon-body").length

            IconArray.draw_array(iconOptions)
            var artist = new Artist(fill, backgroundFill, get_svg_container(divID))

            var messageOpt = options.message ? true : false
            var time = options.message.timestart ? options.message.timestart : 0

            if(messageOpt)
            {
                artist.add_bottom_message("Value after <tspan id='icon-array-bot-msg'>" + time + "</tspan> " 
                                            + options.message.timeframe)
                time += options.message.interval
            }

            index += 1   
            var numIconsCurrentlyFilled = data[0]
        
            runningArrays[divID] = setInterval(function()
            {
                if(index === data.length)
                {
                    index = 0
                    time = options.message.timestart ? options.message.timestart : 0
                }
               numIconsCurrentlyFilled = update_array(artist, divID, totalIcons, 
                                            numIconsCurrentlyFilled, data[index])
                if(messageOpt)
                {
                    $("#" + divID + " #icon-array-bot-msg").html(time)
                    time += options.message.interval

                }
                index += 1
            }, delay * 1000)         
        },

        /**
         * clears the specified icon array
         * 
         * @param {string} divID ID of div containing Icon Array to clear
         */
        clear_array: function(divID)
        {
            //check if the icon array is running on repeat_array
            //if it is, then stop the loop
            if(runningArrays.hasOwnProperty(divID))
            {
                clearInterval(runningArrays[divID])
                delete runningArrays[divID]
            }
            document.getElementById(divID).innerHTML = ""
        }
    }

})();
