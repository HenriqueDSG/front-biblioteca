import axios from 'axios';
import apiUrl from '../apiUrl';

export default class RegistryService {
  
  async getRegistries() {
    return await axios.get(`${apiUrl}/registry`);
  }

  async getRegistry(id: string) {
    return await axios.get(`${apiUrl}/registry/${id}`);
  }

  async getRegistryByBookId(id: string) {
    return await axios.get(`${apiUrl}/registry/getRegistryByBookId/${id}`);
  }

  async getRegistryByPersonId(id: string) {
    return await axios.get(`${apiUrl}/registry/getRegistryByPersonId/${id}`);
  }

  async createRegistry(registry: any) {
    return await axios.post(`${apiUrl}/registry`, registry);
  }

  async updateRegistry(registry: any) {
    return await axios.patch(`${apiUrl}/registry/${registry.id}`, registry);
  }

  async deleteRegistry(id: number) {
    return await axios.delete(`${apiUrl}/registry/${id}`);
  }
}