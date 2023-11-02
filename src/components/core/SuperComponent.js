import validationState from "../utils/validation.js";

export default function SuperComponent(state) {}

SuperComponent.prototype.setState = function test(nextState) {
  console.log(this, "비교", this.state, nextState);
  // 초기값 아니고
  if (this.state !== undefined) {
    // 이전과 같으면 렌더링 pass
    if (this.state === nextState) return;
    // validation 통과못하면 에러 알림, 렌더링 pass
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
