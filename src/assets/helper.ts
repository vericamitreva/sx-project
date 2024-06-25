import persons from './data/personsData.json'

export const searchPersons = (search: string, page: number, size: number) => {
  const lowerCaseSearch = search.toLowerCase()
  return persons
    .filter(
      (person) =>
        person.firstName.toLowerCase().includes(lowerCaseSearch) ||
        person.lastName.toLowerCase().includes(lowerCaseSearch) ||
        (person.firstName + ' ' + person.lastName).toLowerCase().includes(lowerCaseSearch)
    )
    .slice((page - 1) * size, page * size)
}
