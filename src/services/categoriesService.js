import categoryMapper from './mappers/categoryMapper';
import HttpClient from './utils/httpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');
    return categories.map(categoryMapper.toDomain);
  }
}

export default new CategoriesService();
