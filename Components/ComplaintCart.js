import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {} from 'react-native-paper';

import Modal from 'react-native-modal';

import Options from '../assets/Icons/Options';
import Circle from '../assets/Icons/Circle';

import BottomModalOptions from '../Components/BottomModalOptions';

import firestore from '@react-native-firebase/firestore';

const complaintCart = props => {
  const status = props.status;
  let color = '';

  if (status === 'Reviewed') color = Colors.Primary1;
  if (status === 'In Progress') color = '#fcc419';
  if (status === 'On Hold') color = Colors.Ascent1;

  let height = 200;

  const [visible, setVisible] = useState(false);

  if (status === 'Reviewed') {
    height = 150;
  }

  const deleteItem = async () => {
    await firestore()
      .collection('complaints')
      .doc(props.delKey)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    props.setUpdateDB(true);
    props.setSearchDB(false);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        View
        style={styles.container}
        onPress={() => {
          props.navigation.navigate('ViewComplaint', {
            ticketID: props.ticketID,
            subject: props.subject,
            status: props.status,
            complaint: props.complaint,
            complainee: props.complainee,
          });
        }}>
        <TouchableOpacity>
          <Options
            width={50}
            height={50}
            fill={Colors.MonochromeBlue1000}
            style={{alignSelf: 'flex-end', marginTop: -20}}
            onPress={() => setVisible(true)}></Options>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={[styles.flex, {width: 180}]}>
            <Text
              style={[
                styles.text,
                Typography.Header_14pt,
                {margin: 5, marginTop: -20, width: 180},
              ]}>
              {props.subject}
            </Text>
            <Text
              style={[
                Typography.Text_12pt,
                {color: Colors.MonochromeBlue1000, margin: 5},
              ]}>
              Ticket# {props.ticketID}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: -5,
            }}>
            <Circle
              width={10}
              height={10}
              fill={color}
              style={{marginRight: -10}}></Circle>
            <Text style={[styles.text, Typography.Header_14pt]}>
              {props.status}
            </Text>
          </View>

          <Modal
            isVisible={visible}
            onBackdropPress={() => {
              setVisible(false);
            }}
            style={{margin: 0, justifyContent: 'flex-end'}}>
            <View
              style={{
                height: height,
                backgroundColor: 'white',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <BottomModalOptions
                title="View"
                onPress={() => {
                  props.navigation.navigate('ViewComplaint', {
                    ticketID: props.ticketID,
                    subject: props.subject,
                    status: props.status,
                    complaint: props.complaint,
                    complainee: props.complainee,
                  });
                }}
              />

              <BottomModalOptions
                title="Edit"
                onPress={() => {
                  setVisible(false);
                  props.modalmethod(true);
                  props.isEditable(true);
                  props.setComplainee(props.complainee);
                  props.setSubject(props.subject);
                  props.setComplaint(props.complaint);
                  props.setKey(props.delKey);
                  props.setStatus(props.status);
                  props.setTicketID(props.ticketID);
                }}
              />
              {status !== 'Reviewed' && (
                <BottomModalOptions title="Delete" onPress={deleteItem} />
              )}
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: Colors.MonochromeGreen300,
    borderRadius: 5,
    width: 330,
    marginTop: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.MonochromeBlue1000,
    margin: 20,
  },
});

export default complaintCart;
