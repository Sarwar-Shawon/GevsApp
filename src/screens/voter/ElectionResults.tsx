import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
//
import {Get} from '../../api';
import apiConfig from '../../config/apiConfig';
import {Colors} from '../../utils';
import {AppModal, AppText, Loading} from '../../compoents';
//
interface ElectionResult {
  status: string;
  winner: string;
  seats: {party: string; seat: string}[];
}
//
interface Props {
  closeModal?: () => void;
  style?: ViewStyle;
  showPublish?: boolean;
  electionStatus?: string;
  publishResults?: () => void;
}
//
const ElectionResults = ({
  closeModal,
  style,
  publishResults,
  electionStatus,
  showPublish,
}: Props) => {
  const [contentLoading, setContentLoading] = useState(false);
  const [electionResult, setElectionResult] = useState<ElectionResult>({
    status: '',
    winner: '',
    seats: [],
  });
  //useEffect
  useEffect(() => {
    loadShowResults();
  }, []);
  //load Constituency Results
  const loadShowResults = async () => {
    try {
      setContentLoading(true);
      const resp = await Get(`/results`);
      // console.log('resp:::::', resp);
      if (resp.status == 'success') {
        const data = resp.data as ElectionResult;
        setElectionResult(data);
      }
    } catch (err) {
      // console.log('err', err);
    } finally {
      setContentLoading(false);
    }
  };
  //render
  return (
    <AppModal
      closeModal={closeModal}
      hideClose={false}
      style={{backgroundColor: '#EFF4FA'}}>
      <View style={{flex: 1, marginVertical: 16}}>
        {contentLoading && <Loading />}
        <ScrollView style={{flex: 1, margin: 20}}>
          {electionResult?.seats.length > 0 ? (
            <View>
              <View style={{flexDirection: 'row', marginVertical: 2}}>
                <View style={{flex: 1}}>
                  <AppText
                    title={'Election Status  :'}
                    style={{fontWeight: '500'}}
                  />
                </View>
                <View style={{flex: 1}}>
                  <AppText
                    title={electionResult.status}
                    style={{
                      color:
                        electionResult.status == 'Pending'
                          ? '#F66B0E'
                          : '#4caf50',
                      fontWeight: '500',
                    }}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <AppText
                    title={'Election Winner :'}
                    style={{fontWeight: '500'}}
                  />
                </View>
                <View style={{flex: 1}}>
                  <AppText
                    title={electionResult.winner}
                    style={{
                      color:
                        electionResult.winner == 'Pending'
                          ? '#F66B0E'
                          : electionResult.winner == 'Hung Parliament'
                          ? '#CC381B'
                          : '#4caf50',
                      fontWeight: '500',
                    }}
                  />
                </View>
              </View>
              <View style={{marginVertical: 10}}>
                <AppText title={'Results:'} style={{fontWeight: '500'}} />
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
                  <View style={{backgroundColor: '#7D808B', height: 1}}></View>
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
        {showPublish && electionStatus == 'finished' && (
          <TouchableOpacity
            onPress={publishResults}
            style={styles.publishButton}>
            <AppText title={'Publish Results'} style={{fontWeight: 'bold'}} />
          </TouchableOpacity>
        )}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  publishButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ElectionResults;
