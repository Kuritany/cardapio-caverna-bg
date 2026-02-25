class MenuService {
  async getMenuData() {
    return await fetch(process.env.MENU_API_URL!).then(response => {
      const res = response.json();
      return res;
    })
    .catch(error => {
      console.error('Error occurred during CORS request:', error);
      return [];
    });
  }
}

export default new MenuService();
