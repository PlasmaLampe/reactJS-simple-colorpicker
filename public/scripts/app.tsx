import * as React     from "react"
import * as ReactDOM  from "react-dom"

class Helper {
  static componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  static rgbToHex(r, g, b) {
      return "#" + Helper.componentToHex(r) + Helper.componentToHex(g) + Helper.componentToHex(b);
  }

  static hexToRGB(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
}

/**
*   The wrapper Component. Contains the default colors and the color sliders.
*/
class ColorPicker extends React.Component<any,any> {
  colorClicked(chosenColor) {
    this.setState({chosenColor : chosenColor});
  }

  onColorComponentChanged(colorName, value){
    var currentRGBValues = Helper.hexToRGB(this.state.chosenColor);

    switch(colorName){
      case 'red':
        this.setState({chosenColor : Helper.rgbToHex(value,currentRGBValues.g,currentRGBValues.b)}); break;
      case 'green':
        this.setState({chosenColor : Helper.rgbToHex(currentRGBValues.r,value,currentRGBValues.b)}); break;
      case 'blue':
        this.setState({chosenColor : Helper.rgbToHex(currentRGBValues.r,currentRGBValues.g,value)}); break;

      default:
        console.error('color must be element red/green/blue...')
    }
  }

  constructor(props : any) {
    super();

    this.props = props;
    this.state = {chosenColor: '#FFFFFF'};
  }

  render() {
    var flexColumn = {
      flexDirection : 'column',
      justifyContent: 'space-between',
      display: 'flex'
    }

    var flexRow = {
      flexDirection : 'row',
      justifyContent: 'space-between',
      flexWrap : 'wrap',
      display: 'flex'
    }

    var colors = ['#FF0000', '#00FF00', '#0000FF']
    var boxes = colors.map((colorOfThisBox) => {
      return (
        <div>
          <ColorBox id={'colorbox_'+colorOfThisBox} onClickCallback={this.colorClicked.bind(this)} key={colorOfThisBox} color={colorOfThisBox}/>
        </div>
      );
    });

    return (
      <div id='colorpicker' className="colorpicker" style={flexColumn}>
        <div id='currentColorBox' style={flexRow}>
          <ColorBox id={'colorbox_current'} key={this.state.chosenColor} color={this.state.chosenColor}/>
          <small> Current color </small>
        </div>

        <hr/>

        <div id='defaultColors' style={flexRow}>
          {boxes}
        </div>

        <div id='slidergroup'>
          <h4 className="colorpickerHeading">RGB</h4>
          <ColorRGBSlider colorname='red'   color={Helper.hexToRGB(this.state.chosenColor).r} colorChanged={this.onColorComponentChanged.bind(this)}></ColorRGBSlider>
          <ColorRGBSlider colorname='green' color={Helper.hexToRGB(this.state.chosenColor).g} colorChanged={this.onColorComponentChanged.bind(this)}></ColorRGBSlider>
          <ColorRGBSlider colorname='blue'  color={Helper.hexToRGB(this.state.chosenColor).b} colorChanged={this.onColorComponentChanged.bind(this)}></ColorRGBSlider>
        </div>
      </div>
    )
  }
}

/**
*   A small box that shows a specific color. Furthermore, it is able to
*   handle a given click event
*/
class ColorBox extends React.Component<any,any> {
  handleClick() {
    this.props.onClickCallback(this.props.color)
  }

  constructor(props : any) {
    super();

    this.props = props;
  }

  render() {
    var styleObj = {
      backgroundColor : this.props.color,
    }

    return (
      <div id={this.props.id} className="colorbox" style={styleObj} onClick={this.handleClick.bind(this)}></div>
    )
  }
}

/**
*   A slider that is used to modify a specific color value
*/
class ColorRGBSlider extends React.Component<any,any> {
  colorChanged(event){
    // propagate
    this.props.colorChanged(this.props.colorname, parseInt(event.target.value))
  }

  constructor(props : any) {
    super();

    this.props = props;
    this.state = {sliderColorValue: this.props.color}
  }

  render() {
    var flexRow = {
      flexDirection : 'row',
      justifyContent: 'space-between'
    }

      return (
        <div>
            <small style={flexRow}>{this.props.colorname.charAt(0)}</small>

            <input type="range"  id={"slider_"+this.props.colorname}
            value={this.props.color}
            onChange={this.colorChanged.bind(this)}
            min="0" max="255" step="1"></input>
        </div>
      );
  }
}


/**
*   Attach the whole stuff to the DOM tree
*/
ReactDOM.render(
  <ColorPicker/>,
  document.getElementById('content')
);
