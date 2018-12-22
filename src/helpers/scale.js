function scale(medicadeFee) {
  return [
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
}

export default scale;
