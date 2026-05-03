# Arrays of matching app names (dev and QA)
$containerAppsDev = @(
  "container-app-dev"
)

$containerAppsQA = @(
    "container-app-qa"
)

# Resource group names
$devRg = "dev-env-rg"
$qaRg = "qa-rg"

# Loop through both arrays in parallel
for ($i = 0; $i -lt $containerAppsDev.Length; $i++) {
    $devApp = $containerAppsDev[$i]
    $qaApp = $containerAppsQA[$i]

    Write-Host "🔍 Comparing ENV for: $devApp (DEV) vs $qaApp (QA)" -ForegroundColor Cyan

    # Get ENV variable names for both apps
    az containerapp show --name $devApp --resource-group $devRg `
        --query "properties.template.containers[0].env[].name" -o tsv | sort > env_dev.txt

    az containerapp show --name $qaApp --resource-group $qaRg `
        --query "properties.template.containers[0].env[].name" -o tsv | sort > env_qa.txt

    # Compare using diff
    diff -3 --suppress-common-lines env_dev.txt env_qa.txt

}
#remove files after comparision
Remove-Item env_dev.txt
Remove-Item env_qa.txt
