import axios from 'axios';
import apiUrl from '../apiUrl';

export default class BookService {
  
  async getBooks() {
    return await axios.get(`${apiUrl}/book`);
  }

  async getBook(id: string) {
    return await axios.get(`${apiUrl}/book/${id}`);
  }

  async createBook(book: any) {
    return await axios.post(`${apiUrl}/book`, book);
  }

  async updateBook(book: any) {
    return await axios.patch(`${apiUrl}/book/${book.id}`, book);
  }

  async deleteBook(id: number) {
    return await axios.delete(`${apiUrl}/book/${id}`);
  }
}