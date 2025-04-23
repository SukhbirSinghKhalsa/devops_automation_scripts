mkdir root_child_module & cd root_child_module

mkdir parent & cd parent &
set var=main.tf provider.tf variables.tf terraform.tfvars &
for %%i in (%var%) do (
    echo "" > %%i
) &
cd ..

mkdir child & cd child & mkdir resource_group & mkdir storage_account
cd resource_group &
set var=main.tf variables.tf &
for %%i in (%var%) do (
    echo "" > %%i
) &
cd ..

cd storage_account &
set var=main.tf variables.tf &
for %%i in (%var%) do (
    echo "" > %%i
) &
cd ../../..

tree root_child_module /F




