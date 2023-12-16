import axios from 'axios';
import apiUrl from '../apiUrl';

export default class UserService {
  
  async getUsers() {
    return await axios.get(`${apiUrl}/user`);
  }

  async getUser(id: string) {
    return await axios.get(`${apiUrl}/user/${id}`);
  }

  async createUser(user: any) {
    return await axios.post(`${apiUrl}/user`, user);
  }

  async updateUser(user: any) {
    return await axios.patch(`${apiUrl}/user/${user.id}`, user);
  }
}