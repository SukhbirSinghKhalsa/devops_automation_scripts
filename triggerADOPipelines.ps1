$organization = "https://dev.azure.com/Group34stars/"
$project = "Basics"
$id = 2
$fileName = "yaml_input_files"

Write-Output @"
Organization = $organization
Project = $project
fileId = $id
FileName = $fileName
"@

Write-Output "Triger yaml file $fileName in 3 2 1 ..."

# $Output = az pipelines run --organization=$organization --project=$project --name=$fileName | ConvertFrom-Json
$Output = az pipelines run --organization=$organization --project=$project --name=$fileName 

Write-Output @"
Successfully triggered pipleine at $($Output.url)
By $($Output.requestedBy.displayName)
"@
