import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
//
import {Post, Get} from '../../api';
import api from '../../config/api';
import appConfig from '../../config/config';
import {setItem, getItem, Colors} from '../../utils';
import {AppModal, AppText, Loading, PageWrapper} from '../../compoents';
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
  const [candidates, setCandidates] = useState<Candidate[]>([] as Candidate[]);
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
      console.log('resp:::::', resp.data);
      const data = resp.data as Constituency[];
      setConstituency(data);
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
      console.log('datadatadatadatadata:::::', data);

      setCandidates(data);
      setLoading(false);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
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
  // show loading
  if (loading) {
    return <Loading />;
  }
  //render
  return (
    <PageWrapper style={styles.container}>
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
              electionStatus == 'not-started'
                ? '#F66B0E'
                : electionStatus == 'ongoing'
                ? '#5B8A72'
                : electionStatus == 'finished'
                ? '#CC381B'
                : Colors.text_color,
          }}
          title={
            electionStatus == 'not-started'
              ? "It's not started yet, So you won't be able to submit your vote at this moment."
              : electionStatus == 'ongoing'
              ? 'Election is ongoing now, So You Can cast your vote now.'
              : electionStatus == 'finished'
              ? 'The election has finished.'
              : ''
          }
        />
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
      {showConstituencyDetails && (
        <AppModal
          closeModal={() => setConstituencyDetails(false)}
          hideClose={false}
          style={{backgroundColor: '#EFF4FA'}}>
          <View style={{flex: 1, marginVertical: 16}}>
            {/* <Loading /> */}
            <ScrollView style={{flex: 1, margin: 20}}>
              {candidates.map(candidate => (
                <View key={candidate._id}>
                  <AppText title={candidate.candidate} />
                  <AppText title={candidate.vote_count.toString()} />
                </View>
              ))}
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
    fontSize: 16,
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
