import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      householdMembers: 1,
      householdIncome: 0
    };

    this.handleHouseholdIncomeChange = this.handleHouseholdIncomeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleHouseholdIncomeChange(event, maskedvalue, floatvalue){
    this.setState({householdIncome: maskedvalue});
  }

  render() {
    return(
      <form>
        <label>
          Household Members:
          <input
            name="householdMembers"
            type="number"
            value={this.state.householdMembers}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Household Income:
          <CurrencyInput
            name="householdIncome"
            value={this.state.householdIncome}
            prefix='$'
            onChangeEvent={this.handleHouseholdIncomeChange}
          />
        </label>
        <input type='submit' value='Calculate' />
      </form>
    )
  }
}

export default Calculator;
