## This Powershell snippet is used to create 5 resource groups in azure with help of az command combined with foreach loop, list and custom counter

$listOfResourceGroups = "rg-devops-001", "rg-devops-002", "rg-devops-003", "rg-devops-004", "rg-devops-005"
$listOfLocations = "centralindia","eastus", "westus", "centralindia","eastus"

$count  = 0
Write-Host "Creating 5 Resource Groups in Azure"
foreach ($i in $listOfResourceGroups) {
    Write-Host "creating Resource group with name $i"
    # syntax example: az group create --location <location> --name <resource-group-name>
    az group create --location $listOfLocations[$count] --name $i  --output table
    $count  = $count + 1

}

az group list --output table
