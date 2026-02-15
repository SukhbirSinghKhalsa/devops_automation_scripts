#!/bin/bash
# Get all subscriptions
for sub in $(az account list --query "[].id" -o tsv); do #subscription id iteration
    echo "Subscription: $sub"
     az account set --subscription "$sub"
    # Get all key vault names in this subscription
    for kv in $(az keyvault list --subscription "$sub" --query "[].name" -o tsv); do  #keyvault name iteration
        echo "Keyvault: $kv"
        # Run your command
        az keyvault show --name "$kv" --query "properties.accessPolicies" #access policies output
    done
done
