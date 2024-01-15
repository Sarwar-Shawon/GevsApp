import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
//
import {Post, Get} from '../../api';
import appConfig from '../../config/config';
import {getItem, Colors} from '../../utils';
import {AppText, ErrorMessage, Loading, PageWrapper} from '../../compoents';
import {useAuthContext} from '../../context';
import ElectionResults from './ElectionResults';
//
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
interface vote {
  status: string;
  data: object;
  message?: string;
}
interface voteData {
  voter_id: string;
  uvc: string;
  candidate_id: string;
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
  const [candidates, setCandidates] = useState<Candidate[]>([] as Candidate[]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [electionStatus, setElectionStatus] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string>('');

  //useEffect
  useEffect(() => {
    loadUser();
    getElectionStatus();
  }, []);
  //load Candidates
  const loadUser = async () => {
    try {
      setLoading(true);
      const user = await getItem('usr');
      if (user) {
        //load candidates and check provided vote
        loadCandidates(user.usr_id);
        checkProvidedVote(user.usr_id);
      }
      setUser(user);
    } catch (err) {
      // console.log('err', err);
    }
  };
  //get Election Status
  const getElectionStatus = async () => {
    try {
      const resp = await Get(
        `/settings/get-status?settingsId=${appConfig.settingsId}`,
      );
      // console.log('election status:::::', resp.data);
      const status = resp.data as string;
      setElectionStatus(status);
    } catch (err) {
      // console.log('err', err);
    }
  };
  //load Candidates
  const loadCandidates = async (usr_id: string) => {
    try {
      setLoading(true);
      const resp = await Get(`/candidate/get-candidates/${usr_id}`);
      // console.log('resp:::::', resp.data);
      const data = resp.data as Candidate[];
      setCandidates(data || []);
      setLoading(false);
    } catch (err) {
      // console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  //check Provided Vote
  const checkProvidedVote = async (usr_id: string) => {
    try {
      setLoading(true);
      if (user) {
        const resp = await Get(`/vote/get?voter_id=${usr_id}`);
        // console.log('checkProvidedVote: resp:::::', resp);
        const data = resp;
        if (resp.data) {
          const voteData = data.data as voteData;
          setSelectedCandidate(voteData?.candidate_id);
          setVoteSubmitted(true);
        } else setVoteSubmitted(false);
      }
      setLoading(false);
    } catch (err) {
      // console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  // //vote submit handler
  const handleSubmitVote = async () => {
    try {
      if (!selectedCandidate) {
        Alert.alert(
          'Error',
          'Please select a candidate first.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
        return;
      }
      setSubmitLoading(true);
      setError('');
      const resp = await Post(`/candidate/provide-vote`, {
        voter_id: user.usr_id,
        candidate_id: selectedCandidate,
      });
      // console.log('resp:::::', resp);
      if (resp.status == 'success') {
        const respVote = await Post(`/vote/provide`, {
          voter_id: user.usr_id,
          uvc: user.uvc,
          candidate_id: selectedCandidate,
        });
        // console.log('election status:::::', resp.data);
        if (respVote.status === 'success') {
          setVoteSubmitted(true);
          Alert.alert(
            'Success',
            respVote.message,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false},
          );
        } else {
          const errMsg = respVote.message as string;
          setError(errMsg);
        }
      } else {
        const errMsg = resp.message as string;
        setError(errMsg);
      }
      setSubmitLoading(false);
    } catch (err) {
      setSubmitLoading(false);
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
            <Text style={{color: 'white'}}>Hide</Text>
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
              electionStatus == 'not-started'
                ? '#F66B0E'
                : electionStatus == 'ongoing'
                ? '#5B8A72'
                : electionStatus == 'finished'
                ? '#CC381B'
                : electionStatus == 'published'
                ? '#03C988'
                : Colors.text_color,
          }}
          title={
            electionStatus == 'not-started'
              ? "It's not started yet, So you won't be able to submit your vote at this moment."
              : electionStatus == 'ongoing'
              ? `Election is ongoing now${
                  !voteSubmitted ? ', So You Can cast your vote now' : ''
                }.`
              : electionStatus == 'finished'
              ? `The election has finished. You can't cast your vote now.`
              : electionStatus == 'published'
              ? 'The election is finished  and the results has been published.'
              : ''
          }
        />
        {electionStatus == 'published' && (
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={() => setShowResult(true)}>
            <AppText title={'Show Result'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginLeft: 20}}>
        <AppText
          style={styles.title}
          title={voteSubmitted ? 'Your Vote' : 'Cast Your Vote'}
        />
      </View>
      {voteSubmitted && (
        <AppText
          style={styles.submitText}
          title={"You've already Submitted your Vote. Thank you!"}
        />
      )}
      <ScrollView style={{flex: 1, margin: 20}}>
        {candidates.length > 0 ? (
          candidates.map(candidate => (
            <TouchableOpacity
              key={candidate._id}
              style={[
                styles.candidateButton,
                selectedCandidate === candidate._id && styles.selectedCandidate,
              ]}
              onPress={() => setSelectedCandidate(candidate._id)}
              disabled={
                electionStatus == 'not-started'
                  ? true
                  : electionStatus == 'finished'
                  ? true
                  : voteSubmitted
              }>
              <AppText
                style={{color: '#000000', fontWeight: '500'}}
                title={candidate.candidate}
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <AppText style={styles.title} title="No candidates found." />
          </View>
        )}
      </ScrollView>
      {submitLoading ? (
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'small'} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      ) : (
        !voteSubmitted &&
        electionStatus != 'published' &&
        selectedCandidate !== null && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor:
                  electionStatus == 'not-started'
                    ? '#7D808B'
                    : electionStatus == 'ongoing'
                    ? '#4caf50'
                    : electionStatus == 'finished'
                    ? '#7D808B'
                    : Colors.text_color,
              },
            ]}
            onPress={handleSubmitVote}
            disabled={
              electionStatus == 'not-started'
                ? true
                : electionStatus == 'finished'
                ? true
                : voteSubmitted
            }>
            <AppText style={styles.submitButtonText} title={'Submit Vote'} />
          </TouchableOpacity>
        )
      )}
      {showResult && (
        <ElectionResults closeModal={() => setShowResult(false)} />
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
    color: Colors.text_color,
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
