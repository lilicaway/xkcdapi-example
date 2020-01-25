import { Comic } from './comic';
import axios from 'axios';

export async function getLatestComic(): Promise<Comic> {
  const res = await axios.get<Comic>('/xkcdapi/info.0.json');

  return res.data;
}

export async function getComicByNumber(num: number): Promise<Comic> {
  const res = await axios.get<Comic>(`/xkcdapi/${num}/info.0.json`);

  return res.data;
}

export async function getLatestNComics(
  numberOfComics: number,
): Promise<Array<Promise<Comic>>> {
  const latestPromiseComic = getLatestComic();
  const latestComic = await latestPromiseComic;

  const latestComicId = latestComic.num;

  const allLatestComics: Array<Promise<Comic>> = [latestPromiseComic];

  for (
    let current = latestComicId - 1;
    current > 0 && current > latestComicId - numberOfComics;
    current--
  ) {
    allLatestComics.push(getComicByNumber(current));
  }

  return allLatestComics;
}
