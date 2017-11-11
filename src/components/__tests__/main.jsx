import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);

describe('Main App', () => {
  it('executes a test', () => {
    expect('A').to.equal('A');
  });
});
