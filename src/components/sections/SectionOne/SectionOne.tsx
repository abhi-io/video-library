import { CollectionCardList, CollectionList } from '@components/molecules'
import React from 'react'
import * as Styles from './SectionOne.styles'

type SectionOneProps = {
  data: {
    movies: Movie[]
    seasons: TVshow[]
    mostPopular: MostPupular[]
  }
}

function SectionOne({ data }: SectionOneProps) {
  return (
    <section className={Styles.SectionOne()}>
      <CollectionCardList title='Popular Videos' collections={data.seasons} />
      <CollectionList title='Trending Searches' collections={data.mostPopular} />
      <CollectionList title='recently Added' collections={data.movies} />
    </section>
  )
}

export default SectionOne
