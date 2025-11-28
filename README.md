# devops_automation_scripts

A collection of automation scripts (PowerShell & CMD) used for daily DevOps tasks such as Azure resource cleanup, Terraform module scaffolding, and Azure DevOps pipeline automation.


## 🔍 Overview
This repository contains small automation utilities used across Azure, Terraform, and Azure DevOps processes.
Most scripts are designed to run locally or in a CI/CD environment.
Always review the script logic before running on production systems.

## 📂 Scripts

### PowerShell (.ps1)
- **Delete-Resource-Groups.ps1 [⚠️ Destructive — use carefully.]**  
  - Deletes Azure Resource Groups automatically. Useful for cleaning non-prod or sandbox environments.
  - It is used by me when I was assigned a task to keep the $200 shared cloud portal for group of 30 people, I triggred this script every night at 12AM to remove all the resource groups from azure account
  

- **AZ-ACA-List.ps1**  
  Lists Azure account/container/context information (inferred).

- **Compare-Env-ACA.ps1**  
  Compares environment configurations or access details across environments.

- **PowerShell_Script.ps1**  
  General-purpose PowerShell helper script.

- **TriggerADOPipelines.ps1**  
  Triggers Azure DevOps pipelines programmatically via REST API. Requires a PAT.

### CMD / Batch (.cmd)
- **Create-Module-Terraform.cmd**  
  - Creates a standard Terraform module folder structure.
  - These script was used for creating a basic root child module structure of terraform
𝐬𝐞𝐭        - to store the file names   
𝐞𝐜𝐡𝐨       - to create a files   
𝐟𝐨𝐫        - to repeat creation of multiple empty files    
𝐦𝐤𝐝𝐢𝐫      - to create a folders/directories   
𝐜𝐝         - to change the folder/directories   
𝐬𝐞𝐭        - to store different file names in some variables   
𝐭𝐫𝐞𝐞       - to view the content of the specified file directory
- **Terraform-Pipeline.cmd**  
  Wrapper script for Terraform pipelines or local execution.

## ⚙️ Prerequisites
- PowerShell 5+ or PowerShell Core  
- Azure CLI (`az`) or Az PowerShell module  
- Terraform  
- Azure DevOps PAT (for pipeline scripts)  
- Windows environment f

