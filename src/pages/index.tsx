import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '@services/api'
import { useEffect, useRef, useState } from 'react'
import { debounce } from '@utils/index'
import { Transition } from 'react-transition-group'
import Hero from '@components/organisms/Hero'
import Header from '@components/organisms/Header'
import breakpoints from '@themes/breakpoints'
import SectionOne from '@components/sections/SectionOne'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { GenreContext } from 'context'
import { Router } from 'next/router'
import { m } from 'vitest/dist/index-ea17aa0c'
 
type HomeProps = {
  movies: Array<Movie & { certification: Certification | null }>
  seasons: Array<TVshow & { certification: Certification | null }>
  mostPopular: Array<MostPupular & { certification: Certification | null }>
  heroData: Movie & {
    runtime: number
    genres: Array<{ id: number; name: string }>
    certification: Certification
  }
  genreData: { movie: Genre[]; tv: Genre[] }
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

const Home: NextPage<HomeProps> = ({
  movies,
  seasons,
  mostPopular,
  heroData,
  genreData
}) => {
  const [loading, setLoading] = useState(true)
  const refAppLoading = useRef(null)
  const refMain = useRef<HTMLDivElement>(null)

  const handleWithLoad = () => {
    debounce(() => setLoading(false), 1800)
  }

  useEffect(() => {
    setTimeout(() => {
      handleWithLoad()
    }, 100)

    return () => {
      window.removeEventListener('DOMContentLoaded', handleWithLoad)
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        AOS.init()
      }, 1000)
      refMain.current!.style.display = 'block'
    }
  }, [loading])

  return (
    <>
      <Head>
        <title>N.Saba</title>
        <meta
          name='description'
          content='HBO MAX Redesign made with React and Next.js'
        />
        <meta property='og:title' content='HBO MAX Redesign' />
        <meta property='og:type' content='movie' />
        <meta
          property='og:url'
          content='https://hbo-max-redesign.netlify.app/'
        />
        <meta property='og:image' content='/img/hbo-max.jpg' />
        <meta
          property='og:description'
          content='A Redesign of HBO MAX made with React + Next.js'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <link rel='icon' href='/img/Logo.svg' />
      </Head>

      <style jsx global>
        {`
          .loading_app {
            width: 100%;
            height: 100vh;
            display: grid;
            place-content: center;
            position: fixed;
            top: 0;
            left: 0;
            background: linear-gradient(45deg, #110011, #740092);
            z-index: 3;
          }

          .loading_app svg {
            transform: scale(1.8);
          }

          @media screen and (min-width: ${breakpoints.sm}) {
            .loading_app svg {
              transform: scale(3);
            }
          }

          #path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            fill: transparent;
            animation: lineDraw 2000ms 1 ease-in-out forwards;
          }

          @keyframes lineDraw {
            70% {
              stroke-dashoffset: 800;
              fill: transparent;
            }
            100% {
              fill: #fff;
              stroke-width: 0;
            }
          }
        `}
      </style>

      <Header />
          
      <main className={styles.main} ref={refMain}>
        <GenreContext.Provider value={genreData}>
          <Hero data={heroData} />
          <SectionOne data={{ movies, seasons, mostPopular }} />
        </GenreContext.Provider>
      </main>

      {/* LOADING APP */}
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
            <div className='loading_app'>
              {/* <svg
                width='133'
                height='22'
                viewBox='0 0 133 22'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  id='path'
                  d='M16.3769 21.1595H10.2383V13.0842H6.27153V21.1391H0V0.347548H6.27153V8.11626H10.2383V0.347548H16.3769V21.1595ZM44.4769 21.2413C50.7484 21.2413 55.8676 16.4165 55.8676 10.5695C55.8676 4.5999 50.7484 0 44.4769 0C38.1167 0 34.9034 4.27279 34.1277 5.99009C34.1277 3.41415 31.3355 0.327104 28.1 0.327104H17.6401V21.1391H27.3908C31.3576 21.1391 34.1499 18.0112 34.1499 15.2717C35.0142 16.989 38.1167 21.2413 44.4769 21.2413ZM26.593 12.7979C27.5016 12.7979 28.2329 13.6157 28.2329 14.5357C28.2329 15.517 27.5016 16.3143 26.593 16.3143H23.4905V12.7979H26.593ZM26.593 4.98833C27.5016 4.98833 28.2329 5.80609 28.2329 6.72607C28.2329 7.64605 27.5016 8.46381 26.593 8.46381H23.4905V4.98833H26.593ZM30.715 10.5695C31.4463 10.5287 32.6208 9.75178 33.0862 9.30202C32.9089 9.854 32.9089 11.6122 33.0862 12.1642C32.5765 11.4895 31.4463 10.6718 30.715 10.5695ZM38.7594 10.5695C38.7594 7.64605 41.33 5.27455 44.5212 5.29499C47.7124 5.31544 50.2609 7.70738 50.2165 10.6513C50.1722 13.5544 47.6237 15.885 44.499 15.885C41.3079 15.8645 38.7594 13.5135 38.7594 10.5695ZM44.4769 14.7401C46.9146 14.7401 48.9755 12.8797 48.9755 10.5695C48.9755 8.25937 46.9146 6.41941 44.4769 6.41941C41.9727 6.41941 39.9561 8.25937 39.9561 10.5695C39.9561 12.8797 41.9727 14.7401 44.4769 14.7401ZM88.6213 7.70738C88.5105 2.67816 84.6545 0 79.9121 0C77.2971 0 74.9702 0.797316 73.3746 2.3715C71.7569 0.797316 69.43 0 66.815 0C62.0726 0 58.2166 2.67816 58.0836 7.72783V19.2582C58.0836 20.3213 59.0144 21.18 60.1668 21.18H62.1169C62.3164 21.18 62.4715 21.0369 62.4715 20.8529V7.76872C62.5601 5.27455 64.466 3.96613 66.815 3.96613C69.1641 3.96613 71.0921 5.27455 71.1586 7.76872V19.2582C71.1586 20.3213 72.0893 21.18 73.2417 21.18H75.1918C75.3913 21.18 75.5464 21.0369 75.5464 20.8529V7.76872C75.635 5.27455 77.5409 3.96613 79.8899 3.96613C82.239 3.96613 84.167 5.27455 84.2335 7.76872V19.2582C84.2335 20.3213 85.1642 21.18 86.3166 21.18H88.2667C88.4662 21.18 88.6213 21.0369 88.6213 20.8529V7.76872C88.6435 7.74827 88.6213 7.72783 88.6213 7.70738ZM132.699 0.347548H129.375C128.467 0.347548 127.602 0.776872 127.093 1.47197L123.414 6.50119C122.926 7.1554 121.885 7.1554 121.419 6.50119L117.741 1.47197C117.231 0.776872 116.367 0.347548 115.458 0.347548H112.134C111.935 0.347548 111.802 0.551988 111.912 0.71554L118.472 9.69045C118.937 10.3447 118.937 11.1829 118.472 11.8371L111.912 20.7915C111.802 20.9551 111.912 21.1595 112.134 21.1595H115.458C116.367 21.1595 117.231 20.7302 117.741 20.0351L121.419 15.0059C121.907 14.3517 122.949 14.3517 123.414 15.0059L127.093 20.0351C127.602 20.7302 128.467 21.1595 129.375 21.1595H132.699C132.899 21.1595 133.032 20.9551 132.921 20.7915L126.361 11.8166C125.896 11.1624 125.896 10.3242 126.361 9.67001L132.921 0.695096C133.032 0.551988 132.921 0.347548 132.699 0.347548ZM110.405 0.347548H108.455C107.458 0.347548 106.638 1.00176 106.439 1.8604C104.688 0.633764 102.516 0.020444 100.145 0.020444C94.3831 0 89.7515 3.67992 89.7515 10.6309C89.7515 17.5818 94.4053 21.2617 100.123 21.2617C102.472 21.2617 104.644 20.6484 106.372 19.4422C106.461 20.4235 107.347 21.18 108.433 21.18H110.383C110.583 21.18 110.738 21.0369 110.738 20.8529V0.654208C110.738 0.490656 110.583 0.347548 110.405 0.347548ZM100.123 17.2956C96.71 17.2956 93.9178 14.9854 93.9178 10.6309C93.9178 6.27631 96.6879 3.96613 100.123 3.96613C103.558 3.96613 106.328 6.27631 106.328 10.6309C106.328 14.9854 103.558 17.2956 100.123 17.2956Z'
                  stroke='white'
                  strokeWidth='1px'
                />
              </svg> */}
              {/* <h1 className="loading-screen">
                N.Saba: Video Library
              </h1> */}
              <svg height="100" width="1000" stroke="#ffffff" stroke-width="1" className="text-line">
                <text className="loading-screen" x="310" y="60" fill="none" font-size="40">N.Saba: Video Library</text>
              </svg>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const {
    data: { genres: genreMovieList }
  }: { data: { genres: Genre[] } } = await api.get(`genre/movie/list`)

  const {
    data: { genres: genreTvList }
  }: { data: { genres: Genre[] } } = await api.get(`genre/tv/list`)

  console.log('\x1b[32m', '\n✅ Index Page created with success')

  const {
    data: { results: movies }
  }: { data: { results: Movie[] } } = await api.get(`movie/popular`)

  const {
    data: { results: tvSeasons }
  }: { data: { results: TVSeason[] } } = await api.get(`tv/popular`)

  const {
    data: { results: mostPopular }
  }: { data: { results: TVSeason[] } } = await api.get(`trending/movie/week`)

  const moviesWithAllData = await Promise.all(
    movies.map(async (movie) => {
      const {
        data: { results }
      }: { data: { results: Certification[] } } = await api.get(
        `/movie/${movie.id}/release_dates`
      )
      const certification =
        results.find((cert) => cert.iso_3166_1 === 'US') || null

      return { ...movie, certification }
    })
  )
  // console.log(moviesWithAllData)

  let { data: heroData } = await api.get('movie/791373')
  const {
    data: { results: heroResults }
  }: { data: { results: Certification[] } } = await api.get(
    `movie/791373/release_dates`
  )

  const heroCertification = heroResults.find(
    (heroResult) => heroResult.iso_3166_1 === 'US'
  )

  return {
    props: {
      movies: moviesWithAllData,
      seasons: tvSeasons,
      mostPopular,
      heroData: { ...heroData, certification: heroCertification },
      genreData: { movie: [...genreMovieList], tv: [...genreTvList] }
    }
  }
}

export default Home
