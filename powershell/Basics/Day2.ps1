# ============================================
# PowerShell Basics - Quick Reference Script
# ============================================

# --- Variables ---
$name = "Azure"
$age = 5
$isActive = $true

Write-Host "Name: $name, Age: $age, Active: $isActive"

# --- Output Statement ---
Write-Host "This is Write-Host (prints to console)"
Write-Output "This is Write-Output (sends to pipeline)"

# --- Arithmetic Operators ---
$a = 10
$b = 3

Write-Host "Addition: $($a + $b)"       # 13
Write-Host "Subtraction: $($a - $b)"    # 7
Write-Host "Multiplication: $($a * $b)" # 30
Write-Host "Division: $($a / $b)"       # 3.33
Write-Host "Modulus: $($a % $b)"        # 1

# --- Comparison Operators ---
Write-Host "Equal: $($a -eq $b)"              # False
Write-Host "Not Equal: $($a -ne $b)"          # True
Write-Host "Greater Than: $($a -gt $b)"       # True
Write-Host "Less Than: $($a -lt $b)"          # False
Write-Host "Greater or Equal: $($a -ge 10)"   # True
Write-Host "Less or Equal: $($b -le 3)"       # True

# --- Collection (Array) ---
$fruits = @("Apple", "Banana", "Cherry", "Mango")

# Print entire collection
Write-Host "All Fruits: $fruits"

# Access collection value by index
Write-Host "First Fruit: $($fruits[0])"
Write-Host "Last Fruit: $($fruits[-1])"
Write-Host "Second and Third: $($fruits[1..2])"

# --- HashTable ---
$person = @{
    Name  = "John"
    Age   = 30
    City  = "Dallas"
    Role  = "DevOps"
}

# Print entire HashTable
Write-Host "Full HashTable:"
$person

# Print value of a particular key
Write-Host "Name: $($person["Name"])"
Write-Host "City: $($person.City)"

# FindKey - ContainsKey
Write-Host "Contains key 'Age': $($person.ContainsKey("Age"))"         # True
Write-Host "Contains key 'Email': $($person.ContainsKey("Email"))"     # False

# FindValue - ContainsValue
Write-Host "Contains value 'Dallas': $($person.ContainsValue("Dallas"))"   # True
Write-Host "Contains value 'NYC': $($person.ContainsValue("NYC"))"         # False

# --- Az Command to Create Resource Group ---
# az group create --name "my-resource-group" --location "eastus"

# --- ForEach with Array/Collection ---
# Method 1: ForEach-Object (pipeline)
Write-Host "--- ForEach-Object (pipeline) ---"
$fruits | ForEach-Object { Write-Host "Fruit: $_" }

# Method 2: foreach statement
Write-Host "--- foreach statement ---"
foreach ($fruit in $fruits) {
    Write-Host "Fruit: $fruit"
}

# ForEach with HashTable
Write-Host "--- ForEach with HashTable ---"
foreach ($key in $person.Keys) {
    Write-Host "$key = $($person[$key])"
}
