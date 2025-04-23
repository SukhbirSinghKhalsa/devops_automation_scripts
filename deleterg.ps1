$resourceGroups = az group list --query "[].name" -o tsv
foreach ($rg in $resourceGroups) {
    $test = az group delete --name $rg --no-wait -y
}