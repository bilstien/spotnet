/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

<<<<<<< HEAD
import { Route as rootRoute } from "./routes/__root";
import { Route as TradeImport } from "./routes/trade";
import { Route as ResetpasswordImport } from "./routes/reset_password";
import { Route as PoolImport } from "./routes/pool";
import { Route as IndexImport } from "./routes/index";
=======
import { Route as rootRoute } from './routes/__root'
import { Route as TradeImport } from './routes/trade'
import { Route as PoolImport } from './routes/pool'
import { Route as ChangePasswordImport } from './routes/change-password'
import { Route as IndexImport } from './routes/index'
>>>>>>> upstream/main

// Create/Update Routes

const TradeRoute = TradeImport.update({
  id: "/trade",
  path: "/trade",
  getParentRoute: () => rootRoute,
} as any);

const ResetpasswordRoute = ResetpasswordImport.update({
  id: "/reset_password",
  path: "/reset_password",
  getParentRoute: () => rootRoute,
} as any);


const PoolRoute = PoolImport.update({
  id: "/pool",
  path: "/pool",
  getParentRoute: () => rootRoute,
} as any);

const ChangePasswordRoute = ChangePasswordImport.update({
  id: '/change-password',
  path: '/change-password',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
<<<<<<< HEAD
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/pool": {
      id: "/pool";
      path: "/pool";
      fullPath: "/pool";
      preLoaderRoute: typeof PoolImport;
      parentRoute: typeof rootRoute;
    };
    "/reset_password": {
      id: "/reset_password";
      path: "/reset_password";
      fullPath: "/reset_password";
      preLoaderRoute: typeof ResetpasswordImport;
      parentRoute: typeof rootRoute;
    };
    "/trade": {
      id: "/trade";
      path: "/trade";
      fullPath: "/trade";
      preLoaderRoute: typeof TradeImport;
      parentRoute: typeof rootRoute;
    };
=======
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/change-password': {
      id: '/change-password'
      path: '/change-password'
      fullPath: '/change-password'
      preLoaderRoute: typeof ChangePasswordImport
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
>>>>>>> upstream/main
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
<<<<<<< HEAD
  "/": typeof IndexRoute;
  "/pool": typeof PoolRoute;
  "/reset_password": typeof ResetpasswordRoute;
  "/trade": typeof TradeRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/pool": typeof PoolRoute;
  "/reset_password": typeof ResetpasswordRoute;
  "/trade": typeof TradeRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/pool": typeof PoolRoute;
  "/reset_password": typeof ResetpasswordRoute;
  "/trade": typeof TradeRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/pool" | "/reset_password" | "/trade";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/pool" | "/reset_password" | "/trade";
  id: "__root__" | "/" | "/pool" | "/reset_password" | "/trade";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  PoolRoute: typeof PoolRoute;
  ResetpasswordRoute: typeof ResetpasswordRoute;
  TradeRoute: typeof TradeRoute;
=======
  '/': typeof IndexRoute
  '/change-password': typeof ChangePasswordRoute
  '/pool': typeof PoolRoute
  '/trade': typeof TradeRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/change-password': typeof ChangePasswordRoute
  '/pool': typeof PoolRoute
  '/trade': typeof TradeRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/change-password': typeof ChangePasswordRoute
  '/pool': typeof PoolRoute
  '/trade': typeof TradeRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/change-password' | '/pool' | '/trade'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/change-password' | '/pool' | '/trade'
  id: '__root__' | '/' | '/change-password' | '/pool' | '/trade'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChangePasswordRoute: typeof ChangePasswordRoute
  PoolRoute: typeof PoolRoute
  TradeRoute: typeof TradeRoute
>>>>>>> upstream/main
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChangePasswordRoute: ChangePasswordRoute,
  PoolRoute: PoolRoute,
  ResetpasswordRoute: ResetpasswordRoute,
  TradeRoute: TradeRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/change-password",
        "/pool",
        "/reset_password",
        "/trade"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/change-password": {
      "filePath": "change-password.tsx"
    },
    "/pool": {
      "filePath": "pool.tsx"
    },
    "/reset_password": {
      "filePath": "reset_password.tsx"
    },
    "/trade": {
      "filePath": "trade.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
