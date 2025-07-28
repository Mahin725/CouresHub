import React, { useEffect, useState } from 'react';

const ClubMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/club-members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(error => console.error("Error fetching members:", error));
  }, []);

  const filteredMembers = members.filter(member =>
    member.email?.toLowerCase().includes(search.toLowerCase()) ||
    member.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Club Members</h2>
      <input
        type="text"
        placeholder="Search by email or name"
        className="border px-3 py-2 rounded w-full mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="space-y-2">
        {filteredMembers.map((member, index) => (
          <li key={index} className="border p-3 rounded shadow">
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Role:</strong> {member.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubMembers;
