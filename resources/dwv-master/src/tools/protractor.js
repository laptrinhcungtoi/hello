/** 
 * Tool module.
 * @module tool
 */
var dwv = dwv || {};
dwv.tool = dwv.tool || {};
var Kinetic = Kinetic || {};

/** 
 * Protractor factory.
 * @class ProtractorFactory
 * @namespace dwv.tool
 * @constructor
 */
dwv.tool.ProtractorFactory = function ()
{
    /** 
     * Get the number of points needed to build the shape.
     * @method getNPoints
     * @return {Number} The number of points.
     */
    this.getNPoints = function () { return 3; };
    /** 
     * Get the timeout between point storage.
     * @method getTimeout
     * @return {Number} The timeout in milliseconds.
     */
    this.getTimeout = function () { return 500; };
};  

/**
 * Create a protractor shape to be displayed.
 * @method ProtractorCreator
 * @static
 * @param {Array} points The points from which to extract the protractor.
 * @param {Object} style The drawing style.
 * @param {Object} image The associated image.
 */ 
dwv.tool.ProtractorFactory.prototype.create = function (points, style/*, image*/)
{
    // physical shape
    var line0 = new dwv.math.Line(points[0], points[1]);
    // points stored the kineticjs way
    var pointsArray = [];
    for( var i = 0; i < points.length; ++i )
    {
        pointsArray.push( points[i].getX() );
        pointsArray.push( points[i].getY() );
    }
    // draw shape
    var kshape = new Kinetic.Line({
        points: pointsArray,
        stroke: style.getLineColor(),
        strokeWidth: 2,
        name: "shape"
    });
    
    var ktext;
    if ( points.length == 3 ) {
        var line1 = new dwv.math.Line(points[1], points[2]);
        // quantification
        var quant = dwv.math.getAngle(line0, line1);
        var str = quant.toPrecision(4) + " deg";
        ktext = new Kinetic.Text({
            x: line0.getEnd().getX(),
            y: line0.getEnd().getY() - 15,
            text: str,
            fontSize: style.getFontSize(),
            fontFamily: "Verdana",
            fill: style.getLineColor(),
            name: "text"
        });
    }
    else {
        ktext = new Kinetic.Text({
            x: 0,
            y: 0,
            text: "",
            fontSize: style.getFontSize(),
            fontFamily: "Verdana",
            fill: style.getLineColor(),
            name: "text"
        });
    }
    // return group
    var group = new Kinetic.Group();
    group.add(kshape);
    group.add(ktext);
    return group;
};

/**
 * Update a protractor shape.
 * @method UpdateProtractor
 * @static
 * @param {Object} anchor The active anchor.
 * @param {Object} image The associated image.
 */ 
dwv.tool.UpdateProtractor = function (anchor/*, image*/)
{
    // parent group
    var group = anchor.getParent();
    // associated shape
    var kline = group.getChildren( function (node) {
        return node.name() === 'shape';
    })[0];
    // associated text
    var ktext = group.getChildren( function (node) {
        return node.name() === 'text';
    })[0];
    // find special points
    var begin = group.getChildren( function (node) {
        return node.id() === 'begin';
    })[0];
    var mid = group.getChildren( function (node) {
        return node.id() === 'mid';
    })[0];
    var end = group.getChildren( function (node) {
        return node.id() === 'end';
    })[0];
    // update special points
    switch ( anchor.id() ) {
    case 'begin':
        begin.x( anchor.x() );
        begin.y( anchor.y() );
        break;
    case 'mid':
        mid.x( anchor.x() );
        mid.y( anchor.y() );
        break;
    case 'end':
        end.x( anchor.x() );
        end.y( anchor.y() );
        break;
    }
    // update shape and compensate for possible drag
    // note: shape.position() and shape.size() won't work...
    var bx = begin.x() - kline.x();
    var by = begin.y() - kline.y();
    var mx = mid.x() - kline.x();
    var my = mid.y() - kline.y();
    var ex = end.x() - kline.x();
    var ey = end.y() - kline.y();
    kline.points( [bx,by,mx,my,ex,ey] );
    // update text
    var p2d0 = new dwv.math.Point2D(begin.x(), begin.y());
    var p2d1 = new dwv.math.Point2D(mid.x(), mid.y());
    var p2d2 = new dwv.math.Point2D(end.x(), end.y());
    var line0 = new dwv.math.Line(p2d0, p2d1);
    var line1 = new dwv.math.Line(p2d1, p2d2);
    var quant = dwv.math.getAngle( line0, line1 );
    var str = quant.toPrecision(4) + " deg";
    var textPos = { 'x': line0.getEnd().getX(), 'y': line0.getEnd().getY() - 15 };
    ktext.position( textPos );
    ktext.text(str);
};
