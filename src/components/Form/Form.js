import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.state = { name: '', userTimezone: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.nameRef.current.focus();
  }

  handleInputChange({ target }) {
    const { name, value } = target;

    this.setState(prevForm => ({ ...prevForm, [name]: value }));
  }

  render() {
    return (
      <form
        className="Form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onFormSubmit(this.state);
          this.setState({ name: '', userTimezone: '' });
          this.nameRef.current.focus();
        }}
      >
        <div className="Form-control">
          <label htmlFor="name">Название</label>
          <input
            className="Form-control__name"
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            ref={this.nameRef}
            autoComplete="off"
            required
          />
        </div>
        <div className="Form-control">
          <label htmlFor="user-timezone">Временная зона</label>
          <input
            className="Form-control__user-timezone"
            type="number"
            id="user-timezone"
            name="userTimezone"
            min="-12"
            max="14"
            value={this.state.userTimezone}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button
          className="Form-control__button-add"
          type="submit"
        >
          Добавить
        </button>
      </form>
    );
  }
}

export default Form;
