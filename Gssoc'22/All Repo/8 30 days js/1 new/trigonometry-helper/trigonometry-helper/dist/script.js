function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const { Component } = React;

class Angle extends Component {constructor(...args) {super(...args);_defineProperty(this, "handleMouseDown",
    e => {
      this.props.dragStart(e, this.props.index);
    });}

  render() {
    const {
      angle,
      index,
      isDragging,
      ...props } =
    this.props;

    const sketchHalfSize = props.sketchSize / 2;

    const numerator = angle.numerator !== "" ? angle.numerator : 1;
    const denominator = angle.denominator !== "" ? angle.denominator : 1;

    const radians = numerator / denominator * Math.PI;
    const cosRadius = sketchHalfSize + Math.cos(radians) * props.circleRadius;
    const sinRadius = sketchHalfSize - Math.sin(radians) * props.circleRadius;

    const angleRadius = 40;
    const cosAngleRadius = sketchHalfSize + Math.cos(radians) * angleRadius;
    const sinAngleRadius = sketchHalfSize - Math.sin(radians) * angleRadius;

    return /*#__PURE__*/(
      React.createElement("g", { className: "ad-SketchAngle" }, /*#__PURE__*/
      React.createElement("path", {
        className: "ad-SketchAngle-angle",
        d:
        "M " + (sketchHalfSize + angleRadius) + " " + sketchHalfSize +
        " A " + angleRadius + " " + angleRadius + ", " + (
        Math.sin(radians) < 0 ? "0, 1, 0" : "0, 0, 0") + ", " +
        cosAngleRadius + " " + sinAngleRadius +
        " L " + sketchHalfSize + " " + sketchHalfSize +
        " Z" }), /*#__PURE__*/


      React.createElement("g", { className: "ad-SketchAngle-trigo" }, /*#__PURE__*/
      React.createElement("line", {
        className: "ad-SketchAngle-cos",
        x1: sketchHalfSize,
        y1: sinRadius,
        x2: cosRadius,
        y2: sinRadius }), /*#__PURE__*/
      React.createElement("line", {
        className: "ad-SketchAngle-sin",
        x1: cosRadius,
        y1: sketchHalfSize,
        x2: cosRadius,
        y2: sinRadius })), /*#__PURE__*/


      React.createElement("line", {
        className: "ad-SketchAngle-line",
        x1: sketchHalfSize,
        y1: sketchHalfSize,
        x2: sketchHalfSize + props.circleRadius,
        y2: sketchHalfSize }), /*#__PURE__*/
      React.createElement("line", {
        className: "ad-SketchAngle-line",
        x1: sketchHalfSize,
        y1: sketchHalfSize,
        x2: cosRadius,
        y2: sinRadius }), /*#__PURE__*/

      React.createElement("circle", {
        className:
        "ad-SketchAngle-dot" + (
        isDragging === index ? " is-dragging" : ""),

        onMouseDown: this.handleMouseDown,
        cx: cosRadius,
        cy: sinRadius,
        r: 6 })));


  }}


class Sketch extends Component {
  render() {
    const {
      angles,
      ...props } =
    this.props;

    const sketchHalfSize = props.sketchSize / 2;
    const svgAngles = angles.map((angle, index) => {
      return /*#__PURE__*/React.createElement(Angle, _extends({
        angle: angle,
        index: index },
      props));
    });

    return /*#__PURE__*/(
      React.createElement("svg", {
        className: "ad-Sketch",
        viewBox: "0 0 " + props.sketchSize + " " + props.sketchSize }, /*#__PURE__*/
      React.createElement("g", { className: "ad-Sketch-base" }, /*#__PURE__*/
      React.createElement("line", {
        className: "ad-Sketch-ortho",
        x1: sketchHalfSize,
        y1: 0,
        x2: sketchHalfSize,
        y2: props.sketchSize }), /*#__PURE__*/
      React.createElement("line", {
        className: "ad-Sketch-ortho",
        x1: 0,
        y1: sketchHalfSize,
        x2: props.sketchSize,
        y2: sketchHalfSize }), /*#__PURE__*/

      React.createElement("text", {
        className: "ad-Sketch-hint",
        x: sketchHalfSize + 10,
        y: 10 }, "sin"), /*#__PURE__*/


      React.createElement("text", {
        className: "ad-Sketch-hint  ad-Sketch-hint--r",
        x: props.sketchSize - 5,
        y: sketchHalfSize - 10 }, "cos"), /*#__PURE__*/



      React.createElement("text", {
        className: "ad-Sketch-value",
        x: sketchHalfSize + props.circleRadius + 15,
        y: sketchHalfSize - 10 }, "0"), /*#__PURE__*/


      React.createElement("text", {
        className: "ad-Sketch-value  ad-Sketch-value--r",
        x: sketchHalfSize - (props.circleRadius + 15),
        y: sketchHalfSize - 10 }, "\u03C0"), /*#__PURE__*/


      React.createElement("text", {
        className: "ad-Sketch-value  ad-Sketch-value--c  ad-Sketch-value--t",
        x: sketchHalfSize,
        y: sketchHalfSize - (props.circleRadius + 10) }, "\u03C0 / 2"), /*#__PURE__*/


      React.createElement("text", {
        className: "ad-Sketch-value  ad-Sketch-value--c  ad-Sketch-value--b",
        x: sketchHalfSize,
        y: sketchHalfSize + props.circleRadius + 10 }, "3\u03C0 / 2"), /*#__PURE__*/



      React.createElement("circle", {
        className: "ad-Sketch-circle",
        cx: sketchHalfSize,
        cy: sketchHalfSize,
        r: props.circleRadius })), /*#__PURE__*/


      React.createElement("g", { className: "ad-Sketch-angles" },
      svgAngles)));



  }}


class Icon extends Component {
  render() {
    let path;

    switch (this.props.name) {
      case "clear":
        path = "M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z";
        break;

      case "add":
        path = "M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z";
        break;}


    return /*#__PURE__*/(
      React.createElement("svg", {
        className: "ad-Icon",
        viewBox: "0 0 1024 1024" }, /*#__PURE__*/
      React.createElement("path", { d: path })));


  }}


class Button extends Component {
  render() {
    const {
      type,
      size,
      icon,
      children,
      ...props } =
    this.props;

    return /*#__PURE__*/(
      React.createElement("button", _extends({
        className:
        "ad-Button" + (
        type ? " ad-Button--" + type : "") + (
        size ? " ad-Button--" + size : "") },

      props, {
        type: "button" }),
      icon && /*#__PURE__*/React.createElement(Icon, { name: icon }),

      children && /*#__PURE__*/
      React.createElement("span", { className: "ad-Button-text" },
      children)));





  }}


class FormGroup extends Component {constructor(...args) {super(...args);_defineProperty(this, "handleNumerator",
    e => {
      this.props.updateNumerator(this.props.index, e.target.value);
    });_defineProperty(this, "handleDenominator",

    e => {
      this.props.updateDenominator(this.props.index, e.target.value);
    });_defineProperty(this, "handleClick",

    e => {
      e.preventDefault();

      this.props.deleteFormGroup(this.props.index);
    });}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "ad-FormGroup" }, /*#__PURE__*/
      React.createElement("div", { className: "ad-FormGroup-color" }), /*#__PURE__*/

      React.createElement("div", { className: "ad-FormMath" }, /*#__PURE__*/
      React.createElement("div", { className: "ad-FormMath-frac" }, /*#__PURE__*/
      React.createElement("div", { className: "ad-FormMath-n" }, /*#__PURE__*/
      React.createElement("input", {
        className: "ad-FormInput",
        ref: "numerator",
        value: this.props.angle.numerator,
        onChange: this.handleNumerator,
        type: "text" })), /*#__PURE__*/


      React.createElement("div", { className: "ad-FormMath-n" }, /*#__PURE__*/
      React.createElement("input", {
        className: "ad-FormInput",
        ref: "denominator",
        value: this.props.angle.denominator,
        onChange: this.handleDenominator,
        type: "text" }))), /*#__PURE__*/



      React.createElement("div", { className: "ad-FormMath-formula" }, "\u03C0")), /*#__PURE__*/




      React.createElement("div", { className: "ad-FormGroup-action" }, /*#__PURE__*/
      React.createElement(Button, {
        onClick: this.handleClick,
        type: "cancel",
        size: "mini",
        icon: "clear" }))));



  }}


class Form extends Component {constructor(...args) {super(...args);_defineProperty(this, "handleClick",








    e => {
      e.preventDefault();

      this.props.addFormGroup();
    });_defineProperty(this, "handleBlur",

    e => {
      this.props.blurAddButton();
    });}componentDidUpdate() {const n = React.findDOMNode(this.refs.groups);if (this.props.shouldScroll) {n.scrollTop = n.scrollHeight;}}

  render() {
    const {
      angles,
      addFormGroup,
      ...props } =
    this.props;

    let groups = angles.map((angle, index) => {
      return /*#__PURE__*/(
        React.createElement(FormGroup, _extends({
          index: index,
          angle: angle },
        props)));

    });

    return /*#__PURE__*/(
      React.createElement("form", { className: "ad-Form" }, /*#__PURE__*/
      React.createElement("div", {
        className: "ad-Form-groups",
        ref: "groups" },
      groups), /*#__PURE__*/


      React.createElement("div", { className: "ad-Form-actions" }, /*#__PURE__*/
      React.createElement(Button, {
        onClick: this.handleClick,
        onBlur: this.handleBlur,
        type: "primary",
        size: "full",
        icon: "add" }, "Add angle"))));





  }}


class Trigonometry extends Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      isDragging: false,
      shouldScroll: false,
      angles: [
      {
        numerator: 7,
        denominator: 10 },

      {
        numerator: 3,
        denominator: 2 },

      {
        numerator: 1,
        denominator: 5 }] });_defineProperty(this, "updateNumerator",




    (index, numerator) => {
      if (numerator !== "") {
        numerator = parseFloat(numerator);
      }

      const angles = this.state.angles.map((angle, angleIndex) => {
        if (angleIndex === index) {
          numerator = numerator !== "" && isNaN(numerator) ? angle.numerator : numerator;

          return {
            numerator: numerator,
            denominator: angle.denominator };

        }

        return angle;
      });

      this.setState({ angles });
    });_defineProperty(this, "updateDenominator",

    (index, denominator) => {
      if (denominator !== "") {
        denominator = parseFloat(denominator);

        if (denominator === 0) {
          denominator = 1;
        }
      }

      const angles = this.state.angles.map((angle, angleIndex) => {
        if (angleIndex === index) {
          denominator = denominator !== "" && isNaN(denominator) ? angle.denominator : denominator;

          return {
            numerator: angle.numerator,
            denominator: denominator };

        }

        return angle;
      });

      this.setState({ angles });
    });_defineProperty(this, "blurAddButton",

    () => {
      this.setState({
        shouldScroll: false });

    });_defineProperty(this, "addFormGroup",

    () => {
      const numerator = 0,
      denominator = 1,
      angles = this.state.angles;

      angles.push({ numerator, denominator });

      this.setState({
        angles,
        shouldScroll: true });

    });_defineProperty(this, "deleteFormGroup",

    index => {
      let angles = this.state.angles;

      delete angles[index];

      this.setState({ angles });
    });_defineProperty(this, "drag",

    e => {
      let i = this.state.isDragging;
      let sketch = React.findDOMNode(this.refs.sketch).getBoundingClientRect();

      if (i !== false) {
        const sketchHalfSize = this.props.sketchSize / 2;

        let angles = this.state.angles,
        x = e.pageX - sketch.left - sketchHalfSize,
        y = sketchHalfSize - (e.pageY - sketch.top),
        rad = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        sine = y / rad,
        cosine = x / rad,
        theta;

        theta = Math.acos(cosine);

        if (sine < 0) {
          theta = 2 * Math.PI - theta;
        }

        const f = new Fraction((theta / Math.PI).toFixed(1));

        angles[i] = {
          numerator: f.n,
          denominator: f.d };


        this.setState({ angles });
      }
    });_defineProperty(this, "dragStart",

    (e, index) => {
      e.preventDefault();

      this.setState({
        isDragging: index });

    });_defineProperty(this, "dragEnd",

    e => {
      this.setState({
        isDragging: false });

    });}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "ad-App-head" }, /*#__PURE__*/
      React.createElement("h1", { className: "ad-App-title" }, "Trigonometry Helper"), /*#__PURE__*/



      React.createElement("div", { className: "ad-App-hint" }, "Type values to move an angle or drag it directly on the scheme.")), /*#__PURE__*/




      React.createElement("div", {
        className: "ad-Trigonometry",
        onMouseUp: this.dragEnd,
        onMouseMove: this.drag }, /*#__PURE__*/
      React.createElement("div", { className: "ad-Trigonometry-svg" }, /*#__PURE__*/
      React.createElement(Sketch, _extends({
        ref: "sketch",
        angles: this.state.angles,
        drag: this.drag,
        dragStart: this.dragStart,
        dragEnd: this.dragEnd,
        isDragging: this.state.isDragging },
      this.props))), /*#__PURE__*/


      React.createElement("div", { className: "ad-Trigonometry-form" }, /*#__PURE__*/
      React.createElement(Form, {
        angles: this.state.angles,
        shouldScroll: this.state.shouldScroll,
        updateNumerator: this.updateNumerator,
        updateDenominator: this.updateDenominator,
        blurAddButton: this.blurAddButton,
        addFormGroup: this.addFormGroup,
        deleteFormGroup: this.deleteFormGroup }))), /*#__PURE__*/



      React.createElement("div", { className: "ad-App-foot" }, /*#__PURE__*/
      React.createElement("a", { href: "https://twitter.com/a_dugois" }, "Follow me on Twitter"))));





  }}


React.render( /*#__PURE__*/
React.createElement(Trigonometry, {
  circleRadius: 130,
  sketchSize: 26 * 16 }),
document.querySelector("#app"));