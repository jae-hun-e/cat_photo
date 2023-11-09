import validateState from "../../utils/validation.js";
import { isEqual } from "../../utils/lodash.js";

export default function SuperComponent(state) {}

SuperComponent.prototype.setState = function (nextState) {
  if (this.state !== undefined) {
    if (isEqual(this.state, nextState)) return;

    if (!validateState(this.state, nextState)) {
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
