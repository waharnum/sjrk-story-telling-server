#!/bin/sh -eu

# Wait for CouchDB
sleep 5
curl -sS --retry 30 --retry-delay 2 --retry-connrefused "$COUCHDB_URL"

# Setup CouchDB (http://docs.couchCOUCHDB_URL.org/en/latest/install/setup.html)
for db in "_users _replicator _global_changes"; do
  if ! curl "$COUCHDB_URL/$db"; then
    curl -fsS -X PUT "${COUCHDB_URL}/$db"
  fi
done

# Setup database
node ./src/js/db/dbSetup.js
