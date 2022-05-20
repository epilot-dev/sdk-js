#!/bin/sh

##
# openapicmd wrapper to update client openapi files from client packages.
#
# npm usage: npm run openapi <path-to-openapi.yml>
# direct usage: ./update-openapi.sh <default_source> <source> <output>
#
# requires jq to be installed
##

set -e

default_source=$1
input_source=$2
output_file=$3

# get server from default source
server=$(npx openapi read --json ${default_source} | jq -r '.servers[0].url')

# update client openapi file
npx openapi read \
  --json ${input_source:-$default_source} \
  --server ${server} \
> ${output_file:-./src/openapi.json}