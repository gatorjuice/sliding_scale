import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Calculator from '../components/Calculator'

Enzyme.configure({ adapter: new Adapter() })

describe('Calculator', () => {
  let props
  let mountedCalculator
  let shallowCalculator

  const calculator = () => {
    if (!mountedCalculator) {
      mountedCalculator = Enzyme.mount(
        <Calculator {...props} />
      )
    }
    return mountedCalculator
  }

  beforeEach(() => {
    props = {}
    mountedCalculator = undefined
    shallowCalculator = Enzyme.shallow(<Calculator />)
  })

  it('always renders a div', () => {
    const divs = calculator().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  const testCases = [
    { householdIncome: 12139.99, householdMembers: 1, serviceCost: '0%', hourlyCharge: '$5.00' },
    { householdIncome: 12140.00, householdMembers: 1, serviceCost: '0%', hourlyCharge: '$5.00' },
    { householdIncome: 20574.99, householdMembers: 2, serviceCost: '0%', hourlyCharge: '$5.00' },
    { householdIncome: 20575.00, householdMembers: 2, serviceCost: '20%', hourlyCharge: '$18.40' },
    { householdIncome: 31169.99, householdMembers: 3, serviceCost: '20%', hourlyCharge: '$18.40' },
    { householdIncome: 31170.00, householdMembers: 3, serviceCost: '40%', hourlyCharge: '$36.80' },
    { householdIncome: 43924.99, householdMembers: 4, serviceCost: '40%', hourlyCharge: '$36.80' },
    { householdIncome: 43925.00, householdMembers: 4, serviceCost: '60%', hourlyCharge: '$55.20' },
    { householdIncome: 58839.99, householdMembers: 5, serviceCost: '60%', hourlyCharge: '$55.20' },
    { householdIncome: 58840.00, householdMembers: 5, serviceCost: '80%', hourlyCharge: '$73.60' },
    { householdIncome: 84349.99, householdMembers: 6, serviceCost: '80%', hourlyCharge: '$73.60' },
    { householdIncome: 84350.00, householdMembers: 6, serviceCost: '100%', hourlyCharge: '$92.00' },
    { householdIncome: 1000000, householdMembers: 1, serviceCost: '100%', hourlyCharge: '$92.00' }
  ]

  testCases.forEach((testCase) => {
    it('properly calculates', () => {
      shallowCalculator.setState({
        householdIncome: testCase.householdIncome,
        householdMembers: testCase.householdMembers
      })

      expect(shallowCalculator.find('#service-cost').html()).toContain(testCase.serviceCost)
      expect(shallowCalculator.find('#hourly-charge').html()).toContain(testCase.hourlyCharge)
    })
  })
})
