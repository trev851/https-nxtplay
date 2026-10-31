# NXTPLAY

A Stremio addon that lists movies and TV shows on **Netflix, Prime Video, Disney+ and HBO Max**, with genre filters, search, and scrolling. Data comes from TMDB.

NXTPLAY is a catalog only. It shows what's on each service, and your other Stremio addons provide the streams.

## Install

- **Addon page:** https://https-nxtplay.onrender.com
- **Manifest link:** https://https-nxtplay.onrender.com/manifest.json
- **Open in Stremio:** stremio://https-nxtplay.onrender.com/manifest.json

To install by hand, open Stremio, go to **Addons**, paste the manifest link into the search box, and tap **Install**. If you installed an earlier version, remove it first and install again so the new catalogs show up.

## Catalogs

| Service | Movies | TV shows |
|---|---|---|
| Netflix | Netflix Movies | Netflix TV Shows |
| Prime Video | Prime Video Movies | Prime Video TV Shows |
| Disney+ | Disney+ Movies | Disney+ TV Shows |
| HBO Max | HBO Max Movies | HBO Max TV Shows |

Each catalog has genre filters and search. You'll find them under **Discover** in Stremio.

## manifest.json

```json
{
  "id": "community.nxtplay",
  "version": "1.1.0",
  "name": "NXTPLAY",
  "description": "Netflix, Prime Video, Disney+ and HBO Max movies and TV shows (US)",
  "resources": [
    "catalog"
  ],
  "types": [
    "movie",
    "series"
  ],
  "catalogs": [
    {
      "type": "movie",
      "id": "netflix",
      "name": "Netflix Movies",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Thriller",
            "War",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "series",
      "id": "netflix",
      "name": "Netflix TV Shows",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action & Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Kids",
            "Mystery",
            "Reality",
            "Sci-Fi & Fantasy",
            "Soap",
            "Talk",
            "War & Politics",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "movie",
      "id": "prime",
      "name": "Prime Video Movies",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Thriller",
            "War",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "series",
      "id": "prime",
      "name": "Prime Video TV Shows",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action & Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Kids",
            "Mystery",
            "Reality",
            "Sci-Fi & Fantasy",
            "Soap",
            "Talk",
            "War & Politics",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "movie",
      "id": "disney",
      "name": "Disney+ Movies",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Thriller",
            "War",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "series",
      "id": "disney",
      "name": "Disney+ TV Shows",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action & Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Kids",
            "Mystery",
            "Reality",
            "Sci-Fi & Fantasy",
            "Soap",
            "Talk",
            "War & Politics",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "movie",
      "id": "hbo",
      "name": "HBO Max Movies",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action",
            "Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Music",
            "Mystery",
            "Romance",
            "Science Fiction",
            "Thriller",
            "War",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    },
    {
      "type": "series",
      "id": "hbo",
      "name": "HBO Max TV Shows",
      "extra": [
        {
          "name": "genre",
          "options": [
            "Action & Adventure",
            "Animation",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Kids",
            "Mystery",
            "Reality",
            "Sci-Fi & Fantasy",
            "Soap",
            "Talk",
            "War & Politics",
            "Western"
          ],
          "isRequired": false
        },
        {
          "name": "search",
          "isRequired": false
        },
        {
          "name": "skip",
          "isRequired": false
        }
      ]
    }
  ],
  "behaviorHints": {
    "configurable": false
  }
}
```

## Files

| File | Purpose |
|---|---|
| `server.js` | The addon server (no dependencies) |
| `package.json` | Tells Render how to start it |
| `render.yaml` | Optional Render blueprint |

## Hosting on Render

1. Build command: `npm install`
2. Start command: `npm start`
3. Environment variables:
   - `TMDB_API_KEY` (required): a free key from themoviedb.org under Settings > API
   - `REGION` (optional, default `US`): a country code such as `US`, `GB`, `CA` or `BS`. Each service's library differs by country, and some services aren't offered everywhere.
   - `PROVIDER_PRIME`, `PROVIDER_DISNEY`, `PROVIDER_HBO`, `PROVIDER_NETFLIX` (optional): override a TMDB provider id if a service ever shows an empty catalog.

## Notes

- Health check: https://https-nxtplay.onrender.com/health
- On Render's free plan the service sleeps after about 15 minutes idle. The first request afterward can take 30 to 60 seconds. Pinging `/health` every 10 minutes keeps it awake.
- This product uses the TMDB API but is not endorsed or certified by TMDB. It is not affiliated with Netflix, Amazon, Disney or HBO.
