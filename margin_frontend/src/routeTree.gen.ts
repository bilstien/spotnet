/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TradeImport } from './routes/trade'
import { Route as PoolImport } from './routes/pool'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TradeRoute = TradeImport.update({
  id: '/trade',
  path: '/trade',
  getParentRoute: () => rootRoute,
} as any)

const PoolRoute = PoolImport.update({
  id: '/pool',
  path: '/pool',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/pool': {
      id: '/pool'
      path: '/pool'
      fullPath: '/pool'
      preLoaderRoute: typeof PoolImport
      parentRoute: typeof rootRoute
    }
    '/trade': {
      id: '/trade'
      path: '/trade'
      fullPath: '/trade'
      preLoaderRoute: typeof TradeImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/pool': typeof PoolRoute
  '/trade': typeof TradeRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/pool': typeof PoolRoute
  '/trade': typeof TradeRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/pool': typeof PoolRoute
  '/trade': typeof TradeRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/pool' | '/trade'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/pool' | '/trade'
  id: '__root__' | '/' | '/pool' | '/trade'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PoolRoute: typeof PoolRoute
  TradeRoute: typeof TradeRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PoolRoute: PoolRoute,
  TradeRoute: TradeRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/pool",
        "/trade"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/pool": {
      "filePath": "pool.tsx"
    },
    "/trade": {
      "filePath": "trade.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
