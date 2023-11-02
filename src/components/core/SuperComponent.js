export default function SuperComponent(state) {
  this.state = state;
  this.render();
}

SuperComponent.prototype.setState = function (nextState) {
  this.state = nextState;
  this.render();
};

SuperComponent.prototype.render = function () {
  console.log("SuperComponent.render", this.state);
};
