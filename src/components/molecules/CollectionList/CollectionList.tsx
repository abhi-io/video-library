import React from 'react'
import * as Styles from './CollectionList.styles'
import 'swiper/css'
import 'swiper/css/free-mode'
import { FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Components
import { Card, Collection } from '@components/atoms'

type CollectionListProps = {
  title: string
  collections: Movie[]
}

function CollectionList({ title, collections }: CollectionListProps) {
  return (
    
    <div className={Styles.Container()}>
      <h1 className={Styles.Title()}>{title}</h1>
      <Swiper
        freeMode
        slidesPerView={'auto'}
        modules={[FreeMode]}
        spaceBetween={20}
        className={Styles.SwiperContainer()}
        breakpoints={{
          768: {
            spaceBetween: 0
          }
        }}
      >
        {collections.map((collection, i) => {
          console.log(collection.poster_path)
          return (
            <SwiperSlide
              style={{ width: 179 }}
              className={Styles.SwiperSlide()}
              key={collection.id}
            >
              <div
                data-aos='zoom-in-up'
                data-aos-offset='200'
                data-aos-once='true'
                data-aos-delay={i * 100}
                style={{ height: '100%' }}
              >
                <div className="tooltip-wrap">
                
                <Collection
                  src={
                    // 'https://image.tmdb.org/t/p/w500/' + collection.poster_path
                    'http://localhost:8000' + collection.poster_path
                    // 'http://localhost:8000/static/web-crawler.jpeg' 
                  }
                  
                  alt={collection.title}
                   
                />  
                  
                    <div className="tooltip-content">
                        {collection.overview}
                  </div> 
                  </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

       
    </div>
  )
}

export default CollectionList
