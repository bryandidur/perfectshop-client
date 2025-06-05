import http from '@/utils/http';

export default {
  async checkout(data: object) {
    return await http.post('/checkout', data);
  }
};
