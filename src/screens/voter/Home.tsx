import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//
const candidates = [
  {id: 1, name: 'Candidate A'},
  {id: 2, name: 'Candidate B'},
];
//voter dashboard
const HomeScreen = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const handleVote = (candidateId: number) => {
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
          key={candidate.id}
          style={[
            styles.candidateButton,
            selectedCandidate === candidate.id && styles.selectedCandidate,
          ]}
          onPress={() => handleVote(candidate.id)}
          disabled={voteSubmitted}>
          <Text>{candidate.name}</Text>
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
