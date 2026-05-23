#single line comment starts with # symbol
<# 
multi line
comment
starts with <#     ends with #>
 #>


#different notation/ ways to write a variable
#camelCase   --> apiVersion
#PascalCase --> ApiVersion
#snake_case --> api_version

$name = "ssk" #--> variable starts with $ symbol
$num.getType() #--> returns type of variable

#--> to print something on screen use Write-Host
Write-Host $name  


#Declared 2 variables num1, num2 for implementing arithmatic and comparision operations
$num1 = 20
$num2 = 40
# arithmatic
# + / * -
Write-Host "Arithmatic Operators:  + / * -"
$num1 - $num2
$num1 + $num2
$num1 / $num2
$num1 * $num2


#comparision
# -eq -ne -gt -lt -ge - le 
Write-Host "Comparision Operators: -eq -ne -gt -lt -ge - le "
$num2 -eq $num1
$num2 -ne $num1
$num2 -gt $num1
$num2 -lt $num1
$num2 -ge $num1
$num2 -lt $num1


#array =  collection of similar elements  
#collection of strings
$numbers = 10, 20, 30, 40, 50

#access individual elements
$numbers[0]  #-- index starts with 0 for array


#foreach
foreach ($num in $numbers) {
    $num
}


#CREATE 2 RG WITH THE HELP OF FOREACH and Array
$arrayOfResourceGroup = "rg-1","rg-2"
foreach ($resourceGroup in $arrayOfResourceGroup) {
#az resource create --name $resourceGroup -- location centralindia
}

#Hash Table - collection of key value pairs
#syntax @{key=value}
$hashTable = @{
    name = "ssk"
    plays = "chess"
    loves = "singing"
    age   = 2025 - 2000
}
$hashTable["name"]
$hashTable["plays"]
$hashTable["loves"]
$hashTable["age"]

# check presence of particular key 
$hashTable.ContainsKey("name")
$hashTable.ContainsKey("dependency")

