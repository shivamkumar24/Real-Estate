import axios from "axios";

export const baseURL = "https://bayut.p.rapidapi.com";

export const API = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "70415e505amshe639883d9e110b5p16fa4ajsn9759e65393d8",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });

  return data;
};
