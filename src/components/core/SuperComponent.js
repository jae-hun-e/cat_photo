import validationState from "../../utils/validation.js";

export default function SuperComponent(state) {}

SuperComponent.prototype.setState = function test(nextState) {
  if (this.state !== undefined) {
    if (this.state === nextState) return;
    if (!validationState(this.state, nextState)) {
      alert("nextState 에 잘못된 값이 들어왔습니다.");
      return;
    }
  }

  this.state = nextState;
  this.render();
};

SuperComponent.prototype.render = function () {
  alert("setState 상속받을꺼면 render 함수를 구현하세요.");
};
