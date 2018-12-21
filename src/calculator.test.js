import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calculator from './calculator';

Enzyme.configure({ adapter: new Adapter() });

describe('Calculator', () => {
  let props;
  let mountedCalculator;
  let shallowCalculator;

  const calculator = () => {
    if (!mountedCalculator) {
      mountedCalculator = Enzyme.mount(
        <Calculator {...props} />
      );
    }
    return mountedCalculator;
  }

  beforeEach(() => {
    props = {};
    mountedCalculator = undefined;
    shallowCalculator = Enzyme.shallow(<Calculator />);
  });

  it('always renders a div', () => {
    const divs = calculator().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('properly calculates under the poverty line', () => {
    shallowCalculator.setState({householdIncome: 12139.99, householdMembers: 1});

    expect(shallowCalculator.find('#service-cost').html()).toContain('0%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$5.00');
  });

  it('properly calculates at the poverty line', () => {
    shallowCalculator.setState({householdIncome: 12140, householdMembers: 1});

    expect(shallowCalculator.find('#service-cost').html()).toContain('20%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$18.40');
  });

  it('properly calculates at just above the poverty line', () => {
    shallowCalculator.setState({householdIncome: 12140.01, householdMembers: 1});

    expect(shallowCalculator.find('#service-cost').html()).toContain('20%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$18.40');
  });

  it('properly calculates just below 125% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 20574.99, householdMembers: 2});

    expect(shallowCalculator.find('#service-cost').html()).toContain('20%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$18.40');
  });

  it('properly calculates at 125% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 20575, householdMembers: 2});

    expect(shallowCalculator.find('#service-cost').html()).toContain('20%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$18.40');
  });

  it('properly calculates just above 125% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 20575.01, householdMembers: 2});

    expect(shallowCalculator.find('#service-cost').html()).toContain('20%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$18.40');
  });

  it('properly calculates just below 150% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 31169.99, householdMembers: 3});

    expect(shallowCalculator.find('#service-cost').html()).toContain('20%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$18.40');
  });

  it('properly calculates at 150% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 31170, householdMembers: 3});

    expect(shallowCalculator.find('#service-cost').html()).toContain('40%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$36.80');
  });

  it('properly calculates just above 150% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 31170.01, householdMembers: 3});

    expect(shallowCalculator.find('#service-cost').html()).toContain('40%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$36.80');
  });

  it('properly calculates just below the 175% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 43924.99, householdMembers: 4});

    expect(shallowCalculator.find('#service-cost').html()).toContain('40%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$36.80');
  });

  it('properly calculates at the 175% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 43925, householdMembers: 4});

    expect(shallowCalculator.find('#service-cost').html()).toContain('60%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$55.20');
  });

  it('properly calculates just below the 200% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 58839.99, householdMembers: 5});

    expect(shallowCalculator.find('#service-cost').html()).toContain('60%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$55.20');
  });

  it('properly calculates at the 200% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 58840, householdMembers: 5});

    expect(shallowCalculator.find('#service-cost').html()).toContain('80%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$73.60');
  });

  it('properly calculates just below the 250% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 84349.99, householdMembers: 6});

    expect(shallowCalculator.find('#service-cost').html()).toContain('80%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$73.60');
  });

  it('properly calculates at the 250% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 84350, householdMembers: 6});

    expect(shallowCalculator.find('#service-cost').html()).toContain('100%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$92.00');
  });

  it('properly calculates above 250% of poverty line', () => {
    shallowCalculator.setState({householdIncome: 1000000, householdMembers: 1});

    expect(shallowCalculator.find('#service-cost').html()).toContain('100%');
    expect(shallowCalculator.find('#hourly-charge').html()).toContain('$92.00');
  });
});
