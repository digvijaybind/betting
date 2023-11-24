import { BasicPoolType } from '../components/PoolsScreen/PoolCard';
// import avatar from './avatar.jpg';
// export const sampleWihImage = [
//   {
//     image: avatar,
//     message: 'Roman Joined the Team!',
//     desc: 'Congratulate him',
//     time: '9:08 AM',
//   }
// ];
// export const sampleData = [
//   {
//     headerText: 'Image',
//     template: gridOrderImage,
//     textAlign: 'Center',
//     width: '120',
//   },
//   {
//     field: 'OrderItems',
//     headerText: 'Item',
//     width: '150',
//     editType: 'dropdownedit',
//     textAlign: 'Center',
//   },
// ];
// listOfAllPools start
const vsMatchs: {
  [key: string]: [number, number][];
} = {
  1: [
    [100, 165],
    [200, 330],
    [500, 825],
    [1000, 1650],
    [2000, 3300],
    // [5000, 8500],
    // [10000, 17000],
  ],
  2: [
    [100, 250],
    [200, 500],
    [500, 1200],
    [1000, 2500],
    [2000, 5000],
    // [5000, 12500],
    // [10000, 25000],
  ],
  3: [
    [100, 300],
    [200, 600],
    [500, 1500],
    [1000, 3000],
    [2000, 6000],
    // [5000, 15000],
    // [10000, 30000],
  ],
};

const creatObjectForMatches = (
  indexStart: number,
  name: string,
  spots: number,
  winning: [number, number][],
): CompletePoolType[] => {
  return winning.map((wins, i) => {
    return {
      id: `${indexStart + i}`,
      name: name,
      entryFee: wins[0],
      prizePool: wins[1],
      totalSpots: spots,
      spotsLeft: 0,
      leaderboard: [
        {
          id: 1,
          rankFrom: 1,
          rankTo: 1,
          prize: wins[1],
        },
      ],
    };
  });
};
type CompletePoolType = BasicPoolType;
export const listOfAllPools: CompletePoolType[] = [
  {
    id: '1',
    name: 'Mega',
    entryFee: 49,
    prizePool: 3_50_000,
    totalSpots: 10000,
    spotsLeft: 0,
    leaderboard: [
      {
        id: 1,
        rankFrom: 1,
        rankTo: 1,
        prize: 51000,
      },
      {
        id: 2,
        rankFrom: 2,
        rankTo: 2,
        prize: 5100,
      },
      {
        id: 3,
        rankFrom: 3,
        rankTo: 4, //+1
        prize: 1100,
      },
      {
        id: 4,
        rankFrom: 5,
        rankTo: 15, //+2
        prize: 500,
      },
      {
        id: 5,
        rankFrom: 16,
        rankTo: 36, // +20
        prize: 400,
      },
      {
        id: 6,
        rankFrom: 37,
        rankTo: 62, // +25
        prize: 300,
      },
      {
        id: 7,
        rankFrom: 63,
        rankTo: 93, // +35
        prize: 200,
      },
      {
        id: 8,
        rankFrom: 94,
        rankTo: 144, // +50
        prize: 100,
      },
      {
        id: 9,
        rankFrom: 145,
        rankTo: 245, // +100
        prize: 90,
      },
      {
        id: 10,
        rankFrom: 246,
        rankTo: 446, // +200
        prize: 80,
      },
      {
        id: 11,
        rankFrom: 447,
        rankTo: 747, // +300
        prize: 70,
      },
      {
        id: 12,
        rankFrom: 748,
        rankTo: 1148, // +400
        prize: 60,
      },
      {
        id: 13,
        rankFrom: 1149,
        rankTo: 2149, // +1000
        prize: 49,
      },
      {
        id: 14,
        rankFrom: 2150,
        rankTo: 10000, // +17935
        prize: 24,
      },
    ],
  },
  {
    id: '2',
    name: 'Premium',
    entryFee: 25,
    prizePool: 3_50_000,
    totalSpots: 20_000,
    spotsLeft: 0,
    leaderboard: [
      {
        id: 1,
        rankFrom: 1,
        rankTo: 1,
        prize: 31000,
      },
      {
        id: 2,
        rankFrom: 2,
        rankTo: 2,
        prize: 21000,
      },
      {
        id: 3,
        rankFrom: 3,
        rankTo: 4,
        prize: 2500,
      },
      {
        id: 4,
        rankFrom: 5,
        rankTo: 15, //+10
        prize: 250,
      },
      {
        id: 5,
        rankFrom: 16,
        rankTo: 36, // +20
        prize: 200,
      },
      {
        id: 6,
        rankFrom: 37,
        rankTo: 62, // +25
        prize: 100,
      },
      {
        id: 7,
        rankFrom: 63,
        rankTo: 93, // +35
        prize: 50,
      },
      {
        id: 8,
        rankFrom: 94,
        rankTo: 144, // +50
        prize: 45,
      },
      {
        id: 9,
        rankFrom: 145,
        rankTo: 245, // +100
        prize: 25,
      },
      {
        id: 10,
        rankFrom: 246,
        rankTo: 446, // +200
        prize: 35,
      },
      {
        id: 11,
        rankFrom: 447,
        rankTo: 747, // +300
        prize: 30,
      },
      {
        id: 12,
        rankFrom: 748,
        rankTo: 1148, // +400
        prize: 30,
      },
      {
        id: 13,
        rankFrom: 1149,
        rankTo: 2149, // +1000
        prize: 25,
      },
      {
        id: 14,
        rankFrom: 2150,
        rankTo: 20000, // +17935
        prize: 12,
      },
    ],
  },
  {
    id: '3',
    name: 'Chota Packet',
    entryFee: 12,
    prizePool: 2_10_000,
    totalSpots: 25000,
    spotsLeft: 0,
    leaderboard: [
      {
        id: 1,
        rankFrom: 1,
        rankTo: 1,
        prize: 11000,
      },
      {
        id: 2,
        rankFrom: 2,
        rankTo: 2,
        prize: 5000,
      },
      {
        id: 3,
        rankFrom: 3,
        rankTo: 4,
        prize: 1100,
      },
      {
        id: 4,
        rankFrom: 5,
        rankTo: 15,
        prize: 150,
      },
      {
        id: 5,
        rankFrom: 16,
        rankTo: 56,
        prize: 90,
      },
      {
        id: 6,
        rankFrom: 57,
        rankTo: 107,
        prize: 80,
      },
      {
        id: 7,
        rankFrom: 108,
        rankTo: 168,
        prize: 70,
      },
      {
        id: 8,
        rankFrom: 169,
        rankTo: 329,
        prize: 60,
      },
      {
        id: 9,
        rankFrom: 330,
        rankTo: 340,
        prize: 50,
      },
      {
        id: 10,
        rankFrom: 341,
        rankTo: 641,
        prize: 40,
      },
      {
        id: 11,
        rankFrom: 642,
        rankTo: 442,
        prize: 30,
      },
      {
        id: 12,
        rankFrom: 443,
        rankTo: 943,
        prize: 20,
      },
      {
        id: 13,
        rankFrom: 944,
        rankTo: 3944,
        prize: 10,
      },
      {
        id: 14,
        rankFrom: 3945,
        rankTo: 25000,
        prize: 5,
      },
    ],
  },
  ...creatObjectForMatches(4, '1v1', 2, vsMatchs[1]),
  ...creatObjectForMatches(4 + vsMatchs[1].length, '1v2', 3, vsMatchs[2]),
  ...creatObjectForMatches(
    4 + vsMatchs[1].length + vsMatchs[2].length,
    '1v3',
    3,
    vsMatchs[3],
  ),
];

// console.log("===>",JSON.stringify(listOfAllPools));
// listOfAllPools end


// How to fetch
// import { sampleData, sampleWihImage  } from "../data/dummy";