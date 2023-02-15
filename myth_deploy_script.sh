#!/usr/bin/env bash

JQ="/afs/.ir/class/cs45/jq"
AUTHCODE_LOCATION="/afs/.ir/class/cs45/deploy/deploy_code"
DEPLOY_ROOT="/afs/.ir/class/cs45/deploy"
OUTPUT="/afs/.ir/class/cs45/WWW"

printf "Content-Type: text/plain\r\n";
printf "\r\n";

if [[ -z "$HTTP_X_AUTH_CODE" ]]; then
  printf "Auth code must be provided\r\n";
  exit 1;
fi

if [[ "$HTTP_X_AUTH_CODE" != "$(cat $AUTHCODE_LOCATION)" ]]; then
  printf "Unauthorized\r\n";
  exit 1;
fi

if [[ -z "$HTTP_X_URL" ]]; then
  printf "Must provide download URL\r\n";
  exit 1;
fi

# Read all stdin and echo back
cat

curl -Lvo "$DEPLOY_ROOT/deploy.zip" "$HTTP_X_URL" 2>&1

mkdir -p "$DEPLOY_ROOT/deploy_unzip"
unzip "$DEPLOY_ROOT/deploy.zip" -d "$DEPLOY_ROOT/deploy_unzip" 2>&1 && \
  rsync -a --delete "$DEPLOY_ROOT/deploy_unzip/" "$OUTPUT/" 2>&1;

if [[ $? -ne 0 ]]; then
  printf "Failed\r\n";
  exit 1;
fi

rm -rf "$DEPLOY_ROOT/deploy_unzip" "$DEPLOY_ROOT/deploy.zip";


printf "Deployed\r\n";
exit 0


#### TO SET UP
# Make sure to add write permissions to the CGI script for WWW
# fs setacl $OUTPUT -acl class-cs45-1234.cgi rlidwk
# Make sure these permissions are set for subdirectories as well.