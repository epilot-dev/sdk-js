#!/bin/bash

# Script to publish all client packages individually with OTP
# Usage: ./publish-clients.sh

set -e

# List of all client directories
CLIENTS=(
  "access-token-client"
  "address-client"
  "address-suggestions-client"
  "app-client"
  "audit-logs-client"
  "automation-client"
  "billing-client"
  "blueprint-manifest-client"
  "consent-client"
  "customer-portal-client"
  "deduplication-client"
  "design-client"
  "discussion-client"
  "document-client"
  "email-settings-client"
  "email-template-client"
  "entity-client"
  "entity-mapping-client"
  "erp-integration-client"
  "file-client"
  "journey-client"
  "kanban-client"
  "message-client"
  "metering-client"
  "notes-client"
  "notification-client"
  "organization-client"
  "partner-directory-client"
  "permissions-client"
  "pricing-client"
  "pricing-tier-client"
  "sandbox-client"
  "submission-client"
  "targeting-client"
  "template-variables-client"
  "user-client"
  "validation-rules-client"
  "webhooks-client"
  "workflow-client"
  "workflow-definition-client"
)

SUCCESS_COUNT=0
FAILED_COUNT=0
FAILED_PACKAGES=()

# Publish each client
for CLIENT in "${CLIENTS[@]}"; do
  echo "=================================================="
  echo "Publishing $CLIENT..."
  echo "=================================================="

  cd "clients/$CLIENT"

  # Build the package first
  if npm run build; then
    echo "✓ Build successful for $CLIENT"

    # Get fresh OTP before publishing
    echo "Getting fresh OTP token..."
    OTP=$(totp npm)
    if [ -z "$OTP" ]; then
      echo "✗ Failed to get OTP token for $CLIENT"
      ((FAILED_COUNT++))
      FAILED_PACKAGES+=("$CLIENT")
      cd ../..
      continue
    fi

    # Publish with OTP
    if npm publish --otp="$OTP"; then
      echo "✓ Successfully published $CLIENT"
      ((SUCCESS_COUNT++))
    else
      echo "✗ Failed to publish $CLIENT"
      ((FAILED_COUNT++))
      FAILED_PACKAGES+=("$CLIENT")
    fi
  else
    echo "✗ Build failed for $CLIENT"
    ((FAILED_COUNT++))
    FAILED_PACKAGES+=("$CLIENT")
  fi

  cd ../..
  echo ""

  # Add a small delay to avoid rate limiting
  sleep 2
done

echo "=================================================="
echo "Publishing Summary"
echo "=================================================="
echo "Total packages: ${#CLIENTS[@]}"
echo "Successfully published: $SUCCESS_COUNT"
echo "Failed: $FAILED_COUNT"

if [ $FAILED_COUNT -gt 0 ]; then
  echo ""
  echo "Failed packages:"
  for PKG in "${FAILED_PACKAGES[@]}"; do
    echo "  - $PKG"
  done
  exit 1
fi

echo ""
echo "✓ All packages published successfully!"
