import type { GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '@services/api'
import AppLoading from '@components/atoms/AppLoading'
import { useEffect, useRef, useState } from 'react'
import { debounce } from '@utils/index'
import { Transition } from 'react-transition-group'
import Hero from '@components/organisms/Hero'

type HomeProps = {
  movies: Movie[]
}

const defaultStyle = {
  transition: `opacity 500ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 }
}

const Home: NextPage<HomeProps> = ({ movies }) => {
  const [loading, setLoading] = useState(true)
  const refAppLoading = useRef(null)

  const handleWithLoad = () => {
    debounce(() => setLoading(false), 1800)
  }

  const getVideo = async (movieId: number) => {
    const video = await api.get(`movie/${movieId}/videos`)
    console.log(video)
  }

  useEffect(() => {
    window.addEventListener('load', handleWithLoad)

    return () => {
      window.removeEventListener('load', handleWithLoad)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Hero />
        {/* <ul>
          {movies.map((movie) => {
            return (
              <li key={movie.id} onClick={() => getVideo(movie.id)}>
                {movie.title} {movie.id}
              </li>
            )
          })}
        </ul> */}
      </main>
      <Transition
        in={loading}
        timeout={1000}
        nodeRef={refAppLoading}
        unmountOnExit
      >
        {(state) => (
          <div
            ref={refAppLoading}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <AppLoading />
          </div>
        )}
      </Transition>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('\x1b[32m', '\n✅ Index Page created with success')

  const {
    data: { results: movies }
  }: { data: { results: Movie[] } } = await api.get(`movie/popular`)

  return {
    props: {
      movies
    }
  }
}

export default Home
