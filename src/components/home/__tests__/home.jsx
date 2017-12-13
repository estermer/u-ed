import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import React from 'react';
import $ from 'teaspoon';

import HomePage from '../HomePage';

chai.use(dirtyChai);

describe('Home Components', () => {
  describe('Home Page', () => {
    it('should render the Home Page component', () => {
      const $root = $(<HomePage />).shallowRender();
      expect($root.length).to.be.least(1);
    });
  });
});
