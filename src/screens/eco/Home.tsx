import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
//
import {Post, Get} from '../../api';
import api from '../../config/api';
import appConfig from '../../config/config';
import {setItem, getItem, Colors} from '../../utils';
import {
  AppModal,
  AppText,
  ErrorMessage,
  Loading,
  PageWrapper,
} from '../../compoents';
import {useAuthContext} from '../../context';
//
interface Constituency {
  label: string;
  value: object;
}
interface Candidate {
  _id: string;
  candidate: string;
  party_id: string;
  party_name: string;
  constituency_id: string;
  constituency_name: string;
  vote_count: Number;
  __v: Number;
}
interface User {
  usr_id: string;
  user_type: string;
  uvc: string;
  user_name: string;
}
interface postResponse {
  status: string;
  data: object;
  message: string;
}
interface electionStatus {
  election_status: string;
}
//
interface ElectionResult {
  status: string;
  winner: string;
  seats: {party: string; seat: string}[];
}
// const candidates = [
//   {id: 1, name: 'Candidate A'},
//   {id: 2, name: 'Candidate B'},
// ];
//voter dashboard
const HomeScreen = () => {
  const {signOut} = useAuthContext();
  const [user, setUser] = useState<User>({} as User);
  const [constituency, setConstituency] = useState<Constituency[]>(
    [] as Constituency[],
  );
  const [electionStatus, setElectionStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [showConstituencyDetails, setConstituencyDetails] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([] as Candidate[]);
  const [error, setError] = useState<string>('');
  const [electionResult, setElectionResult] = useState<ElectionResult>({
    status: '',
    winner: '',
    seats: [],
  });
  //

  //useEffect
  useEffect(() => {
    loadUser();
    getElectionStatus();
  }, []);
  //load
  const loadUser = async () => {
    try {
      setLoading(true);
      const user = await getItem('usr');
      if (user) {
        loadConstituency();
      }
      setUser(user);
    } catch (err) {
      console.log('err', err);
    }
  };
  //get Election Status
  const getElectionStatus = async () => {
    try {
      const resp = await Get(
        `${api.SERVER_TEST}/gevs/settings/get-status?settingsId=${appConfig.settingsId}`,
      );
      console.log('election status:::::', resp.data);
      if (resp.status == 'error') {
        setError(resp?.message as string);
      }
      const status = resp.data as string;
      setElectionStatus(status);
    } catch (err) {
      console.log('err', err);
    }
  };
  //load Constituency
  const loadConstituency = async () => {
    try {
      setLoading(true);
      const resp = await Get(`${api.SERVER_TEST}/gevs/constituency/all`);
      console.log('resp:::::', resp);
      const data = resp.data as Constituency[];
      setConstituency(data || []);
      setLoading(false);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  //
  const handleConstitencyPress = (cons_name: string) => {
    setConstituencyDetails(true);
    loadConstituencyResults(cons_name);
  };
  //load Constituency Results
  const loadConstituencyResults = async (cons_name: string) => {
    try {
      console.log('cons_name', cons_name);
      setLoading(true);
      const resp = await Get(
        `${api.SERVER_TEST}/gevs/constituency/${cons_name}`,
      );
      console.log('resp:::::', resp.data);
      const data = resp.data as Candidate[];
      // console.log('datadatadatadatadata:::::', data);

      setCandidates(data || []);
      setLoading(false);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  //load Constituency Results
  const handleElection = () => {
    Alert.alert(
      'Confirmation',
      `Do you want to ${
        electionStatus == 'not-started' || electionStatus == 'finished'
          ? 'Start'
          : 'Stop'
      } the election?`,
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            changeElectionStatus();
          },
        },
      ],
      {cancelable: false},
    );
  };
  //change Election Status
  const changeElectionStatus = async () => {
    try {
      // setLoading(true);
      const resp = await Post(
        `${api.SERVER_TEST}/gevs/settings/update-status`,
        {
          settingsId: 'Shangri-La-Election',
          status:
            electionStatus == 'not-started' || electionStatus == 'finished'
              ? 'ongoing'
              : electionStatus == 'ongoing'
              ? 'finished'
              : 'not-started',
        },
      );
      console.log('resp:::::', resp.data);
      if (resp.status == 'success') {
        const data = resp.data as electionStatus;
        // console.log('datadatadatadatadata:::::', data);
        setElectionStatus(data?.election_status);
      }
      // setLoading(false);
    } catch (err) {
      console.log('err', err);
    }
  };
  //
  const handleLogout = async () => {
    Alert.alert(
      'Confirmation',
      'Do you want to logout?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            signOut();
          },
        },
      ],
      {cancelable: false},
    );
  };
  //load Constituency Results
  const handleShowResults = async () => {
    try {
      setShowResults(true);
      setLoading(true);
      const resp = await Get(`${api.SERVER_TEST}/gevs/results`);
      console.log('resp:::::', resp);
      if (resp.status == 'success') {
        const data = resp.data as ElectionResult;
        setElectionResult(data);
      }
      setLoading(false);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  // show loading
  if (loading) {
    return <Loading />;
  }
  //render
  return (
    <PageWrapper style={styles.container}>
      {error !== '' && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <ErrorMessage message={error} />
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'green',
              margin: 10,
              borderRadius: 10,
            }}
            onPress={() => setError('')}>
            <AppText title="Hide" />
          </TouchableOpacity>
        </View>
      )}
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <AppText
          style={{flex: 1, paddingTop: 6}}
          title={`Welcome, ${user?.user_name || ''}`}
        />
        <View style={{justifyContent: 'flex-end', marginRight: 10}}>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require('../../assets/img/logout.png')}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{margin: 20}}>
        <AppText style={styles.title} title="Election Status" />
        <AppText
          style={{
            marginTop: 5,
            fontFamily: 'bold',
            fontSize: 16,
            color:
              electionStatus == 'not-started' || electionStatus == 'finished'
                ? '#F66B0E'
                : electionStatus == 'ongoing'
                ? '#5B8A72'
                : Colors.text_color,
          }}
          title={
            electionStatus == 'not-started' || electionStatus == 'finished'
              ? "It's not started yet, Do you want to start the election?"
              : electionStatus == 'ongoing'
              ? 'Election is ongoing now, Do you want to stop the election.'
              : ''
          }
        />
        <TouchableOpacity
          style={{
            backgroundColor:
              electionStatus == 'not-started' || electionStatus == 'finished'
                ? '#4caf50'
                : '#F66B0E',
            padding: 10,
            margin: 20,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => handleElection()}>
          <AppText
            style={{color: '#000000'}}
            title={
              electionStatus == 'not-started' || electionStatus == 'finished'
                ? 'Start'
                : 'Stop'
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 20}}>
        <AppText style={styles.title} title="All Constituency" />
      </View>
      <ScrollView style={{flex: 1, margin: 20}}>
        {constituency.map(consti => (
          <TouchableOpacity
            key={consti.label}
            style={[styles.candidateButton]}
            onPress={() => {
              handleConstitencyPress(consti.label);
            }}>
            <AppText style={{color: '#000000'}} title={consti.label} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleShowResults} style={styles.submitButton}>
        <AppText title={'Show Results'} style={{fontWeight: 'bold'}} />
      </TouchableOpacity>
      {showConstituencyDetails && (
        <AppModal
          closeModal={() => setConstituencyDetails(false)}
          hideClose={false}
          style={{backgroundColor: '#EFF4FA'}}>
          <View style={{flex: 1, marginVertical: 16}}>
            {/* <Loading /> */}
            <ScrollView style={{flex: 1, margin: 20}}>
              {candidates.length > 0 ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#4caf50',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        padding: 2,
                        margin: 5,
                      }}>
                      <AppText title={'Name'} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        padding: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AppText title={'Votes'} style={{}} />
                    </View>
                  </View>
                  {candidates.map(candidate => (
                    <View key={candidate._id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 2,
                          margin: 5,
                        }}>
                        <View
                          style={{
                            flex: 1,
                          }}>
                          <AppText
                            title={candidate.candidate}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <AppText
                            title={candidate.vote_count.toString()}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{backgroundColor: '#7D808B', height: 1}}></View>
                    </View>
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AppText title={'No Candidates Found.'} />
                </View>
              )}
            </ScrollView>
          </View>
        </AppModal>
      )}
      {showResults && (
        <AppModal
          closeModal={() => setShowResults(false)}
          hideClose={false}
          style={{backgroundColor: '#EFF4FA'}}>
          <View style={{flex: 1, marginVertical: 16}}>
            {/* <Loading /> */}
            <ScrollView style={{flex: 1, margin: 20}}>
              {electionResult?.seats.length > 0 ? (
                <View>
                  <View>
                    <AppText title={'Election Status:'} />
                    <AppText title={electionResult.status} />
                  </View>
                  <View>
                    <AppText title={'Election Winner:'} />
                    <AppText title={electionResult.winner} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#4caf50',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        padding: 2,
                        margin: 5,
                      }}>
                      <AppText title={'Party'} />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        padding: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AppText title={'Seats'} style={{}} />
                    </View>
                  </View>
                  {electionResult?.seats.map(res => (
                    <View key={res.party}>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 2,
                          margin: 5,
                        }}>
                        <View
                          style={{
                            flex: 1,
                          }}>
                          <AppText
                            title={res.party}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <AppText
                            title={res.seat}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{backgroundColor: '#7D808B', height: 1}}></View>
                    </View>
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AppText title={'No Candidates Found.'} />
                </View>
              )}
            </ScrollView>
          </View>
        </AppModal>
      )}
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.text_color,
  },
  candidateButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  selectedCandidate: {
    backgroundColor: '#b3e0ff', // You can use a different color for the selected candidate
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  voteSubmittedText: {
    marginTop: 20,
    fontSize: 18,
    color: '#4caf50',
  },
  submitText: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: '#5B8A72',
  },
});

export default HomeScreen;
