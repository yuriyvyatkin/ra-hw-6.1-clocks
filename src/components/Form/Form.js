import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
  }

  componentDidMount() {
    this.nameRef.current.focus();
  }

  render() {
    const {
      onSubmit: handleFormSubmit,
      onChange: handleInputChange,
      form,
    } = this.props;

    return (
      <form
        className="Form"
        onSubmit={(event) => {
          event.preventDefault();
          handleFormSubmit(form);
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
            value={form.name}
            onChange={handleInputChange}
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
            value={form.userTimezone}
            onChange={handleInputChange}
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
