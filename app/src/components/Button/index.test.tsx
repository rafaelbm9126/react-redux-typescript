import React from "react";
import { Button } from "./index";
// import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const component = shallow((
      <Button text="test" type="button" click={mockCallBack}></Button>
    ));
    const button = component.find("ButtonComponent");
    expect(button.length).toBe(1);
    button.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
});
