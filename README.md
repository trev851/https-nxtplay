# NXTPLAY

A Stremio addon with movie and TV show catalogs for **Netflix, Prime Video, Disney+, HBO Max, Hulu, Paramount+ and Apple TV+**, with genre filters, search, and scrolling. Data comes from TMDB.

NXTPLAY lists what's on each service and provides title details (including episode lists) as a backup when Cinemeta isn't available. Your other Stremio addons provide the streams.

## Install

- **Addon page (tap a service to install it):** https://https-nxtplay.onrender.com
- **All services in one addon:** https://https-nxtplay.onrender.com/all/manifest.json
- **Open in Stremio:** stremio://https-nxtplay.onrender.com/all/manifest.json

To install by hand, open Stremio, go to **Addons**, paste a manifest link into the search box, and tap **Install**.

## One addon per service

| Service | Manifest link |
|---|---|
| Netflix | https://https-nxtplay.onrender.com/netflix/manifest.json |
| Prime Video | https://https-nxtplay.onrender.com/prime/manifest.json |
| Disney+ | https://https-nxtplay.onrender.com/disney/manifest.json |
| HBO Max | https://https-nxtplay.onrender.com/hbo/manifest.json |
| Hulu | https://https-nxtplay.onrender.com/hulu/manifest.json |
| Paramount+ | https://https-nxtplay.onrender.com/paramount/manifest.json |
| Apple TV+ | https://https-nxtplay.onrender.com/apple/manifest.json |

Each one has a Movies catalog and a TV Shows catalog, both with genre filters and search. You'll find them under **Discover** in Stremio.

If you installed an earlier version, uninstall it and install it again so Stremio picks up the new catalogs.

## manifest.json (all services)

```json
{
  "id": "community.nxtplay.all",
  "version": "1.5.0",
  "name": "NXTPLAY",
  "description": "Netflix, Prime Video, Disney+, HBO Max, Hulu, Paramount+ and Apple TV+ movies and TV shows (US)",
  "resources": [
    "catalog",
    "meta"
  ],
  "idPrefixes": [
    "tt"
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
    },
    {
      "type": "movie",
      "id": "hulu",
      "name": "Hulu Movies",
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
      "id": "hulu",
      "name": "Hulu TV Shows",
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
      "id": "paramount",
      "name": "Paramount+ Movies",
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
      "id": "paramount",
      "name": "Paramount+ TV Shows",
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
      "id": "apple",
      "name": "Apple TV+ Movies",
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
      "id": "apple",
      "name": "Apple TV+ TV Shows",
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
   - `REGION` (optional, default `US`): a country code such as `US`, `GB`, `CA` or `BS`. Each service's library differs by country, and some services aren't offered everywhere (Hulu, for example, is mainly US).
   - `PROVIDER_NETFLIX`, `PROVIDER_PRIME`, `PROVIDER_DISNEY`, `PROVIDER_HBO`, `PROVIDER_HULU`, `PROVIDER_PARAMOUNT`, `PROVIDER_APPLE` (optional): override a TMDB provider id if a service ever shows an empty catalog.

## Notes

- Health check (also shows the running version): https://https-nxtplay.onrender.com/health
- On Render's free plan the service sleeps after about 15 minutes idle. The first request afterward can take 30 to 60 seconds. Pinging `/health` every 10 minutes keeps it awake.
- This product uses the TMDB API but is not endorsed or certified by TMDB. It is not affiliated with Netflix, Amazon, Disney, HBO, Hulu, Paramount or Apple.
