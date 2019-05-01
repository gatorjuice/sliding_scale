import React from 'react'
import scale from '../helpers/scale'

class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      householdMembers: 1,
      householdIncome: 0.0,
      medicaidFee: 94.4
    }

    this.handleChangeEvent = this.handleChangeEvent.bind(this)
    this.calculatePovertyLevels = this.calculatePovertyLevels.bind(this)
    this.lowestPovertyLevelIndex = this.lowestPovertyLevelIndex.bind(this)
  }

  handleChangeEvent (event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  calculatePovertyLevels (householdMembers) {
    const povertyLevel = 12140 + ((householdMembers - 1) * 4320)

    return [
      povertyLevel,
      povertyLevel * 1.25,
      povertyLevel * 1.5,
      povertyLevel * 1.75,
      povertyLevel * 2,
      povertyLevel * 2.5
    ]
  }

  lowestPovertyLevelIndex () {
    const povertyLevels = this.calculatePovertyLevels(this.state.householdMembers)

    const highestTiers = []

    povertyLevels.forEach((amount, index) => {
      if (this.state.householdIncome >= amount) {
        highestTiers.push(index)
      }
    })

    return highestTiers[highestTiers.length - 1] || 0
  }

  render () {
    const medicaidFee = this.state.medicaidFee
    const lowestTier = scale(medicaidFee)[this.lowestPovertyLevelIndex()]

    return (
      <div>
        <form>
          <label>
            <p className='title'>Household Members:</p>
            <input
              className='form-control'
              name='householdMembers'
              type='number'
              value={this.state.householdMembers}
              onChange={this.handleChangeEvent}
            />
          </label>
          <br></br>
          <label>
            <p className='title'>Household Income:</p>
            <input
              className='form-control'
              name='householdIncome'
              type='number'
              value={this.state.householdIncome}
              onChange={this.handleChangeEvent}
            />
          </label>
          <br></br>
          <label>
            <p className='title'>Medicaid Fee:</p>
            <p className='helper-text'>QMHP: $94.40 | MHP: $68.72</p>
            <input
              className='form-control'
              name='medicaidFee'
              type='number'
              value={this.state.medicaidFee}
              onChange={this.handleChangeEvent}
            />
          </label>
          <br></br>
        </form>
        <p>Total Service Cost:</p>
        <h3 id='service-cost'>{lowestTier.percentOfServiceCost}%</h3>
        <p>Hourly Service Charge:</p>
        <h3 id='hourly-charge'>${lowestTier.hourlyServiceCharge.toFixed(2)}</h3>
      </div>
    )
  }
}

export default Calculator
