import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ContentTitle,
  ContentContainer,
  FormLabel,
  FormBlock,
  FormNumberInput,
  FormSubmitButton,
  CancelButton
} from '../style/export';

export default class ProjectConfigurator extends Component {

  constructor(props, context) {
    super(props, context);

    let scene = props.state.scene;

    this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    let {projectActions} = this.context;
    
  }


  render() {
    let {width, height} = this.props;
    let {projectActions, translator} = this.context;

    return (
      <ContentContainer width={width} height={height}>
        <ContentTitle>{translator.t('Background Config')}</ContentTitle>

        <form onSubmit={e => this.onSubmit(e)}>

          <table style={{float: 'right'}}>
            <tbody>
            <tr>
              <td>
                <CancelButton size='large'
                  onClick={e => projectActions.rollback()}>{translator.t('Cancel')}</CancelButton>
              </td>
              <td>
                <FormSubmitButton disable={true} size='large'>{translator.t('Save')}</FormSubmitButton>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </ContentContainer>
    )
  }
}

ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
