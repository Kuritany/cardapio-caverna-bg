class MenuService {
  async getMenuData() {
    const url = "https://script.google.com/macros/s/AKfycbzXjjxOOQBBhrhxeiANKWEtEcP61Kdm8VUoaqWQbC1NOG20oV6wa-DehoAY0NkHWEIVRw/exec"
    return await fetch(url).then(response => {
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
