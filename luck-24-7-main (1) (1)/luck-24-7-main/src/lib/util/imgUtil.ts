export const getTeamLogo = (code: string) => {
  switch (code) {
    case 'DC':
      return require('../../../assets/images/teams/DC.gif');
    case 'RR':
      return require('../../../assets/images/teams/RR.gif');
    case 'CSK':
      return require('../../../assets/images/teams/CSK.gif');
    case 'SRH':
      return require('../../../assets/images/teams/SRH.gif');
    case 'PBKS':
      return require('../../../assets/images/teams/PBKS.gif');
    case 'LSG':
      return require('../../../assets/images/teams/LSG.gif');
    case 'GT':
      return require('../../../assets/images/teams/GT.gif');
    case 'KKR':
      return require('../../../assets/images/teams/KKR.gif');
    case 'MI':
      return require('../../../assets/images/teams/MI.gif');
    case 'RCB':
      return require('../../../assets/images/teams/RCB.gif');
    case 'PAK':
      return require('../../../assets/images/teams/PAK.png');
    case 'NED':
      return require('../../../assets/images/teams/NED.png');
    case 'BAN':
      return require('../../../assets/images/teams/BAN.png');
    case 'AFG':
      return require('../../../assets/images/teams/AFG.png');
    case 'SA':
    case 'SA-W':
      return require('../../../assets/images/teams/SA.png');
    case 'SL':
      return require('../../../assets/images/teams/SL.png');
    case 'IND':
      return require('../../../assets/images/teams/IND.png');
    case 'AUS':
    case 'AUS-W':
      return require('../../../assets/images/teams/AUS.png');
    case 'NZ':
    case 'NZ-W':
      return require('../../../assets/images/teams/NZ.png');
    case 'ENG':
      return require('../../../assets/images/teams/ENG.png');
    case 'WI':
    case 'WI-W':
      return require('../../../assets/images/teams/WI.png');
    default:
      return null;
  }
};
