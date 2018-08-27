import { connect } from 'react-redux';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import './TextFieldGroup.scss';

class TextFieldGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorName: "",
            errorDescription: "",
            fieldValue: ""
        }
    }

    componentWillReceiveProps (nextprops) {

    }

    checkUserExists = (e) => {
        const field = e.target.name;
        const val = e.target.value;

    }

    render = () => {
        const { field, label, type, value, onChange, frontendError, placeholder, focusUsernameInputField } = this.props;

        return (
            <div>
                <div className={classnames("form-group", {'has-error': (this.state.errorDescription || frontendError)})}>
                    <label className="control-label">{label}</label>
                    <input
                        style={{
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                        }}
                        ref={focusUsernameInputField}
                        onChange={onChange}
                        type={type}
                        onBlur={this.checkUserExists}
                        name={field}
                        className="form-control"
                        placeholder={placeholder}
                    />
                     {(this.state.errorDescription || frontendError) && <span className="help-block">{ (this.state.errorDescription || frontendError) }</span>}
                </div>
            </div>
            );
        }

}

/*TextFieldGroup.propTypes = {
    field: React.PropTypes.string,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    frontendError: React.PropTypes.string
}*/

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextFieldGroup);