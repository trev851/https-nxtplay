# NXTPLAY

A Stremio addon with movie and TV show catalogs for **Netflix, Prime Video, Disney+, HBO Max, Hulu, Paramount+ and Apple TV+**, with genre filters, search, and scrolling. Data comes from TMDB.

NXTPLAY lists what's on each service and provides title details (including episode lists) as a backup when Cinemeta isn't available. Your other Stremio addons provide the streams.

## Install everything in one addon

**Manifest link:** https://https-nxtplay.onrender.com/v3/all/manifest.json

**Open in Stremio:** stremio://https-nxtplay.onrender.com/v3/all/manifest.json

**Addon page (tap to install):** https://https-nxtplay.onrender.com

To install by hand, open Stremio, go to **Addons**, paste the manifest link into the search box, and tap **Install**. This one addon includes all 14 catalogs (Movies and TV Shows for each of the 7 services). You'll find them under **Discover**.

> Install either the all-in-one addon *or* the single-service addons below, not both, or every catalog will show up twice.

## Or install one service at a time

| Service | Manifest link |
|---|---|
| Netflix | https://https-nxtplay.onrender.com/v3/netflix/manifest.json |
| Prime Video | https://https-nxtplay.onrender.com/v3/prime/manifest.json |
| Disney+ | https://https-nxtplay.onrender.com/v3/disney/manifest.json |
| HBO Max | https://https-nxtplay.onrender.com/v3/hbo/manifest.json |
| Hulu | https://https-nxtplay.onrender.com/v3/hulu/manifest.json |
| Paramount+ | https://https-nxtplay.onrender.com/v3/paramount/manifest.json |
| Apple TV+ | https://https-nxtplay.onrender.com/v3/apple/manifest.json |

## If a catalog looks blank or out of date

Stremio can keep an old saved copy of an addon. To get past it, uninstall the addon, close and reopen the app, and install again using a link with a new number in it. The server ignores the number, so `/v3/`, `/v4/` and `/v5/` all work, but Stremio treats each one as a brand-new address.

## manifest.json (all services)

```json
{
  "id": "community.nxtplay.all",
  "version": "1.7.1",
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
   - `REGION` (optional, default `US`): a country code such as `US`, `GB`, `CA` or `BS`.
   - `FALLBACK_REGION` (optional, default `US`): used when your region has no listings for a service. Set to `NONE` to turn it off.
   - `PROVIDER_NETFLIX`, `PROVIDER_PRIME`, `PROVIDER_DISNEY`, `PROVIDER_HBO`, `PROVIDER_HULU`, `PROVIDER_PARAMOUNT`, `PROVIDER_APPLE` (optional): override the TMDB provider id(s) for a service. Separate several ids with commas.

## Troubleshooting

- Version and health check: https://https-nxtplay.onrender.com/health
- See how many titles TMDB lists per service: https://https-nxtplay.onrender.com/debug
- Test a catalog directly in a browser, for example: https://https-nxtplay.onrender.com/paramount/catalog/movie/paramount.json
- On Render's free plan the service sleeps after about 15 minutes idle. The first request afterward can take 30 to 60 seconds, and a catalog may look blank until you open it again. Pinging `/health` every 10 minutes keeps it awake.

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB. It is not affiliated with Netflix, Amazon, Disney, HBO, Hulu, Paramount or Apple.
