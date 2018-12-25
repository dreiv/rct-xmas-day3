import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
// 1. add `react-cache` as a project dependency
// 2. import cache and resource creators from react-cache
import { createCache, createResource } from 'react-cache'

// 3. create a cache
let cache = createCache()

// 4. create a pokemon resource that fetches data
let PokemonCollectionResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json())
)

let PokemonMovesCollectionResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/move/').then(res => res.json())
)

function PokemonListItem({ className, component: Component = 'li', ...props }) {
  return (
    <Component
      className={['pokemon-list-item', className].join(' ')}
      {...props}
    />
  )
}

// 5. pull your resource-reading UI into a component
function PokemonList() {
  return (
    <section>
      <h3>Pokemons:</h3>
      <ul>
        {/* 6. read resource data into and from the cache */}
        {PokemonCollectionResource.read(cache).results.map(({ name }) => (
          <PokemonListItem key={name}>{name}</PokemonListItem>
        ))}
      </ul>
    </section>
  )
}

function PokemonMoves() {
  return (
    <section>
      <h3>Pokemon Moves:</h3>
      <ul>
        {PokemonMovesCollectionResource.read(cache).results.map(({ name }) => (
          <PokemonListItem key={name}>{name}</PokemonListItem>
        ))}
      </ul>
    </section>
  )
}

function App() {
  return (
    <div>
      <h1>
        <span role="img" aria-label="React Holiday Three">
          ⚛️🎄✌️
        </span>
        : Day 3
      </h1>
      {/* 7. wrap your resource-reading component in the Suspense component */}
      {/*    ...and provide a fallback */}
      <Suspense fallback={<div>...loading</div>}>
        <PokemonList />
        <PokemonMoves />
      </Suspense>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
