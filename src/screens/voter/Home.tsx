import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
//
import {Post, Get} from '../../api';
import api from '../../config/api';
import appConfig from '../../config/config';
import {setItem, getItem, Colors} from '../../utils';
import {AppText, Loading, PageWrapper} from '../../compoents';
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
// const candidates = [
//   {id: 1, name: 'Candidate A'},
//   {id: 2, name: 'Candidate B'},
// ];
//voter dashboard
const HomeScreen = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([] as Candidate[]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [electionStatus, setElectionStatus] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  //useEffect
  useEffect(() => {
    checkProvidedVote();
    getElectionStatus();
    loadCandidates();
  }, []);
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
  //load Candidates
  const loadCandidates = async () => {
    try {
      setLoading(true);
      const user = await getItem('usr');
      if (user) {
        const resp = await Get(
          `${api.SERVER_TEST}/gevs/candidate/get-candidates/${user.usr_id}`,
        );
        // console.log('resp:::::', resp.data);
        const data = resp.data as Candidate[];
        setCandidates(data);
      }
      setLoading(false);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  //check Provided Vote
  const checkProvidedVote = async () => {
    try {
      setLoading(true);
      const user = await getItem('usr');
      if (user) {
        const resp = await Get(
          `${api.SERVER_TEST}/gevs/vote/get?voter_id=${user.usr_id}`,
        );
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
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };
  //vote submit handler
  const handleSubmitVote = async () => {
    try {
      console.log('Vote submitted for candidate:', selectedCandidate);
      const user = await getItem('usr');
      const resp = await Post(`${api.SERVER_TEST}/gevs/vote/provide`, {
        voter_id: user.usr_id,
        uvc: user.uvc,
        candidate_id: selectedCandidate,
      });
      // console.log('election status:::::', resp.data);
      if (resp.status === 'success') {
        setVoteSubmitted(true);
        Alert.alert(
          'Success',
          resp.message,
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (err) {}
  };
  if (loading) {
    return <Loading />;
  }
  //render
  return (
    <PageWrapper style={styles.container}>
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
              ? "It's not started yet, So you won't be able to submit yout vote at this moment."
              : electionStatus == 'ongoing'
              ? 'Election is ongoing now, So You Can cast your vote now.'
              : electionStatus == 'finished'
              ? 'The election has finished.'
              : ''
          }
        />
      </View>
      <View style={{marginLeft: 20}}>
        <AppText style={styles.title} title="Cast Your Vote" />
      </View>
      {voteSubmitted && (
        <AppText
          style={styles.submitText}
          title={"You've already Submitted your Vote. Thank you!"}
        />
      )}
      <ScrollView style={{flex: 1, margin: 20}}>
        {candidates.map(candidate => (
          <TouchableOpacity
            key={candidate._id}
            style={[
              styles.candidateButton,
              selectedCandidate === candidate._id && styles.selectedCandidate,
            ]}
            onPress={() => setSelectedCandidate(candidate._id)}
            disabled={voteSubmitted}>
            <AppText style={{color: '#000000'}} title={candidate.candidate} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!voteSubmitted && selectedCandidate !== null && (
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
            /* electionStatus == 'not-started'
              ? true
              : electionStatus == 'finished'
              ? true
              : */ voteSubmitted
          }>
          <AppText style={styles.submitButtonText} title={'Submit Vote'} />
        </TouchableOpacity>
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
