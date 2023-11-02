export default function SuperComponent(state) {
  this.state = state;
}

SuperComponent.prototype.setState = function (nextState) {
  this.state = nextState;
  this.render();
};

SuperComponent.prototype.render = function () {
  alert("setState 상속받을꺼면 render 함수를 구현하세요.");
};
