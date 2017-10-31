// Link.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { spy } from 'sinon';
import Button from '../';

test('Button', () => {
  const clickSpy = spy();
  const component = renderer.create(
    <Button onClick={clickSpy}>Facebook</Button>
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onClick();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  expect(clickSpy.called).toBeTruthy();
});
