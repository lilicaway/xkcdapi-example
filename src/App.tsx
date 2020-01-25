import React, { useEffect, useState } from 'react';
import ComicCard from './ComicCard';
import { Comic } from './xkcd/comic';
import { getLatestNComics } from './xkcd/xkcdService';
import styled from 'styled-components';

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  align-items: center;
`;

const MyHeader = styled.header`
  & > h1 {
    font-weight: normal;
  }
`;

const MySection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & img {
    max-height: 300px;
    max-width: 300px;
  }
`;

const App: React.FC = () => {
  const [comicsPromises, setComicsPromises] = useState<
    Array<Promise<Comic>> | undefined
  >();
  useEffect(() => {
    getLatestNComics(10).then(comics => {
      setComicsPromises(comics);
    });
  }, []);

  const comicCards: JSX.Element[] = [];

  if (comicsPromises) {
    for (let i = 0; i < comicsPromises.length; i++) {
      const comicProm = comicsPromises[i];
      comicCards.push(<ComicCard key={i} comicPromise={comicProm} />);
    }
  }

  return (
    <MyContainer>
      <MyHeader>
        <h1>
          The <b>latest</b> comics
        </h1>
      </MyHeader>
      <MySection>{comicCards}</MySection>
    </MyContainer>
  );
};

export default App;
