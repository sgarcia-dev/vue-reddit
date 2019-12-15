const API = 'https://www.reddit.com';

export default {
  getTopPosts() {
    const url = `${API}/top.json`;
    return fetch(url)
      .then(res => {
        if (!res.ok) throw Error(res);
        return res;
      })
      .then(res => res.json())
      .then(res => {
        return res.data.children.map(child => child.data);
      });
  }
};
