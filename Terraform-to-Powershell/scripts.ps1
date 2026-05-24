cls # clear the console / terminal
# $name = "ssk"
# Write-Host $name

# $age = 26
# Write-Host $age



# Write-Host "Hello we are learning powershell with $($name)"

# $num1 = 10
# $num2 = 20

# # Write-Host "First number $x"
# # Write-Host "Second number $y"

# # arithmatic operations --> + - / *
# # $x + $y # --> 30
# # $x - $y # --> -10
# # $x * $y # --> 200
# # $y / $x # --> 2

# Write-Host "sum of 2 numbers $($num1 + $num2)" # --> 30
# Write-Host "difference of 2 numbers $($num1 - $num2)" # --> -10
# Write-Host "multiplication of 2 numbers $($num1 * $num2)" # --> 200
# Write-Host "division of 2 numbers $($num2 / $num1)" # --> 2

# # comparision operator -->

# # > --> -gt
# # < --> -lt
# # >= --> -ge
# # <= --> -le
# # != --> -ne

# #  $x -gt $y 
# #  $x -lt $y 
# #  $x -ge $y 
# #  $y  -le $x 


# $x = 10
# $y = 20
# Write-Host "greater then in 2 numbers $($x -gt $y)" 

# Write-Host "less then in 2 numbers $($x -lt $y)" 
# Write-Host "greater then  equal to in 2 numbers $($x -ge $y)" 
# Write-Host "less  then equal to in 2 numbers $($y -le $x)" 
# Write-Host "$x not equal to $y $($x -ne $y)" 
# Write-Host "$x not equal to $x $($x -ne $x)" 
# Write-Host "$x equal to $x $($x -eq 10)" 


# #camelCase --> list of resource groups --> listOfResourceGroups (camelCase) --> k8s keys
# # apiVersion, displayName

# # create 5 resource group in azure using powershell
# # $rg1  = "rg-devops-001"
# # $rg2  = "rg-devops-002"
# # $rg3  = "rg-devops-003"
# # $rg4  = "rg-devops-004"
# # $rg5  = "rg-devops-005"


# # collection / array / list 
# #                          0                  1             2                   3               4
# $listOfResourceGroups = "rg-devops-001", "rg-devops-002", "rg-devops-003", "rg-devops-004", "rg-devops-005"

# # Write-Host $listOfResourceGroups

# # Write-Host "before updatation $listOfResourceGroups"
# # $listOfResourceGroups[1] = "rg-devops-006" # changing the Write-Hostnside the list using index
# # Write-Host "after updatation $listOfResourceGroups"

# #  Write-Host $listOfResourceGroups[0]
# #  Write-Host $listOfResourceGroups[1]
# #  Write-Host $listOfResourceGroups[2]
# #  Write-Host $listOfResourceGroups[3]
# #  Write-Host $listOfResourceGroups[4]

# #  foreach ($rg in $listOfResourceGroups) {
# #     Write-Host $rg
# #     Write-Host 0
# #  )

# # foreach (<dummy-var> in <list-var>) {
# # Write-Host <dummy-var>
# # )


# # azure account  --> active subscription 

# $listOfResourceGroups = "rg-devops-001", "rg-devops-002", "rg-devops-003", "rg-devops-004", "rg-devops-005"
# $listOfLocations = "centralindia","eastus", "westus", "centralindia","eastus"

# $count  = 0
# Write-Host "Creating 5 Resource Groups in Azure"
# foreach ($i in $listOfResourceGroups) {
#     Write-Host "creating Resource group with name $i"
#     # syntax example: az group create --location <location> --name <resource-group-name>
#     az group create --location $listOfLocations[$count] --name $i  --output table
#     $count  = $count + 1

# )

# az group list --output table












# ARITHMATIC OPERATORS    + - / *

# $num1 = 10
# $num2 = 20


# Write-Host "Addition: $($num1 + $num2)"       


# Write-Host "Subtraction: $($num1 - $num2)"    



# Write-Host "Multiplication: $($num1 * $num2)" 


# Write-Host "Division: $($num1 / $num2)"    











#   COMPARISION OPERATOR  -ge, -le, -gt, -lt, -ne
# > --> -gt 
# < --> -lt
# >= --> -ge
# <= --> -le
# != --> -ne

# $num1 = 10
# $num2 = 20


# Write-Host "greater than: $($num1 -gt $num2)"


# Write-Host "Less than: $($num1 -lt $num2)"


# Write-Host "Greater than Equal to: $($num1 -ge $num2)"


# Write-Host "Less Than Equal to: $($num1 -le $num2)"


# Write-Host "Not Equal to: $($num1 -ne $num2)"











# # create 5 resource group in azure using powershell
# $rg1  = "rg-devops-001"
# $rg2  = "rg-devops-002"
# $rg3  = "rg-devops-003"
# $rg4  = "rg-devops-004"
# $rg5  = "rg-devops-005"

# # list = comma seperated values
# $listOfResourceGroups = "rg-devops-001", "rg-devops-002", "rg-devops-003", "rg-devops-004","rg-devops-005"

# # Write-Host $listOfResourceGroups
# foreach ($i in $listOfResourceGroups) {
#     Write-Host "$i-ssk-inc"
# }

# Write-Host "checking rg variable after for loop $($i)"





# $listOfResourceGroups = 
# "rg-devops-001", 
# "rg-devops-002", 
# "rg-devops-003",
#  "rg-devops-004",
# "rg-devops-005"

# Write-Host "Creating 5 Resource Groups in Azure"
# foreach ($rg in $listOfResourceGroups) {

#     Write-Host "creating Resource group with name $rg"
#     az group create  --name $rg  --location "centralindia" --output table 
 
#     # syntax example: az group create --location <location> --name <resource-group-name>
# }

$vmlist = az resource list --output table

Write-Host $vmlist


# $person = @{
#     Name  = "John"
#     Age   = 30
#     City  = "Dallas"
#     Role  = "DevOps"
# }
# foreach ($key in $person.Keys) {
#     Write-Host "$key = $($person[$key])"
# }
