import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
// import HomeScreen from './src/screens/HomeScreen';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
