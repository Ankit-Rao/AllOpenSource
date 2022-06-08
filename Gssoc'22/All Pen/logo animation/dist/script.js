class Logo extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.isShown) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    TweenMax.fromTo(
    this.ringContainer,
    0.7,
    { scale: 0, transformOrigin: "center" },
    { scale: 1, ease: Back.easeOut, delay: 0.6 });

    TweenMax.fromTo(
    this.ring,
    1.5,
    { opacity: 0, rotation: -720, transformOrigin: "center" },
    { opacity: 1, rotation: 60, ease: Quint.easeOut, delay: 0.6 });

    TweenMax.staggerFromTo(
    [this.bar1, this.bar2, this.bar3, this.bar4],
    1.2,
    { opacity: 0, y: 320, transformOrigin: "center" },
    { opacity: 1, y: 0, ease: Quint.easeInOut },
    0.07);


  }
  hide() {
    TweenMax.fromTo(
    this.ringContainer,
    0.7,
    { scale: 1, transformOrigin: "center" },
    { scale: 0, ease: Back.easeIn });

    TweenMax.fromTo(
    this.ring,
    1.5,
    { opacity: 1, rotation: 60, ease: Quint.easeOut },
    { opacity: 0, rotation: 660, transformOrigin: "center" });

    TweenMax.staggerFromTo(
    [this.bar1, this.bar2, this.bar3, this.bar4],
    1.2,
    { opacity: 1, y: 0 },
    { opacity: 0, y: 320, ease: Quint.easeInOut },
    -0.07);


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 400 400" }, /*#__PURE__*/
      React.createElement("clipPath", { id: "ring-mask" }, /*#__PURE__*/
      React.createElement("path", { d: "M144.9,71.4a140 140 0 1 1 -35.1 21.7v56.8a103 103 0 1 0 54 -46.4z" })), /*#__PURE__*/

      React.createElement("clipPath", { id: "b-mask" }, /*#__PURE__*/
      React.createElement("path", { d: "M200,120A80 80 0 1 1 200 280A80 80 0 1 1 200 120ZM120,200v-152l37,64v88" })), /*#__PURE__*/

      React.createElement("g", {
        clipPath: "url(#ring-mask)",
        ref: element => {
          this.ringContainer = element;
        } }, /*#__PURE__*/

      React.createElement("g", {
        ref: element => {
          this.ring = element;
        } }, /*#__PURE__*/

      React.createElement("rect", { x: "55", y: "55", width: "140", height: "140", fill: "#279ca3" }), /*#__PURE__*/
      React.createElement("rect", { x: "205", y: "55", width: "140", height: "140", fill: "#c6ced0" }), /*#__PURE__*/
      React.createElement("rect", { x: "55", y: "205", width: "140", height: "140", fill: "#7b7a7f" }), /*#__PURE__*/
      React.createElement("rect", { x: "205", y: "205", width: "140", height: "140", fill: "#a5a3b0" }))), /*#__PURE__*/


      React.createElement("g", { clipPath: "url(#b-mask)", fill: "#d2ba70", ref: element => {
          this.barContainer = element;
        } }, /*#__PURE__*/



      React.createElement("path", { d: "M261,148.2A80 80 0 0 1 280 200v82h-19", ref: element => this.bar1 = element }), /*#__PURE__*/
      React.createElement("path", { d: "M214,121.2A80 80 0 0 1 251 138.3v144h-37", ref: element => this.bar2 = element }), /*#__PURE__*/
      React.createElement("path", { d: "M167,127A80 80 0 0 1 204 120.1v162h-37", ref: element => this.bar3 = element }), /*#__PURE__*/
      React.createElement("path", { d: "M120,48l37,64v170h-37", ref: element => this.bar4 = element }))));



  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: true };

  }
  onToggle(e) {
    this.setState({ isShown: !e.target.checked });
  }
  render() {
    const { isShown } = this.state;
    return [/*#__PURE__*/
    React.createElement(Logo, { key: "logo", isShown: isShown }), /*#__PURE__*/
    React.createElement("input", {
      type: "checkbox",
      name: "checkbox",
      id: "toggle",
      key: "toggle",
      onChange: e => {
        this.onToggle(e);
      } }), /*#__PURE__*/

    React.createElement("label", { htmlFor: "toggle" })];

  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));