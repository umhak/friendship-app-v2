import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import RegisterHeader from '../../components/RegisterHeader';
import { INTERESTS } from '../../components/ProgressSteps';
import styles from './styles';
import Footer from '../../components/Footer';
import TagsList from '../../components/TagsList';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { validateTags } from './validation';

const mapStateToProps = state => ({
  register: state.form.register,
});

const mapDispatchToProps = dispatch => ({
  goToUserInformationForm: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Description' })),
});

function aTagHasBeenSelected(register) {
  return (
    register.values.lovedTags.length > 0 || register.values.hatedTags.length > 0
  );
}

const TagsScreen = props => (
  <View style={styles.tagsScreen}>
    <ScrollView bounces={false}>
      <RegisterHeader
        backgroundStyle={'dark'}
        titleComponent={
          <Text style={styles.title}>
            <Text style={styles.yeah}>YEAHS!</Text> &{' '}
            <Text style={styles.nah}>NAAH...</Text>
          </Text>
        }
        processStage={INTERESTS}
      />
      <TagsList onChange={props.change} />
    </ScrollView>
    <Footer
      disabled={props.register && !aTagHasBeenSelected(props.register)}
      onPress={props.handleSubmit}
      color={'grey'}
    >
      <Text style={styles.next}>Next</Text>
    </Footer>
  </View>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'register',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    onSubmit: validateTags,
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToUserInformationForm();
    },
  })(TagsScreen),
);
