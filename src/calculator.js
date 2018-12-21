import React from 'react';
import NumberFormat from 'react-number-format';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      householdMembers: 1,
      householdIncome: 0.00,
      medicadeFee: 92.00
    };

    this.handleHouseholdIncomeChange = this.handleHouseholdIncomeChange.bind(this);
    this.handleHouseholdMembersChange = this.handleHouseholdMembersChange.bind(this);
    this.handleMedicadeFeeChange = this.handleMedicadeFeeChange.bind(this);
    this.calculatePovertyLevels = this.calculatePovertyLevels.bind(this);
    this.findLowestTier = this.findLowestTier.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleHouseholdMembersChange(event) {
    this.setState({householdMembers: event.target.value});
  }

  handleMedicadeFeeChange(event) {
    this.setState({medicadeFee: event.target.value});
  }

  calculatePovertyLevels(householdMembers) {
    const povertyLevel = 12140 + ((householdMembers - 1) * 4320);

    return [
      povertyLevel,
      povertyLevel * 1.25,
      povertyLevel * 1.5,
      povertyLevel * 1.75,
      povertyLevel * 2,
      povertyLevel * 2.5
    ]
  }

  handleHouseholdIncomeChange(event){
    this.setState({householdIncome: event.target.value});
  }

  findLowestTier() {
    const povertyLevels = this.calculatePovertyLevels(this.state.householdMembers);

    const highestTiers = [];

    povertyLevels.forEach((amount, index) => {
      if (this.state.householdIncome >= amount) {
        highestTiers.push(index);
      }
    })

    return highestTiers[highestTiers.length - 1] || 0;
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    const medicadeFee = this.state.medicadeFee;
    const scale = [
      {
        percentOfServiceCost: 0,
        hourlyServiceCharge: 5
      },
      {
        percentOfServiceCost: 20,
        hourlyServiceCharge: 0.2 * medicadeFee
      },
      {
        percentOfServiceCost: 40,
        hourlyServiceCharge: 0.4 * medicadeFee
      },
      {
        percentOfServiceCost: 60,
        hourlyServiceCharge: 0.6 * medicadeFee
      },
      {
        percentOfServiceCost: 80,
        hourlyServiceCharge: 0.8 * medicadeFee
      },
      {
        percentOfServiceCost: 100,
        hourlyServiceCharge: medicadeFee
      }
    ];

    return(
      <div>
        <form>
          <label>
            Household Members:
            <input
              className='form-control'
              name='householdMembers'
              type='number'
              value={this.state.householdMembers}
              onChange={this.handleHouseholdMembersChange}
            />
          </label>
          <br></br>
          <label>
            Household Income:
            <NumberFormat
              className='form-control'
              value={this.state.householdIncome}
              onChange={this.handleHouseholdIncomeChange}
            />
          </label>
          <br></br>
          <label>
            Medicade Fee:
            <NumberFormat
              className='form-control'
              value={this.state.medicadeFee}
              onChange={this.handleMedicadeFeeChange}
            />
          </label>
          <br></br>
        </form>
        <p>Total Service Cost:</p>
        <h3 id='service-cost'>{scale[this.findLowestTier()].percentOfServiceCost}%</h3>
        <p>Hourly Service Charge:</p>
        <h3 id='hourly-charge'>${scale[this.findLowestTier()].hourlyServiceCharge.toFixed(2)}</h3>
      </div>
    )
  }
}

export default Calculator;
