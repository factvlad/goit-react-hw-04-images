const axios = require('axios').default;
const apiKey = '28723731-5c15bd07d095f3f0e05de01ba';


const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: apiKey,
      page,
      q: searchQuery,
      orientation: 'horizontal',
      safesearch: `true`,
      per_page: 12,
    },
  });
 console.log(data)
  return data;
};

export default getImages;
