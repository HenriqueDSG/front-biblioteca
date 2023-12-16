import axios from 'axios';
import apiUrl from '../apiUrl';

export default class PersonService {
  
  async getPersons() {
    return await axios.get(`${apiUrl}/person`);
  }

  async getPerson(id: string) {
    return await axios.get(`${apiUrl}/person/${id}`);
  }

  async createPerson(person: any) {
    return await axios.post(`${apiUrl}/person`, person);
  }

  async updatePerson(person: any) {
    return await axios.patch(`${apiUrl}/person/${person.id}`, person);
  }

  async deletePerson(id: number) {
    return await axios.delete(`${apiUrl}/person/${id}`);
  }

  async findUsers () {
    return await axios.get(`${apiUrl}/person/findUsers`);
  }

  async findAttendants () {
    return await axios.get(`${apiUrl}/person/findAttendants`);
  }
}