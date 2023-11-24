import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { TeamCardProps } from '../components/HomeScreen/TeamCard';
import Keys from '../values/keys/Keys';
import { PlayerBasicDetails } from './content/liveMatch';
import { PointsType } from './content/points';

type GetleaderbaordrankParams = {
  teams: ReposneMatch[];
  match_key: string;
  name: string;
  entryFee: number;
};

type GetleaderbaordrankReturn = {
  mobileNumber: number;
  DATA: ReposneMatch & {
    score: number;
    rank: number;
  };
};

type ParsedBotType = {
  mobileNumber: string;
  DATA: {
    caption: PlayerBasicDetails;
    viceCaption: PlayerBasicDetails;
    players: PointsType['players'];
    score: number;
  };
  rank: number;
};

type BotType = {
  name: string;
  players: string[];
};

const project_key = Keys.projectKey;
export const useGetLeaderbaordrank = ({
  match_key,
  name,
}: GetleaderbaordrankParams): {
  leaderboard: GetleaderbaordrankReturn[];
  event: 'loading' | { type: 'error'; error: string } | null;
} => {
  const [pointsData, setPointsData] = useState<PointsType | null>(null);
  const [botList, setBotList] = useState<BotType[]>([]);

  const [teamsData, setTeamsData] = useState<
    | {
        mobileNumber: number;
        DATA: ReposneMatch;
      }[]
    | null
  >(null);

  const [eventType, setEventType] = useState<
    'loading' | { type: 'error'; error: string } | null
  >(null);

  const getToken = async () => {
    setEventType('loading');
    await AsyncStorage.getItem('token').then(token => {
      // console.log(token);
      if (token) {
        getAllData(token);
        getTeamsData();
      }
    });
  };

  const getAllData = async (token: string) => {
    const urls = [
      `https://api.sports.roanuz.com/v5/cricket/${project_key}/fantasy-match-points/${match_key}/`,
      `https://luck-24-7-rn-production.up.railway.app/best?teams=700&match_id=${match_key}`,
    ];

    const requests = urls.map(url =>
      axios.get(url, {
        headers: {
          'rs-token': token,
        },
      }),
    );

    axios
      .all(requests)
      .then(responses => {
        responses.forEach((resp, i) => {
          if (i === 0) setPointsData(resp.data.data);
          if (i === 1) setBotList(resp.data);
          setEventType(null);
        });
      })
      .catch((e: AxiosError) => {
        setEventType({ type: 'error', error: e.message });
      });
  };

  const getTeamsData = async () => {
    await AsyncStorage.getItem('mobileNumber').then(res => {
      firestore()
        .collection('Users')
        .doc(`${res}`)
        .collection('myContests')
        .doc(match_key)
        .collection('pool')
        .doc(`${name}`)
        .get()
        .then(res => {
          const data = res.data();
          // data undefined
          firestore()
            .collection('pools')
            .doc(`${data.poolName}`)
            .collection('matchName')
            .doc(`${data.match_key}`)
            .collection('entryFee')
            .doc(`${data.entryFee}`)
            .collection('pool')
            .doc(`${data.poolId}`)
            .get()
            .then(res => {
              const data = res.data();
              // console.log('data', data);
              setTeamsData(data.user);
            });
        });
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!teamsData || !pointsData || !botList)
    return {
      leaderboard: [],
      event: eventType,
    };

  const parseBot = (botList: BotType[]): ParsedBotType[] => {
    return botList
      .map(bot => {
        let players = bot.players.map(player => {
          return pointsData?.players[player];
        });
        const caption = players[0];
        const viceCaption = players[1];

        players = players.map(player => {
          // total score of every player
          let playerScore =
            pointsData.points.find(p => p.player_key === player.key)?.points ||
            0;

          // modifire for caption and vice caption
          if (player.key === caption.key) {
            playerScore = playerScore * 2;
          }
          if (player.key === viceCaption.key) {
            playerScore = playerScore * 1.5;
          }
          // return data of player
          return {
            ...player,
            score: playerScore,
          };
        });

        // calulating score every
        const teamScore = players.reduce((acc, curr) => {
          return acc + curr.score;
        }, 0);

        // return with score
        return {
          mobileNumber: bot.name,
          DATA: {
            players,
            caption,
            viceCaption,
            match_key,
            score: teamScore,
          },
          rank: -1,
        };
      })
      .sort((a, b) => b.DATA.score - a.DATA.score)
      .map((team, i) => {
        return {
          ...team,
          rank: i + 1,
        };
      });
  };

  // console.log(parseBot(botList));

  const rankedTeam: GetleaderbaordrankReturn[] = [
    ...parseBot(botList),
    ...teamsData
      // maping over every team
      .map(team => {
        const players = team.DATA.players.map(player => {
          // total score of every player
          let playerScore =
            pointsData.points.find(p => p.player_key === player.key)?.points ||
            0;

          // modifire for caption and vice caption
          if (player.key === team.DATA.caption.key) {
            playerScore = playerScore * 2;
          }
          if (player.key === team.DATA.viceCaption.key) {
            playerScore = playerScore * 1.5;
          }
          // return data of player
          return {
            ...player,
            score: playerScore,
          };
        });

        // calulating score every
        const teamScore = players.reduce((acc, curr) => {
          return acc + curr.score;
        }, 0);

        // return with rank of default 0
        return {
          ...team,
          DATA: {
            ...team.DATA,
            players,
            score: teamScore,
          },
          rank: 0,
        };
      }),
  ]
    // soriting accoring to scre
    .sort((a, b) => b.DATA.score - a.DATA.score)
    // calulating thr rank of every team
    .map((team, i) => {
      return {
        ...team,
        rank: i + 1,
      };
    });

  return {
    leaderboard: rankedTeam,
    event: eventType,
  };
};

type ReposneMatch = Omit<TeamCardProps, 'start_at'> & {
  createdOn: string;
};
