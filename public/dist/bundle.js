/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
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
	/**
	*   The wrapper Component. Contains the default colors and the color sliders.
	*/
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
	            justifyContent: 'space-between'
	        };
	        var flexRow = {
	            flexDirection: 'row',
	            justifyContent: 'space-between'
	        };
	        var colors = ['#FF0000', '#00FF00', '#0000FF'];
	        var boxes = colors.map(function (colorOfThisBox) {
	            return (React.createElement("div", null, 
	                React.createElement(ColorBox, {id: 'colorbox_' + colorOfThisBox, onClickCallback: _this.colorClicked.bind(_this), key: colorOfThisBox, color: colorOfThisBox})
	            ));
	        });
	        return (React.createElement("div", {id: 'colorpicker', style: flexColumn}, 
	            React.createElement("div", {id: 'currentColorBox'}, 
	                React.createElement(ColorBox, {id: 'colorbox_current', key: this.state.chosenColor, color: this.state.chosenColor}), 
	                " ", 
	                React.createElement("br", null)), 
	            React.createElement("div", {id: 'defaultColors', style: flexRow}, boxes), 
	            React.createElement("div", {id: 'slidergroup'}, 
	                React.createElement(ColorRGBSlider, {colorname: 'red', color: Helper.hexToRGB(this.state.chosenColor).r, colorChanged: this.onColorComponentChanged.bind(this)}), 
	                React.createElement(ColorRGBSlider, {colorname: 'green', color: Helper.hexToRGB(this.state.chosenColor).g, colorChanged: this.onColorComponentChanged.bind(this)}), 
	                React.createElement(ColorRGBSlider, {colorname: 'blue', color: Helper.hexToRGB(this.state.chosenColor).b, colorChanged: this.onColorComponentChanged.bind(this)}))));
	    };
	    return ColorPicker;
	}(React.Component));
	/**
	*   A small box that shows a specific color. Furthermore, it is able to
	*   handle a given click event
	*/
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
	            minHeight: 20,
	            minWidth: 20,
	            maxHeight: 40,
	            maxWidth: 40,
	            borderStyle: 'groove',
	            borderWidth: 3,
	            marginRight: 5
	        };
	        return (React.createElement("div", {id: this.props.id, style: styleObj, onClick: this.handleClick.bind(this)}));
	    };
	    return ColorBox;
	}(React.Component));
	/**
	*   A slider that is used to modify a specific color value
	*/
	var ColorRGBSlider = (function (_super) {
	    __extends(ColorRGBSlider, _super);
	    function ColorRGBSlider(props) {
	        _super.call(this);
	        this.props = props;
	        this.state = { sliderColorValue: this.props.color };
	    }
	    ColorRGBSlider.prototype.colorChanged = function (event) {
	        // propagate
	        this.props.colorChanged(this.props.colorname, parseInt(event.target.value));
	    };
	    ColorRGBSlider.prototype.render = function () {
	        var flexRow = {
	            flexDirection: 'row',
	            justifyContent: 'space-between'
	        };
	        return (React.createElement("div", null, 
	            React.createElement("small", {style: flexRow}, this.props.color), 
	            React.createElement("input", {type: "range", id: "slider_" + this.props.colorname, value: this.props.color, onChange: this.colorChanged.bind(this), min: "0", max: "255", step: "1"})));
	    };
	    return ColorRGBSlider;
	}(React.Component));
	/**
	*   Attach the whole stuff to the DOM tree
	*/
	ReactDOM.render(React.createElement(ColorPicker, null), document.getElementById('content'));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map