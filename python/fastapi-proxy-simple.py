simple have all contents

# from fastapi import FastAPI, Request
# import httpx, requests

# app = FastAPI()

# # Your MovieDB API base URL
# MOVIEDB_BASE_URL = "https://api.themoviedb.org/3/"

# # Your MovieDB API key
# MOVIEDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzJkNGNjMTUxOWNmZTY1NTdkOGVjOWU2MGIxMTRlZSIsInN1YiI6IjY0YjdjZTQ0YjFmNjhkMDBjOGZmYTBmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tf2gXhv6cr2zWc2U671ZVKSF7Pt6oMOEu8X5dUmDQVM"

# @app.get("/{proxy_path:path}")
# async def proxy_to_moviedb(proxy_path: str, request: Request):
#     # Extract the URL parameters from the client request
#     url = f"{MOVIEDB_BASE_URL}{proxy_path}"
#     query_params = request.query_params
#     api_key_param = {"api_key": MOVIEDB_API_KEY}
#     headers = request.headers

#     async with httpx.AsyncClient() as client:
#         try:
#             # Make the proxy request to the MovieDB API
#             # response = await client.get(url, params={**query_params, **api_key_param}, headers=headers)

#             # # Prepare the response to forward it back to the client
#             # content_type = response.headers.get("content-type", "application/json")


#             payload = {}
#             headers = {
#             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzJkNGNjMTUxOWNmZTY1NTdkOGVjOWU2MGIxMTRlZSIsInN1YiI6IjY0YjdjZTQ0YjFmNjhkMDBjOGZmYTBmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tf2gXhv6cr2zWc2U671ZVKSF7Pt6oMOEu8X5dUmDQVM',
#             'accept': 'application/json'
#             }

#             response = requests.request("GET", url, headers=headers, data=payload)
#             print(">>>",url)
#             FOLDER_PATH='json_folder/' 
#             WRITE_PATH = FOLDER_PATH + (proxy_path.replace("/", "-")) + '.json'
#             with open(WRITE_PATH, 'wb') as outf:
#                 outf.write(response.content)
#                 print("WRITE_PATH::",WRITE_PATH)
#             return response.content, response.status_code

#         except httpx.HTTPError as exc:
#             return exc.response.content, exc.response.status_code, exc.response.headers

# if __name__ == "__main__":
#     uvicorn.run("example:app", host="127.0.0.1", port=8000, reload=True)


# # import requests

# # url = "https://api.themoviedb.org/3/movie/popular"

# # payload = {}
# # headers = {
# #   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzJkNGNjMTUxOWNmZTY1NTdkOGVjOWU2MGIxMTRlZSIsInN1YiI6IjY0YjdjZTQ0YjFmNjhkMDBjOGZmYTBmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tf2gXhv6cr2zWc2U671ZVKSF7Pt6oMOEu8X5dUmDQVM',
# #   'accept': 'application/json'
# # }

# # response = requests.request("GET", url, headers=headers, data=payload)

# # print(response.text)


