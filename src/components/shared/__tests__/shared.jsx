import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import React from 'react';
import $ from 'teaspoon';
import { Person } from 'blockstack';

import NavBar from '../NavBar';
import NotFound from '../NotFound';
import PageContentWrapper from '../PageContentWrapper';
import SideBar from '../SideBar';

import { avatarFallbackImage, defaultUser } from '../../../reducers/user';

chai.use(dirtyChai);

describe('Shared Components', () => {
  describe('Nav Bar', () => {
    const user = new Person(defaultUser);
    it('should render the NavBar component', () => {
      const $root = $(<NavBar user={user} />).shallowRender();
      const navBrand = $root.find('.navbar-brand');
      expect($root.length).to.be.least(1);
      expect(navBrand.length).to.be.least(1);
      expect(navBrand.text()).to.equal(' UpSkill');
      expect($root.find('.navbar-nav').length).to.be.least(1);
    });

    it('avatar image url should be fallback image', () => {
      expect(user.avatarUrl()).to.equal(avatarFallbackImage);
    });

    it('user name should be Anonymous', () => {
      expect(user.name()).to.equal('Anonymous');
    });
  });

  describe('Not Found', () => {
    it('should render the NotFound component', () => {
      const $root = $(<NotFound />).shallowRender();
      expect($root.length).to.be.least(1);
    });
  });

  describe('Page Content Wrapper', () => {
    const header = 'Test';
    const content = <div />;
    it('should render the Page Content Wrapper component', () => {
      const $root = $(<PageContentWrapper content={content} header={header} />).shallowRender();
      expect($root.length).to.be.least(1);
      expect($root.find('h2').text()).to.equal('Test');
    });
  });

  describe('Side Bar', () => {
    const highlight = 'home';
    it('should render the SideBar component', () => {
      const $root = $(<SideBar highlight={highlight} />).shallowRender();
      expect($root.length).to.be.least(1);
    });
  });
});
