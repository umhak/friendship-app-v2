import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { colors, paddings } from '../../styles';
import { logOut } from '../../actions/login';
import { connect } from 'react-redux';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(logOut()),
  openEditProfile: () => console.log('open edit profile'),
  openEditPersonalities: () => console.log('open edit personalities'),
  openEditTags: () => console.log('open edit tags'),
});

const getTitle = modalType => {
  switch (modalType) {
    case 'profile':
      return <Text style={[styles.header]}>SETTINGS</Text>;
  }
};

class ActionsModal extends Component {
  render() {
    const profileActions = [
      {
        title: 'Manage account',
        onPress: () => {
          this.props.openEditProfile();
        },
      },
      {
        title: 'Manage personalities',
        onPress: () => {
          this.props.openEditPersonalities();
        },
      },
      {
        title: 'Manage Tags',
        onPress: () => {
          this.props.openEditTags();
        },
      },
      {
        title: 'Log Out',
        onPress: () => {
          this.props.signOut();
          this.props.close();
        },
      },
    ];

    const getActions = () => {
      const { actions } = this.props;
      let actionsArray = [];
      switch (actions) {
        case 'profile':
          actionsArray = profileActions;
      }
      return actionsArray.map(action => (
        <TouchableOpacity
          onPress={action.onPress}
          style={{ paddingBottom: paddings.SM }}
          key={action.title}
        >
          <Text style={[styles.action]}>{action.title.toUpperCase()}</Text>
        </TouchableOpacity>
      ));
    };

    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.close}
      >
        <TouchableOpacity
          activeOpacity={0.96}
          style={{
            flex: 1,
            backgroundColor: colors.DARK_BLACK,
            opacity: 0.96,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: paddings.MD,
          }}
          onPress={this.props.close}
        >
          {getTitle(this.props.actions)}
          {getActions()}
        </TouchableOpacity>
      </Modal>
    );
  }
}

ActionsModal.propTypes = {};

export default connect(
  null,
  mapDispatchToProps,
)(ActionsModal);
