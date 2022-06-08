let amplitudes = [];
const Waveform = ({ height = 60, segments = 25, progress = 0 }) => {
  const waveLength = 100 / segments;

  if (amplitudes.length !== segments + 1) {
    amplitudes = Array(segments + 1).
    fill().
    map(() => Math.random());
  }

  return /*#__PURE__*/(
    React.createElement("svg", { height: height }, /*#__PURE__*/
    React.createElement("clipPath", { id: "progress" }, /*#__PURE__*/
    React.createElement("rect", { width: `${progress * 100}%`, height: "100%" })), /*#__PURE__*/

    React.createElement("symbol", { id: "waveform" }, /*#__PURE__*/
    React.createElement("svg", { width: "100%", height: "50%", overflow: "hidden" },
    Array(segments + 1).
    fill().
    map((_, index) => {
      // x is waveLength y is amplitude
      return /*#__PURE__*/(
        React.createElement("rect", {
          x: `${index * waveLength - waveLength / 4}%`,
          y:
          index === 0 || index === segments ?
          `${100 - waveLength * 6}%` :
          `${50 * amplitudes[index]}%`,

          width: `${waveLength / 2}%`,
          height: "150%",
          rx: `${waveLength / 4}%` }));


    })), /*#__PURE__*/

    React.createElement("svg", { y: "50%", width: "100%", height: "50%", overflow: "hidden" },
    Array(segments + 1).
    fill().
    map((_, index) => {
      // x is waveLength -y is amplitude
      return /*#__PURE__*/(
        React.createElement("rect", {
          x: `${index * waveLength + waveLength / 4}%`,
          y:
          index === 0 || index >= segments - 1 ?
          `${waveLength * 6 - 150}%` :
          `${50 * amplitudes[index] - 100}%`,

          width: `${waveLength / 2}%`,
          height: "150%",
          rx: `${waveLength / 4}%` }));


    }))), /*#__PURE__*/


    React.createElement("use", { xlinkHref: "#waveform", fill: "none", stroke: "#ccc", "stroke-width": "2" }), /*#__PURE__*/
    React.createElement("use", {
      xlinkHref: "#waveform",
      fill: "none",
      stroke: "#0ff",
      "stroke-width": "2",
      "clip-path": "url(#progress)" })));



};
const App = () => {
  const [progress, setProgress] = React.useState(0.3);
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("input", {
      type: "range",
      min: "0",
      max: "1",
      step: "0.01",
      value: progress,
      onChange: event => setProgress(event.target.value) }), /*#__PURE__*/


    React.createElement(Waveform, { segments: 35, height: 160, progress: progress })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));