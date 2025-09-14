@REM Variable Declaration
set parentfolder=infra
set childfolder=modules
set parentfiles=main.tf provider.tf variables.tf terraform.tfvars &
set modules=resource_group storage_account vnet subnet nic pip lb db db_server
set modulefiles=main.tf variables.tf output.tf

@REM Creation of Root Folder
mkdir root_child_module & cd root_child_module

@REM Creation of Parent folder with files
mkdir %parentfolder% & cd %parentfolder% &
for %%i in (%parentfiles%) do (
    copy nul %%i
) &
cd ..

@REM Creation of Modules with files
mkdir %childfolder% & cd %childfolder%
for %%i in (%modules%) do (
    mkdir %%i & cd %%i
    for %%j in (%modulefiles%) do (
        copy nul %%j
    ) 
    cd ..
)
cd ../..

@REM Display all the folder with files
tree root_child_module /F
