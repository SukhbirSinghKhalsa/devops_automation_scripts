# # Variable Declare & Initialize

# variable "name" {
#   default = "devops team"
# }
# variable "age" {
#   default = 30
# }




# # String Interpolation
# variable "name1" { default = "DevOps B17 Batch" }
# #String Interpolation
# output "print_to_console" {
#   value = "Hello we are learning powershell with ${var.name}"
# }






# #OUTPUT TO CONSOLE
# output "print_to_console" {
#   value = "Hello we are learning powershell"
# }






# ARITHMATIC OPERATORS


# variable "num1" { default = 10 }
# variable "num2" { default = 20 }


# output "add" {
#   value = "Addition: ${var.num1 + var.num2}"
# }
# output "subtract" {
#   value = "Subtraction: ${var.num1 - var.num2}"
# }
# output "multiple" {
#   value = "Multiplication: ${var.num1 * var.num2}"
# }
# output "dision" {
#   value = "Division: ${var.num1 / var.num2}"
# }




# # COMPARISION OPERATORS

# variable "num1" { default = 18 }
# variable "num2" { default = 20 }


# output "greaterthan" {
#   value = "greater than: ${var.num1 > var.num2}"
# }
# output "lessthan" {
#   value = "Less than: ${var.num1 < var.num2}"
# }
# output "greaterthanequalto" {
#   value = "Greater than Equal to: ${var.num1 >= var.num2}"
# }
# output "lessthanequalto" {
#   value = "Less Than Equal to: ${var.num1 <= var.num2}"
# }
# output "notequalto" {
#   value = "Not Equal to: ${var.num1 != var.num2}"
# }
# output "equalto" {
#   value = "Equal to: ${var.num1 == 18}"
# }




# FOREACH Iteration
# variable "rg1" {
#   default = "rg-devops-001"
# }
# variable "rg2" {
#   default = "rg-devops-002"
# }
# variable "rg3" {
#   default = "rg-devops-003"
# }
# variable "rg4" {
#   default = "rg-devops-004"
# }
# variable "rg5" {
#   default = "rg-devops-005"
# }

# variable "listOfResourceGroups" {
#   default = [
#     "rg-devops-001",
#     "rg-devops-002",
#     "rg-devops-003",
#     "rg-devops-004",
#     "rg-devops-005"
#   ]
# }

# output "all" {
#     value = var.listOfResourceGroups
# }

# # not able to append to all elements of list
# output "individual" {
#     value ="Resource group ${var.listOfResourceGroups[0]}"
# }

# output "allwithresourcegroup" {
#   value = [
#     for rg in toset(var.listOfResourceGroups) :
#     "Resource Group: ${rg} test"
#   ]
# }


provider "azurerm" {
  features {}
}


# # creating 5 resources in azure with terraform + for_each + list
variable "listOfResourceGroups" {
  default = [
    "rg-devops-001",
    "rg-devops-002",
    "rg-devops-003",
    "rg-devops-004",
    "rg-devops-005"
  ]
}

resource "azurerm_resource_group" "rg" {
  for_each = toset(var.listOfResourceGroups)
  name     = each.key
  location = "centralindia"
}
