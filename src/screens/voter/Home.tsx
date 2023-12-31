import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//
import {Post, Get} from '../../api';
import api from '../../config/api';
import {setItem, getItem} from '../../utils';
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
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  //Get Candidates
  useEffect(() => {
    //
    loadCandidates();
  }, []);
  //
  const loadCandidates = async () => {
    try {
      // Set loading to true before starting the asynchronous operation
      setLoading(true);
      const user = await getItem('usr');
      console.log('user:::', user);
      if (user) {
        const resp = await Get(
          `${api.SERVER_TEST}/gevs/candidate/get-candidates/${user.usr_id}`,
        );
        console.log('resp:::::', resp.data, typeof resp.data);
        const data = resp.data as Candidate[];
        setCandidates(data);
      }
      // Set loading to false after completing the operation
    } catch (e) {
      // Handle errors if needed
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
  //render
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast Your Vote</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    marginTop: 20,
    borderRadius: 8,
    width: '100%',
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
