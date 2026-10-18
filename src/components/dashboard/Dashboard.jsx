
import React, { useEffect, useState } from "react";
import Header from "../AdminPanel/Header";
import { useNavigate } from "react-router";
import {Phone,MapPin,Building2 } from "lucide-react";

const Dashboard = () => {

  const [contactId, setContactId] = useState(null)
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("");
  const usenavigate = useNavigate();

  useEffect(() => {
    async function fetchContacts() {
      try {
        const url = "https://contact-pro-1.onrender.com/api/contacts";

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {

          throw new Error(data.message || "Failed to fetch contacts");

        }
        setContacts(data.results);
      } catch (err) {

        alert(err.message);
      }
    }

    fetchContacts();
  }, [contactId]);

 const filteredContacts = contacts.filter((contact) => {
  const searchText = search.trim().toLowerCase();

  const name = (contact.name || "").toLowerCase();
  const city = (contact.city || "").toLowerCase();

  return (
    name.includes(searchText) ||
    city.includes(searchText)
  );
});


  async function deleteContact(Id) {
    try {
      const url = `https://contact-pro-1.onrender.com/api/contacts/delete/${Id}`;

      const res = await fetch(url, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      alert(data.message)
      setContactId(Id)
      const result = contacts.filter((item) => item.id !== Id)
      setContactId(result)
    } catch (err) {
      return alert(err.message)
    }
  }


  function updateContact(contactId) {
    if (!contactId) return;
    usenavigate("/updatecontact", {
      state: {
        contactId
      }
    })
  }


  return (
    <div className="admin-panel">
      <Header
        search={search}
        setSearch={setSearch}
      />

      <main className="dashboard-main">
        <div className="contacts-heading">
          <div>
            <h2>My Contacts</h2>
            <p>Manage all your contacts in one place.</p>
          </div>

          {contacts.length===0?
          <span className="contact-count">
            {contacts.length} Contacts
          </span>:
          <span className="contact-count">
          {filteredContacts.length} Contacts
          </span>
}
        </div>

        {contacts.length === 0 ? (
          <div className="empty-contacts">
            <h3>No contacts yet</h3>
            <p>Add your first contact to get started.</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="empty-contacts">
            <h3>No contacts found</h3>
            <p>Try another contact name or city.</p>
          </div>)
          :
        (<div className="contacts-grid">
            {filteredContacts.map((contact) => (
              <div className="contact-card" key={contact.id}>
                <div className="card-top">
                  <div className="contact-avatar">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="contact-category">
                    {contact.Category}
                  </span>
                </div>

                <h3 className="contact-name">{contact.name}</h3>

                <div className="contact-details">
                  <p>
                   <span><Phone /></span>
                    {contact.phone}
                  </p>

                  <p>
                    <span><MapPin  /></span>
                    {contact.address === "" ? "none" : contact.address}

                  </p>

                  <p>
                    <span><Building2  /></span>
                    {contact.city}
                  </p>
                </div>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => updateContact(contact.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
  
      </main>
    </div>
  );
};

export default Dashboard;
