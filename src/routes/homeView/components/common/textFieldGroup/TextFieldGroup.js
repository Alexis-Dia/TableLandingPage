import { connect } from 'react-redux';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import './TextFieldGroup.scss';

class TextFieldGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillReceiveProps (nextprops) {

    }

    render = () => {
        const { field, label, type, value, disabled, onChange, frontendError, placeholder, style1 } = this.props;

        return (
            <div style={style1}>
                <div className="form-group">
                    <label className="control-label">{label}</label>
                    <input
                        style={{
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                        }}
                        onChange={onChange}
                        type={type}
                        name={field}
                        className={classnames("form-control", {'has-error': frontendError})}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                    />
                </div>
            </div>
            );
        }

}

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