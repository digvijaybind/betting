import { AntDesign, Entypo } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootParamList, ToastContext } from '../../../App';
import {
  PlayerBasicDetails,
  PlayerDetails,
  PlayerType,
} from '../../lib/content/liveMatch';

import axios, { AxiosError } from 'axios';
import { Image } from 'react-native';
import PlayerImage from '../../components/PlayerImage';
import TeamLogo from '../../components/TeamLogo';
import { CreditType } from '../../lib/content/credit';
import Keys from '../../values/keys/Keys';
var project_key = Keys.projectKey;

export type SelectPlayerType = PlayerBasicDetails & {
  credit: number;
};

const getPlayers = (
  players: {
    [key: string]: PlayerBasicDetails;
  },
  type: PlayerType,
) => {
  return Object.entries(players)
    .map(([_, value]) => {
      return value;
    })
    .filter(player => player.seasonal_role === type);
};

type Props = NativeStackScreenProps<RootParamList, 'CreateTeamScreen'>;

const CreateTeamScreen = ({
  navigation: { navigate, goBack },
  route,
}: Props) => {
  const {
    match_key,
    teamA,
    teamB,
    type,
    start_at,
    players,
    caption,
    viceCaption,
    id,
    prizePool,
    entryFee,
    totalSpots,
    spotsLeft,
    name,
  } = route.params;

  const [selectedPlayer, setSelectedPlayer] = useState<SelectPlayerType[]>(
    players || [],
  );

  const [selectedTab, setSelectedTab] = useState<PlayerType>('keeper');

  const [dataFetched, setDataFetched] = useState<CreditType>();
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState();
  const [hasError, setHasError] = useState(null);

  const { setVisible } = useContext(ToastContext);

  const getToken = useCallback(async () => {
    await AsyncStorage.getItem('token').then(token => {
      if (token) getAllData(token);
    });
  }, []);

  const getAllData = async (token: string) => {
    let urls = [
      `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${match_key}/`,
      `https://api.sports.roanuz.com/v5/cricket/${project_key}/fantasy-match-credits/${match_key}/`,
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
          if (i === 0) {
            setLiveData(resp.data.data);
          }
          if (i === 1) {
            setDataFetched(resp.data.data);
          }
        });
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setHasError(err.message);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const addPlayer = (player: SelectPlayerType) => {
    if (
      selectedPlayer
        .map(p => p.team_key)
        .filter(p => p === teamA.toLowerCase() && player.team_key === p)
        .length >= 7 ||
      selectedPlayer
        .map(p => p.team_key)
        .filter(p => p === teamB.toLowerCase() && player.team_key === p)
        .length >= 7
    ) {
      setVisible('You can select only 7 players from a team');
      return;
    }

    if (selectedPlayer.length >= 11) {
      setVisible('You can select only 11 players');
      return;
    }
    if (
      selectedPlayer.reduce((acc, curr) => acc + curr.credit, 0) +
      player.credit >
      100
    ) {
      setVisible('Credit is out of Limit');
      return;
    }
    setSelectedPlayer(prev => [...prev, player]);
  };

  const removePlayer = (playerKey: string) => {
    setSelectedPlayer(prev => prev.filter(p => p.key !== playerKey));
  };

  if (hasError) {
    return (
      <View className="h-full flex-1">
        <View className="bg-[#FC2B2D] py-3">
          <View className="mx-auto flex-row items-center w-11/12 ">
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <View className="flex-row flex-1 justify-center items-center">
              <Text className="text-white text-lg font-poppins600">
                {type === 'edit' ? 'Edit Team' : 'Create Team'}
              </Text>
            </View>
            <Button
              className="text-right font-poppins700 bg-white text-[#FC2B2D] rounded-md px-2 py-0"
              onPress={() => {
                getToken();
              }}>
              <Text>Retry</Text>
            </Button>
          </View>
        </View>
        <Text className="text-black">Something went wrong</Text>

        <Text className="text-black">{match_key}</Text>
      </View>
    );
  }

  if (loading || !dataFetched || !liveData) {
    return (
      <SafeAreaView className="h-full">
        <View className="bg-[#FC2B2D] py-3">
          <View className="mx-auto flex-row items-center w-11/12 ">
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <View className="flex-row flex-1 justify-center items-center">
              <Text className="text-white text-lg font-poppins600">
                {type === 'edit' ? 'Edit Team' : 'Create Team'}
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-center flex-1 items-center">
          <Image
            source={require('../../../assets/images/logo.png')}
            className="mx-auto opacity-25 mb-2"
            style={{
              width: 100,
              height: 100 * (162 / 312),
            }}
          />
          <ActivityIndicator size="small" color="#FC2B2D" />
        </View>
      </SafeAreaView>
    );
  }

  const verifyTeam = () => {
    if (selectedPlayer.length !== 11) {
      setVisible('You have to select 11 players');
      return;
    }
    if (selectedPlayer.filter(p => p.seasonal_role === 'batsman').length < 3) {
      setVisible('You have to select atleast 3 Batsman');
      return;
    }
    if (selectedPlayer.filter(p => p.seasonal_role === 'bowler').length < 2) {
      setVisible('You have to select atleast 2 Bowlers');
      return;
    }
    if (
      selectedPlayer.filter(p => p.seasonal_role === 'all_rounder').length < 1
    ) {
      setVisible('You have to select atleast 1 All Rounder');
      return;
    }
    if (selectedPlayer.filter(p => p.seasonal_role === 'keeper').length < 1) {
      setVisible('You have to select atleast 1 wicket Keeper');
      return;
    }
    console.log(caption?.name);
    if (type === 'edit') {
      navigate('VCaptionScreen', {
        selectedPlayer,
        match_key,
        dataFetched,
        teamA,
        teamB,
        start_at,
        type,
        caption,
        viceCaption,
        id,
      });
    } else
      navigate('VCaptionScreen', {
        selectedPlayer,
        match_key,
        dataFetched,
        teamA,
        teamB,
        start_at,
        entryFee,
        totalSpots,
        spotsLeft,
        name,
      });
  };
  return (
    <SafeAreaView
      style={{
        height: '100%',
      }}>
      {/* Navbar */}
      <View className="bg-[#FC2B2D] py-3">
        <View className="mx-auto flex-row items-center w-11/12 ">
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <Text className="text-white text-lg font-poppins600">
              {type === 'edit' ? 'Edit Team' : 'Create Team'}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-white mt-2 font-poppins600 text-center text-sm">
            You can select only 7 playes from one team
          </Text>
        </View>
        <View className="flex-row mt-3 items-center w-11/12 mx-auto justify-between">
          <View>
            <Text className="font-poppins600 text-sm text-white">PLayers</Text>
            <Text className="font-poppins700 text-white text-lg">
              {selectedPlayer.length}
              /11
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="flex-row-reverse items-center">
              <TeamLogo
                size="md"
                name={Object.entries(dataFetched.teams)[0][1]['code']}
              />
              <Text className="text-center pr-1 text-white font-poppins700">
                {
                  selectedPlayer
                    .map(p => p.team_key)
                    .filter(
                      p =>
                        p ===
                        Object.entries(dataFetched.teams)[0][1][
                          'key'
                        ].toLowerCase(),
                    ).length
                }
              </Text>
            </View>
            <Text className="text-center mx-2 text-lg text-white  font-poppins700">
              VS
            </Text>
            <View className="flex-row items-center">
              <TeamLogo
                size="md"
                name={Object.entries(dataFetched.teams)[1][1]['code']}
              />
              <Text className="text-center pl-1 text-white font-poppins700">
                {
                  selectedPlayer
                    .map(p => p.team_key)
                    .filter(
                      p =>
                        p ===
                        Object.entries(dataFetched.teams)[1][1][
                          'key'
                        ].toLowerCase(),
                    ).length
                }
              </Text>
            </View>
          </View>
          <View>
            <Text className="text-right font-poppins700 bg-white text-[#FC2B2D] rounded-md px-2 py-1">
              {selectedPlayer.reduce((acc, curr) => acc + curr.credit, 0)}/100
            </Text>
          </View>
        </View>
      </View>

      <View
        className={clsx(
          'rounded-lg h-4 relative w-11/12 mx-auto mt-2 bg-slate-300',
        )}>
        <View
          className="bg-green-600 transition-all duration-150 h-full rounded-lg absolute z-10 top-0 left-0"
          style={{
            width: Math.round((selectedPlayer.length / 11) * 100) + '%',
          }}>
          <Text className="text-white text-xs text-right pr-2">
            {selectedPlayer.length}
          </Text>
        </View>
      </View>

      {/* Contest and My teams tab */}
      <View className="justify-center py-2 items-center">
        <View className="w-full flex-row items-center justify-center gap-4">
          {tabsList.map(tabItem => (
            <TouchableOpacity
              key={tabItem.tab}
              disabled={selectedTab === tabItem.tab}
              onPress={() => setSelectedTab(tabItem.tab)}
              className={clsx(
                'px-3 py-2 rounded-md',
                selectedTab === tabItem.tab ? 'bg-[#FC2B2D]' : 'bg-slate-300',
              )}>
              <Text
                className={clsx(
                  'font-poppins500 h-4 text-xs',
                  selectedTab === tabItem.tab ? 'text-white' : 'text-black',
                )}>
                {tabItem.name}(
                {
                  selectedPlayer.filter(p => p.seasonal_role === tabItem.tab)
                    .length
                }
                )
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedTab === 'batsman' && (
        <TabScreenDefault
          dataFetched={dataFetched}
          playing11={[
            ...liveData.squad.a.playing_xi,
            ...liveData.squad.a.playing_xi,
          ]}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          selectedPlayer={selectedPlayer.filter(
            p => p.seasonal_role === 'batsman',
          )}
          tabType="batsman"
          title="Select Batsman (Min 3)"
        />
      )}

      {selectedTab === 'bowler' && (
        <TabScreenDefault
          dataFetched={dataFetched}
          playing11={[
            ...liveData.squad.a.playing_xi,
            ...liveData.squad.a.playing_xi,
          ]}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          selectedPlayer={selectedPlayer.filter(
            p => p.seasonal_role === 'bowler',
          )}
          tabType="bowler"
          title="Select Bowler (Min 2)"
        />
      )}

      {selectedTab === 'keeper' && (
        <TabScreenDefault
          dataFetched={dataFetched}
          playing11={[
            ...liveData.squad.a.playing_xi,
            ...liveData.squad.a.playing_xi,
          ]}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          selectedPlayer={selectedPlayer.filter(
            p => p.seasonal_role === 'keeper',
          )}
          tabType="keeper"
          title="Select Keeper (Min 1)"
        />
      )}

      {selectedTab === 'all_rounder' && (
        <TabScreenDefault
          dataFetched={dataFetched}
          playing11={[
            ...liveData.squad.a.playing_xi,
            ...liveData.squad.a.playing_xi,
          ]}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
          selectedPlayer={selectedPlayer.filter(
            p => p.seasonal_role === 'all_rounder',
          )}
          tabType="all_rounder"
          title="Select All Rounder (Min 1)"
        />
      )}

      <BlurView
        intensity={100}
        tint="light"
        className="absolute w-full bottom-0">
        <View className="w-11/12 mx-auto flex-row justify-center py-2 space-x-2 items-center">
          <Button
            mode="outlined"
            onPress={() =>
              navigate('TeamPreview', {
                selectedPlayer,
              })
            }
            className="bg-[#1D3A4B] py-1 w-1/2 rounded-md">
            <Text className="text-center text-md font-poppins700 text-white">
              Team Preview
            </Text>
          </Button>
          {selectedPlayer.length === 11 && (
            <Button
              onPress={verifyTeam}
              className="bg-[#1D3A4B] py-1 w-1/2 rounded-md">
              <Text className="text-center text-md font-poppins700 text-white">
                Continue
              </Text>
            </Button>
          )}
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

export default CreateTeamScreen;

type TabScreenDefaultProps = {
  addPlayer: (player: SelectPlayerType) => void;
  removePlayer: (playerKey: string) => void;
  selectedPlayer: SelectPlayerType[];
  tabType: PlayerType;
  title: string;
  dataFetched: CreditType;
  playing11: string[];
};

const TabScreenDefault = ({
  addPlayer,
  removePlayer,
  selectedPlayer,
  tabType,
  dataFetched,
  title,
  playing11,
}: TabScreenDefaultProps) => {
  return (
    <View className="flex-1">
      <View className="justify-center py-1 border-b border-slate-200 bg-white px-4 flex-row">
        <Text className="text-gray-600 text-xs font-poppins500">{title}</Text>
      </View>
      <View className="border-b border-slate-200 py-1 bg-white px-4 flex-row">
        <Text className="text-gray-600 text-xs font-poppins500">Player</Text>
        <Text className="text-gray-600 text-xs font-poppins500 ml-auto">
          Points
        </Text>
        <Text className="text-gray-600 text-xs font-poppins500 pl-5 pr-6">
          Credit
        </Text>
      </View>
      <View>
        <FlatList
          data={getPlayers(dataFetched.players, tabType).sort((a, b) => {
              const pointsA = dataFetched.credits.filter(
                credPlayer => credPlayer.player_key === a.key,
              )[0].tournament_points;

              const pointsB = dataFetched.credits.filter(
                credPlayer => credPlayer.player_key === b.key,
              )[0].tournament_points;

              return pointsB - pointsA;
            })}
          ListFooterComponent={
            <View style={{ width: '100%', marginBottom: 120 }} />
          }
          renderItem={({ item: player }) => {
            const points = dataFetched.credits.filter(credPlayer => credPlayer.player_key === player.key)[0].tournament_points;
            const credit = dataFetched.credits.filter(credPlayer => credPlayer.player_key === player.key,)[0].value;
            const isSelected = selectedPlayer.some(p => p.key === player.key);
            const team = Object.entries(dataFetched.teams).map(([_, value]) => value).filter(team => team.key === player.team_key)[0].name;
            const isPlaying =playing11.length !== 0? playing11.some(p11 => p11 === player.key)? 'playing': 'not-playing': null;
            return (
              <PlayerListItem
                key={player.key}
                team={team}
                addPlayer={addPlayer}
                removePlayer={removePlayer}
                isSelected={isSelected}
                player={player}
                credit={credit}
                points={points}
                isPlaying={isPlaying}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

type PlayerListItemProps = {
  player: PlayerDetails['player'];
  points: number;
  credit: number;
  team: string;
  isSelected: boolean;
  addPlayer: (player: SelectPlayerType) => void;
  removePlayer: (playerKey: string) => void;
  isPlaying: 'playing' | 'not-playing' | null;
};

const PlayerListItem = ({
  player,
  credit,
  points,
  addPlayer,
  team,
  isSelected,
  removePlayer,
  isPlaying,
}: PlayerListItemProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        'flex-row border-b border-slate-200 bg-white py-4 px-3 items-center',
        isSelected ? 'bg-[#00ff0010] border-[#00ff0010]' : '',
      )}
      onPress={() =>
        isSelected ? removePlayer(player.key) : addPlayer({ ...player, credit })
      }>
      <View className="justify-between items-center flex-row">
        <PlayerImage imageName={player.key} />
        <View>
          <Text className="font-poppins600 h-5 text-md text-black">
            {player.name}
          </Text>
          <Text className="font-poppins600 text-[10px] h-4 text-slate-700">
            {team}
          </Text>
          <Text
            className={clsx(
              'font-poppins600 text-[10px] h-4 text-slate-700',
              isPlaying === 'playing' && 'text-green-500',
              isPlaying === 'not-playing' && 'text-red-500',
            )}>
            {isPlaying}
          </Text>
        </View>
      </View>
      <Text className="font-poppins600 text-black text-right text-xs ml-auto mr-5 min-w-[32px]">
        {points}
      </Text>
      <Text className="font-poppins600 text-black text-right mr-2 text-xs min-w-[32px]">
        {credit}
      </Text>
      <View className="px-2">
        {isSelected ? (
          <AntDesign name="checkcircleo" size={17} color="green" />
        ) : (
          <Entypo name="circle" size={17} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const tabsList: {
  name: string;
  tab: PlayerType;
}[] = [
    {
      name: 'W/K',
      tab: 'keeper',
    },
    {
      name: 'BAT',
      tab: 'batsman',
    },
    {
      name: 'AR',
      tab: 'all_rounder',
    },
    {
      name: 'BOL',
      tab: 'bowler',
    },
  ];
