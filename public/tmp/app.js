"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var Helper = (function () {
    function Helper() {
    }
    Helper.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    Helper.rgbToHex = function (r, g, b) {
        return "#" + Helper.componentToHex(r) + Helper.componentToHex(g) + Helper.componentToHex(b);
    };
    Helper.hexToRGB = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    return Helper;
}());
var ColorPicker = (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(props) {
        _super.call(this);
        this.props = props;
        this.state = { chosenColor: '#FFFFFF' };
    }
    ColorPicker.prototype.colorClicked = function (chosenColor) {
        this.setState({ chosenColor: chosenColor });
    };
    ColorPicker.prototype.onColorComponentChanged = function (colorName, value) {
        var currentRGBValues = Helper.hexToRGB(this.state.chosenColor);
        switch (colorName) {
            case 'red':
                this.setState({ chosenColor: Helper.rgbToHex(value, currentRGBValues.g, currentRGBValues.b) });
                break;
            case 'green':
                this.setState({ chosenColor: Helper.rgbToHex(currentRGBValues.r, value, currentRGBValues.b) });
                break;
            case 'blue':
                this.setState({ chosenColor: Helper.rgbToHex(currentRGBValues.r, currentRGBValues.g, value) });
                break;
            default:
                console.error('color must be element red/green/blue...');
        }
    };
    ColorPicker.prototype.render = function () {
        var _this = this;
        var flexColumn = {
            flexDirection: 'column',
            justifyContent: 'space-between',
            display: 'flex'
        };
        var flexRow = {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            display: 'flex'
        };
        var colors = ['#FF0000', '#00FF00', '#0000FF'];
        var boxes = colors.map(function (colorOfThisBox) {
            return (React.createElement("div", null, 
                React.createElement(ColorBox, {id: 'colorbox_' + colorOfThisBox, onClickCallback: _this.colorClicked.bind(_this), key: colorOfThisBox, color: colorOfThisBox})
            ));
        });
        return (React.createElement("div", {id: 'colorpicker', className: "colorpicker", style: flexColumn}, 
            React.createElement("div", {id: 'currentColorBox', style: flexRow}, 
                React.createElement(ColorBox, {id: 'colorbox_current', key: this.state.chosenColor, color: this.state.chosenColor}), 
                React.createElement("small", null, " Current color ")), 
            React.createElement("hr", null), 
            React.createElement("div", {id: 'defaultColors', style: flexRow}, boxes), 
            React.createElement("div", {id: 'slidergroup'}, 
                React.createElement("h4", {className: "colorpickerHeading"}, "RGB"), 
                React.createElement(ColorRGBSlider, {colorname: 'red', color: Helper.hexToRGB(this.state.chosenColor).r, colorChanged: this.onColorComponentChanged.bind(this)}), 
                React.createElement(ColorRGBSlider, {colorname: 'green', color: Helper.hexToRGB(this.state.chosenColor).g, colorChanged: this.onColorComponentChanged.bind(this)}), 
                React.createElement(ColorRGBSlider, {colorname: 'blue', color: Helper.hexToRGB(this.state.chosenColor).b, colorChanged: this.onColorComponentChanged.bind(this)}))));
    };
    return ColorPicker;
}(React.Component));
var ColorBox = (function (_super) {
    __extends(ColorBox, _super);
    function ColorBox(props) {
        _super.call(this);
        this.props = props;
    }
    ColorBox.prototype.handleClick = function () {
        this.props.onClickCallback(this.props.color);
    };
    ColorBox.prototype.render = function () {
        var styleObj = {
            backgroundColor: this.props.color,
        };
        return (React.createElement("div", {id: this.props.id, className: "colorbox", style: styleObj, onClick: this.handleClick.bind(this)}));
    };
    return ColorBox;
}(React.Component));
var ColorRGBSlider = (function (_super) {
    __extends(ColorRGBSlider, _super);
    function ColorRGBSlider(props) {
        _super.call(this);
        this.props = props;
        this.state = { sliderColorValue: this.props.color };
    }
    ColorRGBSlider.prototype.colorChanged = function (event) {
        this.props.colorChanged(this.props.colorname, parseInt(event.target.value));
    };
    ColorRGBSlider.prototype.render = function () {
        var flexRow = {
            flexDirection: 'row',
            justifyContent: 'space-between'
        };
        return (React.createElement("div", null, 
            React.createElement("small", {style: flexRow}, this.props.colorname.charAt(0)), 
            React.createElement("input", {type: "range", id: "slider_" + this.props.colorname, value: this.props.color, onChange: this.colorChanged.bind(this), min: "0", max: "255", step: "1"})));
    };
    return ColorRGBSlider;
}(React.Component));
ReactDOM.render(React.createElement(ColorPicker, null), document.getElementById('content'));
