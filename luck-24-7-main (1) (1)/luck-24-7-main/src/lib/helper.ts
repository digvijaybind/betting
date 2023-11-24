export const getTeamTitle = (teamA: string, teamB: string) => {
  return `${getIPLTeamName(teamA)} vs ${getIPLTeamName(teamB)}`;
};

const getIPLTeamName = (name: string) => {
  switch (name) {
    case 'DC':
      return 'Delhi';
    case 'CSK':
      return 'Chennai';
    case 'GT':
      return 'Gujarat';
    case 'RCB':
      return 'Bangalore';
    case 'RR':
      return 'Rajasthan';
    case 'KKR':
      return 'Kolkata';
    case 'MI':
      return 'Mumbai';
    case 'PBKS':
      return 'Punjab';
    case 'SRH':
      return 'Hyderabad';
    case 'LSG':
      return 'Lucknow';
    default:
      return name;
  }
};
