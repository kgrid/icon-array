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
var draw_array = (function()
{
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

    //-----FUNCTIONS-----
    var initialize_svg = function(divID, width, height, backgroundFill)
	{
        var svgContainer = d3.selectAll("#" + divID).append("svg")
            .attr("fill", backgroundFill)
            .attr("width", width)
            .attr("height", height);

        return svgContainer;
    }

    var draw_person = function(svgContainer, fill, path, x, y, backgroundFill)
	{
        svgContainer.append("rect")
            .attr("height", personHeight)
            .attr("width", personWidth)
            .attr("fill", fill)
            .attr("transform", "translate(" + x + ", " + y + ")");

        svgContainer.append("path")
            .attr("fill", backgroundFill)
            .attr("d", path)
            .attr("transform", "translate(" + x + ", " + y + ")");
    }

    var draw_partial_person = function(svgContainer, fill, path, x, y, portion, backgroundFill)
	{

        svgContainer.append("rect")
            .attr("height", personHeight)
            .attr("width", personWidth)
            .attr("fill", fill)
            .attr("transform", "translate(" + x + ", " + y + ")");

        svgContainer.append("rect")
            .attr("height", personHeight * (1 - portion))
            .attr("width", personWidth)
            .attr("fill", "#cccccc")
            .attr("transform", "translate(" + x + ", " + y + ")");


        svgContainer.append("path")
            .attr("fill", backgroundFill)
            .attr("d", path)
            .attr("transform", "translate(" + x + ", " + y + ")");
    }

    //-----BEGIN-----
    return function(instr)
    {
        var h = instr.gridHeight ? instr.gridHeight : defaultHeight
        var w = instr.gridWidth ? instr.gridWidth : defaultWidth
        var height = instr.gridHeight ? (45 * instr.gridHeight + 29) : (45 * defaultHeight + 29)
        console.log(height)
        var width = instr.gridWidth ? (44 * instr.gridWidth) : (44 * defaultWidth + 29)
        console.log(width)
        var key = instr.key ? true : false
        console.log(key)
        var fill = instr.personFill ? instr.personFill : "steelblue"
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
            for (var j = 0; j < w; ++j, xCoordMultiplier++, c++)
    		{
                if (c > numGrey && partial)
    			{
                    draw_partial_person(svgContainer, (c <= numGrey ? "#cccccc" : fill), 
                        path, xCoordMultiplier * xDist, yCoord, decimal, backgroundFill);
                    partial = false;
                }
    			else
                    draw_person(svgContainer, (c <= numGrey? "#cccccc" : fill), 
                        path, xCoordMultiplier * xDist, yCoord, backgroundFill)
            }
            xCoordMultiplier = 0;
            yCoord += yDist;
        }
        console.log(3)
        if (key && h > 3)
    	 {
            yCoord += 25;

            var txt = "Number of people affected: " + instr.count;

            draw_person(svgContainer, "#cccccc", path, w * xDist + 30, (h / 2 * personHeight) - 44);

            svgContainer.append("text")
                .attr("x", w * xDist + 32)
                .attr("y", h / 2 * personHeight + 20)
                .attr("fill", "black")
                .text("Not affected");

            draw_person(svgContainer, fill, path, w * xDist + 30, h / 2 * personHeight + 44)

            svgContainer.append("text")
                .attr("x", w * xDist + 32)
                .attr("y", h / 2 * personHeight + 110)
                .attr("fill", "black")
                .text("Affected");
        }
    }

})();

