import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      povertyLevels: [12140],
      householdMembers: 1,
      householdIncome: 0.00,
      medicadeFee: 92.99
    };

    this.handleHouseholdIncomeChange = this.handleHouseholdIncomeChange.bind(this);
    this.handleHouseholdMembersChange = this.handleHouseholdMembersChange.bind(this);
    this.calculatePovertyLevel = this.calculatePovertyLevel.bind(this);
    this.findLowestTier = this.findLowestTier.bind(this);
  }

  handleHouseholdMembersChange(event) {
    const householdMembers = event.target.value;

    this.setState({householdMembers});

    this.calculatePovertyLevel(householdMembers);
  }

  calculatePovertyLevel(householdMembers) {
    const povertyLevel = 12140 + ((householdMembers - 1) * 4320);

    this.setState({
      povertyLevels: [
        povertyLevel,
        povertyLevel * 1.25,
        povertyLevel * 1.5,
        povertyLevel * 1.75,
        povertyLevel * 2,
        povertyLevel * 2.5
      ]
    });
  }

  handleHouseholdIncomeChange(event){
    console.log(event.target.value)
    this.setState({householdIncome: event.target.value});
  }

  findLowestTier() {
    const povertyLevels = this.state.povertyLevels;

    let highestTiers = [];
    console.log(this.state.householdIncome)
    povertyLevels.forEach((amount, index) => {
      if (this.state.householdIncome > amount) {
        highestTiers.push(index);
        console.log(highestTiers);
      }
    })
    console.log(highestTiers[highestTiers.length - 1])
    return highestTiers[highestTiers.length - 1] || 0;
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
              onChange={this.handleInputChange}
            />
          </label>
          <br></br>
        </form>
        <p>% of Total Service Cost:</p>
        <h3>{scale[this.findLowestTier()].percentOfServiceCost}</h3>
        <p>Hourly Service Charge:</p>
        <h3>{scale[this.findLowestTier()].hourlyServiceCharge}</h3>
      </div>
    )
  }
}

export default Calculator;
