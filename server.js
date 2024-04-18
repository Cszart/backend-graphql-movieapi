import { ApolloServer, gql } from "apollo-server";

// GraphQL Schema
const typeDefs = gql`
  type Torrent {
    url: String!
    hash: String!
    quality: String!
    type: String!
    is_repack: String!
    video_codec: String!
    bit_depth: String!
    audio_channels: String!
    seeds: Int!
    peers: Int!
    size: String!
    size_bytes: Int!
    date_uploaded: String!
    date_uploaded_unix: Int!
  }

  type Movie {
    id: Int
    url: String!
    imdb_code: String
    title: String!
    title_english: String!
    title_long: String!
    slug: String
    year: Int!
    rating: Float
    runtime: Float
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
    state: String
    torrents: [Torrent]
    date_uploaded: String
    date_uploaded_unix: Int
  }

  type Query {
    allMovies: [Movie]!
    movie(id: String!): Movie
  }
`;

const resolvers = {
  Query: {
    allMovies() {
      console.log("All movies EP called");
      return fetch("https://yts.mx/api/v2/list_movies.json")
        .then((r) => r.json())
        .then((json) => json.data.movies);
    },
    movie(_, { id }) {
      return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        .then((r) => r.json())
        .then((json) => json.data.movie);
    },
  },
};

// Server definition
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
