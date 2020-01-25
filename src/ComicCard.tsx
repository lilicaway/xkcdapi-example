import React, { FunctionComponent, useEffect, useState } from 'react';
import { Comic } from './xkcd/comic';
import styled from 'styled-components';

const MyArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  comicPromise: Promise<Comic> | undefined;
}

const ComicCard: FunctionComponent<Props> = props => {
  const [comic, setComic] = useState<Comic | undefined>();
  const { comicPromise } = props;
  useEffect(() => {
    comicPromise?.then(comicResolved => {
      setComic(comicResolved);
    });
  }, [comicPromise]);

  if (!comic) {
    return <p>Loading...</p>;
  }

  return (
    <MyArticle>
      <hgroup>
        <h3>{comic.title}</h3>
      </hgroup>
      <figure>
        <a
          href={`https://xkcd.com/${comic.num}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={comic.img} alt={comic.title} title={comic.alt} />
        </a>
      </figure>
    </MyArticle>
  );
};

export default ComicCard;
