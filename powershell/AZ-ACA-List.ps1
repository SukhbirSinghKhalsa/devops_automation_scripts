$resourceGroup = <"repalce rg name" >

az containerapp list --resource-group $resourceGroup --query "[].name" -o tsv | ForEach-Object {
    $app = $_
    $status = az containerapp revision list `
        --name $app `
        --resource-group $resourceGroup `
        --query "sort_by(@, &properties.createdTime)[-1].{Image:properties.template.containers[0].image, Status:properties.runningState}" `
        -o tsv
    Write-Output "$app                     $($status)"
}
