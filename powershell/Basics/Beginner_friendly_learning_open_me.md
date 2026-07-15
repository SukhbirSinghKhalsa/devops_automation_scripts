# PowerShell Basics for Beginners

Welcome! This guide covers the fundamentals of PowerShell using simple
examples.

------------------------------------------------------------------------

# Comments

## Single-line comment

``` powershell
# This is a single-line comment
```

## Multi-line comment

``` powershell
<#
This is a
multi-line comment.
#>
```

------------------------------------------------------------------------

# Variable Naming Conventions

  Style        Example
  ------------ ---------------
  camelCase    `apiVersion`
  PascalCase   `ApiVersion`
  snake_case   `api_version`

Variables always start with `$`.

``` powershell
$name = "ssk"
$num = 10

$num.GetType()   # Returns the data type
Write-Host $name
```

------------------------------------------------------------------------

# Output

## Write-Host

Prints directly to the console.

``` powershell
Write-Host "Hello World"
```

## Write-Output

Sends output to the PowerShell pipeline.

``` powershell
Write-Output "Hello World"
```

------------------------------------------------------------------------

# Variables

``` powershell
$name = "Azure"
$age = 5
$isActive = $true

Write-Host "Name: $name, Age: $age, Active: $isActive"
```

------------------------------------------------------------------------

# Arithmetic Operators

``` powershell
$a = 10
$b = 3

$a + $b
$a - $b
$a * $b
$a / $b
$a % $b
```

Example:

``` powershell
Write-Host "Addition: $($a + $b)"
Write-Host "Subtraction: $($a - $b)"
Write-Host "Multiplication: $($a * $b)"
Write-Host "Division: $($a / $b)"
Write-Host "Modulus: $($a % $b)"
```

------------------------------------------------------------------------

# Comparison Operators

  Operator   Meaning
  ---------- -----------------------
  `-eq`      Equal
  `-ne`      Not Equal
  `-gt`      Greater Than
  `-lt`      Less Than
  `-ge`      Greater Than or Equal
  `-le`      Less Than or Equal

Example:

``` powershell
$a -eq $b
$a -ne $b
$a -gt $b
$a -lt $b
$a -ge 10
$b -le 3
```

------------------------------------------------------------------------

# Arrays (Collections)

``` powershell
$numbers = 10,20,30,40,50
```

Access elements:

``` powershell
$numbers[0]
$numbers[-1]
$numbers[1..3]
```

Example with strings:

``` powershell
$fruits = @("Apple","Banana","Cherry","Mango")
```

------------------------------------------------------------------------

# Looping through Arrays

## foreach statement

``` powershell
foreach ($fruit in $fruits) {
    Write-Host $fruit
}
```

## ForEach-Object

``` powershell
$fruits | ForEach-Object {
    Write-Host $_
}
```

------------------------------------------------------------------------

# Practical Example

Create multiple Azure Resource Groups.

``` powershell
$arrayOfResourceGroup = "rg-1","rg-2"

foreach ($resourceGroup in $arrayOfResourceGroup) {
    # az group create --name $resourceGroup --location centralindia
}
```

Azure CLI command:

``` powershell
az group create --name "my-resource-group" --location "eastus"
```

------------------------------------------------------------------------

# Hash Tables

Hash tables store key-value pairs.

``` powershell
$person = @{
    Name = "John"
    Age  = 30
    City = "Dallas"
    Role = "DevOps"
}
```

Access values:

``` powershell
$person["Name"]
$person.City
```

Another example:

``` powershell
$hashTable = @{
    name  = "ssk"
    plays = "chess"
    loves = "singing"
    age   = 2025 - 2000
}
```

------------------------------------------------------------------------

# Check if a Key Exists

``` powershell
$person.ContainsKey("Age")
$person.ContainsKey("Email")
```

------------------------------------------------------------------------

# Check if a Value Exists

``` powershell
$person.ContainsValue("Dallas")
$person.ContainsValue("NYC")
```

------------------------------------------------------------------------

# Loop Through a HashTable

``` powershell
foreach ($key in $person.Keys) {
    Write-Host "$key = $($person[$key])"
}
```

------------------------------------------------------------------------

# Beginner Practice Script

``` powershell
$name = "PowerShell"
$numbers = 1,2,3,4,5

Write-Host "Welcome $name"

foreach ($num in $numbers) {
    if ($num -gt 3) {
        Write-Host "$num is greater than 3"
    }
}

$person = @{
    Name = "John"
    City = "Dallas"
}

Write-Host $person.Name
```

------------------------------------------------------------------------

# Summary

You learned:

-   Comments
-   Variables
-   Naming conventions
-   Write-Host vs Write-Output
-   Arithmetic operators
-   Comparison operators
-   Arrays
-   foreach loops
-   HashTables
-   ContainsKey()
-   ContainsValue()
-   Azure CLI Resource Group creation
-   Looping through HashTables

Happy Learning! 🚀
