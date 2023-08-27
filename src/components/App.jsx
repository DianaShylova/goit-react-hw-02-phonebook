import { Component } from 'react';
import { ContactList } from "./ContactsList/ContactList";
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from "./App.module.css"

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handelAddContact = (name, number) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };

  applyFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handelChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handelDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={this.handelAddContact} />

        <h2 className={css.title}>Contacts</h2>
        <p className={css.filter_title}>Find contacts by name</p>
        <Filter
          onChangeFilter={this.handelChangeFilter}
          filter={this.state.filter}
        />
        <ContactList
          contacts={this.applyFilter()}
          onDeleteContact={this.handelDeleteContact}
        />
      </div>
    );
  }
}