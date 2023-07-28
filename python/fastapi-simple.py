# python -m uvicorn fastapi-simple:app --reload
from fastapi import FastAPI
import json
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
FOLDER_PATH='json_folder/' 

@app.get("/")
async def root():
    return {"message": "Hello World"} 

@app.get("/genre/movie/list")
async def root():
    with open((FOLDER_PATH + 'genre-movie-list.json')) as f:
        return json.load(f)
@app.get("/genre/tv/list")
async def root():
    with open((FOLDER_PATH + 'genre-tv-list.json')) as f:
        return json.load(f)


@app.get("/movie/popular")
async def root():
    with open((FOLDER_PATH + 'movie-popular.json')) as f:
        return json.load(f)


@app.get("/tv/popular")
async def root():
    with open((FOLDER_PATH + 'tv-popular.json')) as f:
        return json.load(f)

@app.get("/trending/movie/week")
async def root():
    with open((FOLDER_PATH + 'trending-movie-week.json')) as f:
        return json.load(f)
@app.get("/movie/{movie_id}/release_dates")
async def root(movie_id:str):
    # print(movie_id, "<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    return {
            "id": 346698,
            "results": [
                {
                "iso_3166_1": "GT",
                "release_dates": [
                    {
                    "certification": "A",
                    "descriptors": [],
                    "iso_639_1": "",
                    "note": "",
                    "release_date": "2012-03-02T00:00:00.000Z",
                    "type": 3
                    }
                ]
                },
                {
                "iso_3166_1": "US",
                "release_dates": [
                    {
                    "certification": "id:87a27",
                    "descriptors": [],
                    "iso_639_1": "",
                    "note": "",
                    "release_date": "2019-12-31T00:00:00.000Z",
                    "type": 3
                    }
                ]
                },
                {
                "iso_3166_1": "FR",
                "release_dates": [
                    {
                    "certification": "U",
                    "descriptors": [],
                    "iso_639_1": "",
                    "note": "",
                    "release_date": "2019-12-31T00:00:00.000Z",
                    "type": 3
                    }
                ]
                }
            ]
            } 
#new
@app.get("/movie/5555555")
async def root():
    return {
        "title": "നിയമസഭാ ദിനാചരണം 2023- ഏപ്രില്‍ 25 മുതല്‍",
        "release_date": "2021-03-18",
        "genres": [
            {
                "id": 28,
                "name": "സ്പീക്കർ എ എൻ ഷംസീർ"
            },
            {
                "id": 12,
                "name": "KLA"
            },
            {
                "id": 14,
                "name": "ഓൺലൈൻ മത്സരം"
            }
        ],
        "vote_average": 8.201,
    }


@app.get("/movie/791373")
async def root():
    return {
        "adult": False,
        "backdrop_path": "/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg",
        "belongs_to_collection": None,
        "budget": 70000000,
        "genres": [
            {
                "id": 28,
                "name": "#രജതജൂബിലി"
            },
            {
                "id": 12,
                "name": "#നിയമസഭാ"
            },
            {
                "id": 14,
                "name": "#ആഘോഷം"
            }
        ],
        "homepage": "https://www.hbomax.com/zacksnydersjusticeleague",
        "id": 791373,
        "imdb_id": "tt12361974",
        "original_language": "en",
        "original_title": "aaaaaaaaaaaZack Snyder's Justice League",
        "overview": "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        "popularity": 124.932,
        "poster_path": "/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg",
        "production_companies": [
            {
                "id": 174,
                "logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
                "name": "Warner Bros. Pictures",
                "origin_country": "US"
            },
            {
                "id": 114152,
                "logo_path": None,
                "name": "The Stone Quarry",
                "origin_country": "US"
            },
            {
                "id": 507,
                "logo_path": "/aRmHe6GWxYMRCQljF75rn2B9Gv8.png",
                "name": "Atlas Entertainment",
                "origin_country": "US"
            },
            {
                "id": 103376,
                "logo_path": "/zIFWe4fwWURazXSjz9tF60ihgbH.png",
                "name": "Access Entertainment",
                "origin_country": "US"
            },
            {
                "id": 444,
                "logo_path": None,
                "name": "Dune Entertainment",
                "origin_country": "US"
            },
            {
                "id": 128064,
                "logo_path": "/13F3Jf7EFAcREU0xzZqJnVnyGXu.png",
                "name": "DC Films",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2023/May",
        "revenue": 0,
        "runtime": 242,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "Us united.",
        "title": "നിയമസഭാ മന്ദിരത്തിന്റെ രജതജൂബിലി ആഘോഷത്തോടനുബന്ധിച്ച്",
        "video": False,
        "vote_average": 8.201,
        "vote_count": 9021
    }

if __name__ == "__main__":
    uvicorn.run("example:app", host="127.0.0.1", port=8000, reload=True)
