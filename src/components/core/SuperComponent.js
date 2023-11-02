export default function SuperComponent(state) {}

SuperComponent.prototype.setState = function test(nextState) {
  console.log("비교", this, this.state, nextState, this.state === nextState);
  if (this.state === nextState) return;
  console.log("리렌더링 함", this);
  this.state = nextState;
  this.render();
};

SuperComponent.prototype.render = function () {
  alert("setState 상속받을꺼면 render 함수를 구현하세요.");
};
