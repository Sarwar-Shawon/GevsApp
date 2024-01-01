import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
//
import {Post, Get} from '../../api';
import api from '../../config/api';
import appConfig from '../../config/config';
import {setItem, getItem, Colors} from '../../utils';
import {Loading, PageWrapper} from '../../compoents';
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
  //Get Candidates
  useEffect(() => {
    //
    getElectionStatus();
    loadCandidates();
  }, []);
  //
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
  //
  const loadCandidates = async () => {
    try {
      setLoading(true);
      const user = await getItem('usr');
      if (user) {
        const resp = await Get(
          `${api.SERVER_TEST}/gevs/candidate/get-candidates/${user.usr_id}`,
        );
        console.log('resp:::::', resp.data, typeof resp.data);
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
  const handleVote = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };
  //vote submit handler
  const handleSubmitVote = async () => {
    try {
      console.log('Vote submitted for candidate:', selectedCandidate);
      setVoteSubmitted(true);
    } catch (err) {}
  };
  if (loading) {
    return <Loading />;
  }
  //render
  return (
    <PageWrapper style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <Text style={styles.title}>Election Status:</Text>
        <Text style={styles.title}>
          {electionStatus == 'not-started'
            ? "It's not started"
            : electionStatus == 'ongoing'
            ? 'You Can cast your vote now.'
            : electionStatus == 'finished'
            ? 'The election has finished'
            : ''}
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Cast Your Vote</Text>
      </View>
      <ScrollView style={{flex: 1, margin: 20}}>
        {candidates.map(candidate => (
          <TouchableOpacity
            key={candidate._id}
            style={[
              styles.candidateButton,
              selectedCandidate === candidate._id && styles.selectedCandidate,
            ]}
            onPress={() => handleVote(candidate._id)}
            disabled={voteSubmitted}>
            <Text>{candidate.candidate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!voteSubmitted && selectedCandidate !== null && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitVote}>
          <Text style={styles.submitButtonText}>Submit Vote</Text>
        </TouchableOpacity>
      )}

      {voteSubmitted && (
        <Text style={styles.voteSubmittedText}>Vote Submitted. Thank you!</Text>
      )}
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
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
});

export default HomeScreen;
