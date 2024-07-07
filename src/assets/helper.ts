import { Person } from "./types";
import persons from "./../assets/data/personsData.json"

export const searchPersonsApi = (search: string, page: number, size: number): Promise<Person[]> => {
  return new Promise((resolve) => {
    const lowerCaseSearch = search.toLowerCase();
    const filteredPersons = persons
      .filter(
        (person) =>
          person.firstName.toLowerCase().includes(lowerCaseSearch) ||
          person.lastName.toLowerCase().includes(lowerCaseSearch) ||
          `${person.firstName} ${person.lastName}`.toLowerCase().includes(lowerCaseSearch)
      )
      .slice((page - 1) * size, page * size);
    resolve(filteredPersons);
  });
};

export const fetchPersonById = async (id?: string): Promise<Person|undefined> => {
  return new Promise((resolve) => {
    const person = persons.find((person: Person) => person.id === id)
    resolve(person)
  })
}
