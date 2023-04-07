import { useState } from 'react';
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type Props = {
  clients: Client[];
  onClientSelect: (client: Client) => void;
};

export default function ClientSelect({ clients, onClientSelect }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [error, setError] = useState('');

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const results = clients.filter((client) =>
        client.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleClientClick = (client: Client) => {
    onClientSelect(client);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div>
      <label htmlFor="client-search">Rechercher un client existant :</label>
      <input
        type="text"
        id="client-search"
        name="client-search"
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
      />
      {error && (
        <div className="text-xs flex items-center text-red-500 dark:text-red-400 mt-2">
          <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
          <p className="ml-2">{error}</p>
        </div>
      )}
      <ul className="mt-2 border rounded-md border-gray-200 divide-y divide-gray-200">
        {searchResults.map((client) => (
          <li key={client.id}>
            <button
              className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out w-full text-left py-2 px-4"
              onClick={() => handleClientClick(client)}
            >
              {client.name} ({client.type}) - {client.postalCode}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
